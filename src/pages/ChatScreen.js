import React, { useEffect, useRef, useState, useCallback } from 'react';
import apiClient from '../services/bankingApi';
import { objectDeepCloneFlatted } from '../helper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuildingColumns, faTicket } from '@fortawesome/free-solid-svg-icons';

function formatVariableName(name) {
    if (!name) return '';
    let result = name.replace(/([a-z])([A-Z])/g, '$1 $2');
    result = result.replace(/[_-]/g, ' ');
    result = result.replace(/\s+/g, ' ').trim();
    return result.charAt(0).toUpperCase() + result.slice(1).toLowerCase();
}

const UNMASKED_FIELDS = [
    "consent", "otp", "name_as_per_pan", "date_of_birth",
    "username", "email", "amount", "receiver_customer_Id", "n"
];

export default function ChatScreen() {
    const [loading, setLoading] = useState(false);
    const [chats, setChats] = useState([]);
    const [backupCurrSeq, setBackupCurrSeq] = useState(null);
    const [currSeq, setCurrSeq] = useState(null);
    const [userInpWindow, setUserInpWindow] = useState(false);
    const [sessionId, setSessionId] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [query, setQuery] = useState("");
    const [error, setError] = useState(null);

    const chatEndRef = useRef(null);
    const textareaRef = useRef(null);

    const scrollToBottom = useCallback(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [chats, userInpWindow, scrollToBottom]);

    useEffect(() => {
        if (loggedIn && textareaRef.current) {
            textareaRef.current.focus();
        }
    }, [loggedIn]);

    const startConversation = useCallback(async () => {
        try {
            setLoading(true);
            const { data } = await apiClient.post(`/conversation/start`, {}, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const transformedObj = {
                content: data.prompt || "",
                options: data.options || []
            };

            setSessionId(data.sessionId);
            setCurrSeq(objectDeepCloneFlatted(transformedObj));
            setChats([{
                role: "developer",
                ...transformedObj
            }]);
            setLoading(false);
        } catch (error) {
            console.error('Failed to start conversation:', error);
            setError('Failed to connect to the banking service. Please try again later.');
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        startConversation();
    }, [startConversation]);

    const callCustomAPI = async (userQuery) => {
        try {
            const { data } = await apiClient.post(`/conversation/query`,
                { query: userQuery, sessionId },
                { headers: { 'Content-Type': 'application/json' } }
            );

            if (data && data.action){
                setChats(prev => [...prev, {
                    role: "developer",
                    content: data.prompt || ""
                }]);

                setUserInpWindow(true);
                const transformedObj = {
                    action: data.action || "",
                    variables: data.variables || {}
                };
                setBackupCurrSeq(objectDeepCloneFlatted(transformedObj));
                setCurrSeq(objectDeepCloneFlatted(transformedObj));
                setLoading(false);
            } else if (data.meta) {
                const transformedObj = {
                    content: data.meta.prompt || "",
                    options: data.meta.options || []
                };
                setCurrSeq(objectDeepCloneFlatted(transformedObj));
                setChats(prev => [...prev,
                    {
                        role: "developer",
                        content: data.prompt,
                    },
                    {
                        role: "developer",
                        ...transformedObj
                    }
                ]);
                if (data.meta.action) {
                    handleOptionClick(data.meta);
                } else {
                    setLoading(false);
                }
            } else {
                setChats(prev => [...prev, {
                    role: "developer",
                    content: data.prompt || "",
                    options: data.options || [],
                }]);
                setLoading(false);
            }
        } catch (error) {
            console.error('API query failed:', error);
            setChats(prev => [...prev, {
                role: "developer",
                content: "Sorry, I couldn't process your request. Please try again.",
                type: "error"
            }]);
            setLoading(false);
        }
    };

    const executeCustom = () => {
        if (!query.trim()) return;

        const currentQuery = query;
        const _chats = objectDeepCloneFlatted(chats);
        _chats[_chats.length - 1].options = null;
        _chats.push({
            role: "user",
            content: currentQuery
        })
        setChats(objectDeepCloneFlatted(_chats));
        setQuery("");
        setLoading(true);

        setTimeout(() => {
            callCustomAPI(currentQuery);
        }, 700);
    };

    const handleUserResponse = (option) => {
        const updatedChats = objectDeepCloneFlatted(chats);
        if (updatedChats.length > 0) {
            updatedChats[updatedChats.length - 1].options = null;
        }
        updatedChats.push({
            role: "user",
            content: option.label
        });

        setChats(updatedChats);
        setLoading(true);

        setTimeout(() => {
            handleOptionClick(option);
        }, 600);
    };
    const handleOptionClick = async (option) => {
        try {
            if (option.action) {
                const { data } = await apiClient.post(
                    `/workflow/variables`,
                    { actionId: option.action, sessionId },
                    { headers: { 'Content-Type': 'application/json' } }
                );

                if (data.prompt && data.meta) {
                    callWorkflow(data);
                } else {
                    setUserInpWindow(true);
                    const transformedObj = {
                        action: data.action || "",
                        variables: data.variables || {}
                    };
                    setBackupCurrSeq(objectDeepCloneFlatted(transformedObj));
                    setCurrSeq(objectDeepCloneFlatted(transformedObj));
                }
            } else {
                const { data } = await apiClient.post(
                    `/conversation/input`,
                    { userInput: option.label, sessionId },
                    { headers: { 'Content-Type': 'application/json' } }
                );

                const transformedObj = {
                    content: data.prompt || "",
                    options: data.options || []
                };

                setCurrSeq(objectDeepCloneFlatted(transformedObj));
                setChats(prev => [...prev, {
                    role: "developer",
                    ...transformedObj
                }]);

                if (data.action) {
                    handleOptionClick(data);
                }
            }
            setLoading(false);
        } catch (error) {
            console.error('Option processing failed:', error);
            setChats(prev => [...prev, {
                role: "developer",
                content: "Sorry, I couldn't process your selection. Please try again.",
                type: "error"
            }]);
            setLoading(false);
        }
    };
    const handleChange = (key, val) => {
        const updatedSeq = objectDeepCloneFlatted(currSeq);
        if (updatedSeq.variables && updatedSeq.variables[key]) {
            updatedSeq.variables[key].value = val;
            setCurrSeq(updatedSeq);
        }
    };
    const callWorkflow = async (_resp = null) => {
        try {
            let data = {};
            if (_resp) {
                data = objectDeepCloneFlatted(_resp);
            } else {
                const { data: tempData } = await apiClient.post(
                    `/workflow/execute`,
                    { ...objectDeepCloneFlatted(currSeq), sessionId },
                    { headers: { 'Content-Type': 'application/json' } }
                );

                if (currSeq.action === "userLogin") {
                    setLoggedIn(true);
                }
                data = tempData;
            }

            const transformedObj = {
                content: data.prompt || "",
                options: data.options || []
            };

            setCurrSeq(objectDeepCloneFlatted(transformedObj));

            if (data.error) {
                setChats(prev => [...prev, {
                    role: "developer",
                    content: data.error,
                    type: "error"
                }]);
            } else {
                setChats(prev => [...prev, {
                    role: "developer",
                    ...transformedObj
                }]);
            }

            if (data && data.meta) {
                setTimeout(() => {
                    const nextObj = {
                        content: data.meta.prompt || "",
                        options: data.meta.options || []
                    };

                    setCurrSeq(objectDeepCloneFlatted(nextObj));
                    setChats(prev => [...prev, {
                        role: "developer",
                        ...nextObj
                    }]);

                    if (data.meta.action) {
                        handleOptionClick(data.meta);
                    } else {
                        setLoading(false);
                    }
                }, 800);
            } else {
                setLoading(false);
            }
        } catch (error) {
            console.error('Workflow execution failed:', error);
            setChats(prev => [...prev, {
                role: "developer",
                content: "There was an error processing your request. Please try again.",
                type: "error"
            }]);
            setLoading(false);
        }
    };

    const callWorkflowMiddleware = () => {
        const missingRequiredFields = Object.entries(currSeq.variables || {})
            .filter(([key, value]) => !value.value && value.required)
            .map(([key]) => formatVariableName(key));

        if (missingRequiredFields.length > 0) {
            alert(`Please fill in all required fields: ${missingRequiredFields.join(', ')}`);
            return;
        }

        const temp = objectDeepCloneFlatted(currSeq);
        const formInputs = [];

        Object.keys(temp.variables || {}).forEach(key => {
            if (!backupCurrSeq.variables[key].value) {
                const value = temp.variables[key].value;
                if (value) {
                    formInputs.push({
                        role: "user",
                        content: `${formatVariableName(key)}: ${UNMASKED_FIELDS.includes(key) ? value : "•".repeat(Math.min(value.length, 10))}`
                    });
                }
            }
        });

        setChats(prev => [...prev, ...formInputs]);
        setLoading(true);
        setUserInpWindow(false);

        setTimeout(() => {
            callWorkflow();
        }, 600);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey && loggedIn) {
            e.preventDefault();
            executeCustom();
        }
    };

    const resetConversation = () => {
        if (window.confirm('Are you sure you want to start a new conversation? This will reset all previous messages.')) {
            setChats([]);
            setLoading(false);
            setUserInpWindow(false);
            setLoggedIn(false);
            setQuery("");
            startConversation();
        }
    };

    return (
        <div className="chatsSection p-3 d-flex flex-column w-100 h-100">
            {error && (
                <div className="alert alert-danger alert-dismissible fade show fs-12px" role="alert">
                    {error}
                    <button type="button" className="btn-close" onClick={() => setError(null)}></button>
                </div>
            )}

            <div className="overflow-auto chatsContent mb-3 w-100" style={{ height: `calc(100% - ${loggedIn ? 96 : 50}px)` }}>
                {chats.map((each, i) => {
                    return (
                        <React.Fragment key={i}>
                            <div class={`message ${each.role}-message ${each.type || ""}`}>
                                <p className='fs-13px' dangerouslySetInnerHTML={{ __html: `${each.type === "error" ? "ⓘ " : ""}${each.content}` }} />
                            </div>
                            {(each.options && each.options.length > 0)
                                ? <div className="d-flex flex-wrap messages-container" style={{ gap: 12 }}>
                                    {each.options.map((op) => (<div className="option-styling" onClick={() => handleUserResponse(op)}>
                                        <p className="fs-12px">{op.label}</p>
                                    </div>))}
                                </div>
                                : null}
                        </React.Fragment>
                    )
                })}


                {loading && (
                    <div className="typing-indicator mb-3">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                )}

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
                                            type={UNMASKED_FIELDS.includes(eachKey) ? "text" : "password"}
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

            {loggedIn && <div className="chatInput position-relative">
                <textarea
                    ref={textareaRef}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyPress}
                    disabled={!loggedIn || loading}
                    className="form-control py-2 pe-5"
                    placeholder='Type your message...'
                    rows="3"
                    style={{ resize: "none" }}
                />
                {(query.trim()) && <div className='btn bg-primary sendBtn' onClick={executeCustom}>
                    <i className="fs-12px fa-solid text-white fa-paper-plane"></i>
                </div>}
            </div>}
        </div>
    );
}