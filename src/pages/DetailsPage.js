import React from 'react'
import polygon1 from '../assets/icons/polygon1.png'
import polygon2 from '../assets/icons/polygon2.png'
import { Bank, Coins, CreditCard, CurrencyCircleDollar, MagnifyingGlass, TrendUp, User } from '@phosphor-icons/react'

const DATA = [
    {
      "title": "Sending Money",
      "description": "Setting up, paying for, editing, and cancelling transfers",
      "icon": <TrendUp size={18} />
    },
    {
      "title": "Managing Your Account",
      "description": "Setting up your account and getting verified.",
      "icon": <User size={18} />
    },
    {
      "title": "Holding Money",
      "description": "Holding balance, setting debits, using Interest & Stock",
      "icon": <CurrencyCircleDollar size={18} />
    },
    {
      "title": "Receiving Money",
      "description": "Using your account details to receive money.",
      "icon": <Coins size={18} />
    },
    {
      "title": "Business Account",
      "description": "Multi-user access, accounting and using our API.",
      "icon": <Bank size={18} />
    },
    {
      "title": "Card",
      "description": "Ordering, activating, spending, and troubleshooting.",
      "icon": <CreditCard size={18} />
    }
  ]
  

const DetailsPage = () => {
    return (
        <div className="w-100 h-100">
            <div className="position-relative d-flex justify-content-center align-items-center w-100" style={{ background: "#1060E5", overflow: "hidden", height: "345px" }}>
                <div style={{ top: '5%', left: "5%" }} className="position-absolute">
                    <img src={polygon1} />
                </div>
                <div style={{ top: '0%', left: "10%" }} className="position-absolute">
                    <img src={polygon2} />
                </div>

                <div className="d-flex flex-column gap-32px">

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
                            <div className="fs-14px fw-500" style={{ color: "#eeffff" }}>Popular questions:</div>
                            <div className="d-flex align-items-center gap-8px">
                                <div className="py-8px px-12px dfaic text-white fs-12px" style={{ borderRadius: "12px", background: "#2a71e8" }}>Importing</div>
                                <div className="py-8px px-12px dfaic text-white fs-12px" style={{ borderRadius: "12px", background: "#2a71e8" }}>Billing</div>
                                <div className="py-8px px-12px dfaic text-white fs-12px" style={{ borderRadius: "12px", background: "#2a71e8" }}>Integrations</div>
                            </div>
                        </div>
                    </div>
                    
                </div>


            </div>
            <div className="bg-white px-44px py-32px d-flex flex-column gap-32px" style={{ height: "calc(100% - 345px" }}>
                <div className="d-flex justify-content-between align-items-center px-20px">
                    <div className="fs-2 fw-600 text-dark">Getting Started</div>
                    <div className="fs-6 fw-400 text-secondary">6 Item</div>
                </div>

                <div className="d-flex justify-content-center align-items-center flex-wrap gap-16px">
                    {DATA.map((x) => (
                        <div className="border px-12px py-16px rounded br-16px d-flex flex-column gap-12px" style={{ background: "#f6f6f6", width: "450px" }}>
                            <div style={{ width: "50px", height: "50px", borderRadius: "50%" }} className="d-flex justify-content-center align-items-center bg-white">{x.icon}</div>
                            <div className="d-flex flex-column ">
                                <div className="fs-16px fw-600 text-dark">{x.title}</div>
                                <div className="fs-14px fw-400 text-secondary">{x.description}</div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default DetailsPage