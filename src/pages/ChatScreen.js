import React, { useEffect, useRef, useState } from 'react'
import apiClient from '../services/bankingApi';
import { objectDeepCloneFlatted } from '../helper';

function formatVariableName(name) {
    if (!name) {
      return '';
    }
    
    // Handle camelCase and PascalCase
    let result = name.replace(/([a-z])([A-Z])/g, '$1 $2');
    
    // Replace underscores and hyphens with spaces
    result = result.replace(/[_-]/g, ' ');
    
    // Remove extra spaces
    result = result.replace(/\s+/g, ' ').trim();
    
    // Capitalize first letter, rest lowercase
    return result.charAt(0).toUpperCase() + result.slice(1).toLowerCase();
}
const unmaskedFields = ["consent", "otp", "name_as_per_pan", "date_of_birth", "username", "email", "amount", "receiver_customer_Id", "n"]

export default function ChatScreen() {
    const [loading, setLoading] = useState(false)
    const [chats, setChats] = useState([]);
    const chatEndRef = useRef(null);
    const [backupCurrSeq, setBackupCurrSeq] = useState(null)
    const [currSeq, setCurrSeq] = useState(null)
    const [userInpWindow, setUserInpWindow] = useState(false);
    const [sessionId, setSessionid] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [query, setQuery] = useState("");

    // Function to scroll to the bottom of chat
    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
      }, [chats, userInpWindow]);

      const startConversation = async () => {
        try {
            const { data } = await apiClient.post(`/conversation/start`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })

            const transformedObj = {
                content: data.prompt || "",
                options: data.options || [] 
            }

            setSessionid(data.sessionId)
            setCurrSeq(objectDeepCloneFlatted(transformedObj));
            setChats((prev) => ([
                ...prev,
                {
                    "role": "developer",
                    ...transformedObj
                }
            ]))
        } catch (error) {
            console.log('error', error)
        }
    }

    const callCustomAPI = async (query) => {
        const { data } = await apiClient.post(`/conversation/query`,
            { query, sessionId },
            { headers: { 'Content-Type': 'application/json', }}
        )

        const transformedObj = {
            content: data.meta.prompt || "",
            options: data.meta.options || [] 
        }
        setCurrSeq(objectDeepCloneFlatted(transformedObj));

        setChats((prev) => ([
            ...prev, {
                "role": "developer",
                ...transformedObj
            }
        ]))

        if (data.meta.action) {
            handleOptionClick(data.meta)
        } else {
            setLoading(false)
        }
    }

    const executeCustom = () => {
        let currQ = query;
        setChats((prev) => ([
            ...prev, {
                role: "user",
                content: query
            }
        ]))
        setQuery("");

        setLoading(true);
        setTimeout(() => {
            callCustomAPI(currQ)
        }, 700);
    }

    const handleUserResponse = (op) => {
        const _chats = objectDeepCloneFlatted(chats);
        _chats[_chats.length - 1].options = null
        _chats.push({
            role: "user",
            content: op.label
        })
        setChats(objectDeepCloneFlatted(_chats))
        setLoading(true);
        setTimeout(() => {
            handleOptionClick(op)
        }, 600);
    }
    const handleOptionClick = async (op) => {
        try {
            if (op.action) {
                const { data } = await apiClient.post(`/workflow/variables`,
                    { actionId: op.action, sessionId },
                    { headers: { 'Content-Type': 'application/json', }}
                )

                if (data.prompt && data.meta) {
                    callWorkflow(data)
                } else {
                    setUserInpWindow(true);
                    const transformedObj = {
                        actionId: data.actionId || "",
                        variables: data.variables || {}
                    }
                    setBackupCurrSeq(objectDeepCloneFlatted(transformedObj));
                    setCurrSeq(objectDeepCloneFlatted(transformedObj));
                }
            } else {
                const { data } = await apiClient.post(`/conversation/input`,
                    { userInput: op.label, sessionId },
                    { headers: { 'Content-Type': 'application/json', }}
                )
                const transformedObj = {
                    content: data.prompt || "",
                    options: data.options || [] 
                }

                setCurrSeq(objectDeepCloneFlatted(transformedObj));
                setChats((prev) => ([
                    ...prev,
                    {
                        "role": "developer",
                        ...transformedObj
                    }
                ]))

                if (data.action) {
                    handleOptionClick(data)
                }
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }

    useEffect(() => {
        startConversation()
    }, [])
    
    const handleChange = (key, val) => {
        const temp = objectDeepCloneFlatted(currSeq)
        temp.variables[key].value = val;
        setCurrSeq(objectDeepCloneFlatted(temp));
    }

    const callWorkflow = async (_resp = null) => {
        let data = {};
        if (_resp) {
            data = objectDeepCloneFlatted(_resp);
        } else {
            const { data: tempData } = await apiClient.post(`/workflow/execute`,
                {...objectDeepCloneFlatted(currSeq), sessionId},
                { headers: { 'Content-Type': 'application/json', }}
            )

            if (currSeq.actionId === "userLogin") setLoggedIn(true);
            data = tempData;
        }

        const transformedObj = {
            content: data.prompt || "",
            options: data.options || [] 
        }
        setCurrSeq(objectDeepCloneFlatted(transformedObj));

        if (data.error) {
            setChats((prev) => ([...prev, {
                "role": "developer",
                "content": data.error,
                type: "error"
            }]));
        } else {
            setChats((prev) => ([...prev, {
                "role": "developer",
                ...transformedObj
            }]));
        }

        if (data && data.meta) {
            setTimeout(() => {
                const transformedObj = {
                    content: data.meta.prompt || "",
                    options: data.meta.options || [] 
                }
                setCurrSeq(objectDeepCloneFlatted(transformedObj));

                setChats((prev) => ([
                    ...prev, {
                        "role": "developer",
                        ...transformedObj
                    }
                ]))

                if (data.meta.action) {
                    handleOptionClick(data.meta)
                } else {
                    setLoading(false)
                }
            }, 800);
        } else {
            setLoading(false);
        }
    }

    const callWorkflowMiddleware = () => {
        const temp = objectDeepCloneFlatted(currSeq)
        const arr = [];
        Object.keys(temp.variables).forEach((key, i) => {
            if (!backupCurrSeq.variables[key].value) {
                const vall = temp.variables[key].value
                arr.push({
                    role: "user",
                    content: `${formatVariableName(key)}: ${unmaskedFields.includes(key) ? vall : "x".repeat(vall.length)}`
                })
            }
        })

        setChats((prev) => [...prev, ...arr])
        setLoading(true);
        setUserInpWindow(false);

        setTimeout(() => {
            callWorkflow()
        }, 600);
    }
        

    return (
        <div className="h-100 container p-0 chatContainer">
            <div className='w-100 h-100 p-0 d-flex align-items-center'>
                <div className="h-100 chatLeftSection p-4" style={{ width: "25%" }}>
                    <div>
                        <i style={{ fontSize: 28 }} className="fa-solid fa-building-columns"></i>
                        <p className='fs-18px fw-600 mt-2'>Banking Queries</p>
                        <div className='d-flex align-items-center mb-3' style={{ gap: 8 }}>
                            <p className='fs-12px fs-italic'>28 Prompts</p>
                            <p className='fs-12px fs-italic'>|</p>
                            <p className='fs-12px fs-italic'>6 Workflows</p>
                        </div>
                        <p className='fs-13px fs-secondary'>
                            Use this Co-Pilot to do any activities like creating a bank account, completing virtual KYC, checking aadhar or pan verification status and more ...
                        </p>
                    </div>

                    <div className="bg-primary btn d-flex align-items-center justify-content-center" style={{ gap: 8 }}>
                        <i className="fs-12px text-white fa-solid fa-ticket"></i>
                        <p className="text-white fs-14px">
                            Raise a Ticket
                        </p>
                    </div>
                </div>
                <div className="h-100 chatsSection p-3" style={{ width: "75%" }}>
                    <div className='overflow-scroll chatsContent' style={{ height: `calc(100% - 96px)` }}>
                        {chats.map((each, i) => {
                            return (
                                <>
                                <div class={`message ${each.role}-message ${each.type || ""}`}>
                                    <p className='fs-13px' dangerouslySetInnerHTML={{ __html: `${each.type === "error" ? "ⓘ " : ""}${each.content}` }} />
                                </div>
                                {(each.options && each.options.length > 0)
                                    ? <div className="d-flex flex-wrap messages-container" style={{ gap: 12 }}>
                                        {each.options.map((op) => (<div className="option-styling" onClick={() => {
                                            if (loggedIn) {
                                                setQuery(op.label)
                                            } else {
                                                handleUserResponse(op)
                                            }
                                        }}>
                                            <p className="fs-12px">{op.label}</p>
                                        </div>))}
                                    </div>
                                    : null}
                                </>
                            )
                        })}
                        {loading && <div class="typing-indicator">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>}
                        {userInpWindow && <div className="inputDialogBox">
                            <div className="w-100 dialog-heading">
                                <p className='fs-14px'>Enter the below details</p>
                            </div>
                            <div className="dialog-body w-100">
                                {currSeq && currSeq.variables && Object.keys(currSeq.variables).length > 0 && (
                                    Object.keys(currSeq.variables).map((eachKey) => {
                                        const val = currSeq.variables[eachKey]
                                        const actualVal = backupCurrSeq.variables[eachKey]
                                        if (actualVal.value) return;
                                        return (
                                            <div key={eachKey} className="d-flex flex-column" style={{ gap: 4, width: "90%" }}>
                                                <p className="fs-14px fw-500">{val.key}</p>
                                                <input autocomplete="new-password" value={val.value}
                                                    type={unmaskedFields.includes(eachKey) ? "text" : "password"}
                                                    onChange={(e) => handleChange(eachKey, e.target.value)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            callWorkflowMiddleware();
                                                        }
                                                    }}
                                                    className="form-control" placeholder={val.description || `Enter ${val.key}`} />
                                            </div>
                                        )
                                    })
                                )}
                                <div className="d-flex align-items-center justify-content-between w-100" style={{ paddingRight: 18 }}>
                                    <div />
                                    <div className="btn bg-primary d-flex align-items-center" style={{ gap: 6 }} onClick={callWorkflowMiddleware}>
                                        <p className="fs-13px text-white">Send</p>
                                        <i className="fs-12px fa-solid text-white fa-paper-plane"></i>
                                    </div>
                                </div>
                            </div>
                        </div>}
                        <div ref={chatEndRef} />
                    </div>
                    <div className='w-100 chatInput' style={{ height: 96 }}>
                        <textarea value={query} onKeyDown={(e) => {
                            if (e.key === 'Enter' && loggedIn) {
                                executeCustom();
                            }
                        }} onChange={(e) => setQuery(e.target.value)} disabled={!loggedIn} className="h-100 w-100 form-control" placeholder='Type a message...' />
                        {(loggedIn && query) && <div className='btn bg-primary sendBtn' onClick={executeCustom}>
                            <i className="fs-12px fa-solid text-white fa-paper-plane"></i>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}
