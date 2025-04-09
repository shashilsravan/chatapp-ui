import React, { useState } from 'react'
import polygon1 from '../assets/icons/polygon1.png'
import polygon2 from '../assets/icons/polygon2.png'
import { ChartBar, ChatDots, MagnifyingGlass, Repeat, ShieldCheck, UserCheck, Wallet, X } from '@phosphor-icons/react'
import ChatScreen from './ChatScreen'
import Image from "../assets/logo.png";

const DATA = [
    {
        "title": "KYC & Onboarding Assistant",
        "description": "Helps users get started with digital banking — guiding them through KYC, document uploads, e-signatures, and account setup in minutes.",
        "icon": <UserCheck size={18} />,
        "filledIcon": <UserCheck weight='fill' color='white' size={20} />
    },
    {
        "title": "Loan Navigator",
        "description": "Finds the best-fit loan options (personal, auto, home), calculates EMIs, checks eligibility, and even pre-fills applications.",
        "icon": <Wallet size={18} />,
        "filledIcon": <Wallet weight='fill' color='white' size={20} />
    },
    {
        "title": "Fraud Watchdog",
        "description": "Monitors your transactions in real time, alerts you about suspicious activity, and helps you instantly freeze accounts or cards if needed.",
        "icon": <ShieldCheck size={18} />,
        "filledIcon": <ShieldCheck weight='fill' color='white' size={20} />
    },
    {
        "title": "Subscription Manager",
        "description": "Identifies all your recurring payments and subscriptions, lets you manage or cancel them with one tap, and notifies you of upcoming charges.",
        "icon": <Repeat size={18} />,
        "filledIcon": <Repeat weight='fill' color='white' size={20} />
    },
    {
        "title": "Spending Insights Analyst",
        "description": "Analyzes your transactions and gives personalized insights into spending habits, budget optimization, and cost-saving opportunities.",
        "icon": <ChartBar size={18} />,
        "filledIcon": <ChartBar weight='fill' color='white' size={20} />
    },
    {
        "title": "24/7 Virtual Banker",
        "description": "Acts as your digital concierge — handling queries, blocking cards, scheduling branch appointments, and escalating complex issues.",
        "icon": <ChatDots size={18} />,
        "filledIcon": <ChatDots weight='fill' color='white' size={20} />
    }
]

const DetailsPage = () => {
    const [clicked, setClicked] = useState({});

    return (
        <div style={{ height: "100vh", width: "100vw" }}>
            <div className="position-relative d-flex justify-content-center align-items-center w-100" style={{ background: "#1060E5", overflow: "hidden", height: 330, zIndex: 2 }}>
                <div style={{ top: '5%', left: "5%" }} className="position-absolute">
                    <img src={polygon1} />
                </div>
                <div style={{ top: '0%', left: "10%" }} className="position-absolute">
                    <img src={polygon2} />
                </div>

                <div className="d-flex flex-column gap-24px">
                    <div className="d-flex flex-column align-items-center">
                        <div className="fw-600 text-white fs-1">How Can We Help?</div>
                        <div className="fs-14px fw-400" style={{ color: "#f2feff" }}>Get answers to common questions on all things</div>
                    </div>

                    <div className="d-flex flex-column gap-16px">
                        <div className="br-8px px-16px py-10px d-flex align-items-center gap-8px" style={{ background: "white" }}>
                            <div className="d-flex justify-content-center align-items-center"><MagnifyingGlass size={16} color='black' /></div>
                            <input placeholder='Search Now' className="no-style-text-input w-100 flex-center color-text-regular" />
                        </div>

                        <div className="d-flex align-items-center gap-8px">
                            <div className="fs-14px fw-500" style={{ color: "#eeffff" }}>Popular Co-Pilots:</div>
                            <div className="d-flex align-items-center gap-8px">
                                <div className="py-8px px-12px dfaic text-white fs-12px" style={{ borderRadius: "12px", background: "#2a71e8" }}>Importing</div>
                                <div className="py-8px px-12px dfaic text-white fs-12px" style={{ borderRadius: "12px", background: "#2a71e8" }}>Billing</div>
                                <div className="py-8px px-12px dfaic text-white fs-12px" style={{ borderRadius: "12px", background: "#2a71e8" }}>Integrations</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div className="bg-white d-flex flex-column overflow-scroll" style={{ height: "calc(100% - 330px)", gap: 26, padding: "40px", zIndex: 2 }}>
                <div className='container'>
                    <div className="d-flex justify-content-between align-items-center" style={{ paddingRight: 4 }}>
                        <div className="fs-2 fw-600 text-dark">Our Co-Pilots</div>
                        <div className="fs-6 fw-400 text-secondary">6 Items</div>
                    </div>

                    <div className="d-flex align-items-center flex-wrap gap-16px position-relative mt-4">
                        {DATA.map((x) => (
                            <div onClick={() => setClicked(x)} className="border px-12px py-16px rounded br-16px d-flex flex-column gap-12px cursor copilot-card" style={{ background: "#f6f6f6", width: 420 }}>
                                <div style={{ width: "50px", height: "50px", borderRadius: "50%" }} className="d-flex justify-content-center align-items-center bg-white">{x.icon}</div>
                                <div className="d-flex flex-column" style={{ gap: 4 }}>
                                    <div className="fs-16px fw-600 text-dark">{x.title}</div>
                                    <div className="fs-14px fw-400 text-secondary text-truncate-3">{x.description}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            <div className="chatBoxContainer" 
                style={clicked.title 
                    ? { opacity: 1, visibility: "visible", height: "80%", width: "60%" } 
                    : { opacity: 0, visibility: "hidden", height: 0, width: 0 }}
            >
                <div className="chatBoxContainer--header px-3">
                    <div className="d-flex align-items-center" style={{ gap: 12 }}>
                        <img src={Image} height={36} />
                        <div>
                            <p className="fs-13px fw-600 font-numans">{clicked.title}</p>
                            <p className="fs-11px fw-400 font-numans text-truncate-1" style={{ width: "60%" }}>{clicked.description}</p>
                        </div>
                    </div>

                    <div className='iconButton' onClick={() => setClicked({})}>
                        <X size={18} weight='bold' color='black' />
                    </div>
                </div>
                <div className="chatBodyContainer" style={{ height: `calc(100% - 64px)` }}>
                    {clicked.title ? <ChatScreen /> : null}
                </div>
            </div>
            {clicked.filledIcon && <div className="triggerIcon">
                {clicked.filledIcon}
            </div>}
        </div>
    )
}

export default DetailsPage