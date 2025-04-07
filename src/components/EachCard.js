import React from 'react'
import { useNavigate } from 'react-router'

export default function EachCard() {
    const navigate = useNavigate()
    return (
        <div className="eachGrid" onClick={() => navigate(`/pilot/hd9qw87er1j09211`)}>
            <i style={{ fontSize: 28 }} className="fa-solid fa-building-columns"></i>
            <p className='fs-18px fw-600 mt-2'>Banking Queries</p>
            <div className='d-flex align-items-center mb-1' style={{ gap: 8 }}>
                <p className='fs-12px fs-italic'>28 Prompts</p>
                <p className='fs-12px fs-italic'>|</p>
                <p className='fs-12px fs-italic'>6 Workflows</p>
            </div>
            <p className='fs-13px fs-secondary'>
                Use this Co-Pilot to do any activities like creating a bank account, completing virtual KYC, checking aadhar or pan verification status and more ...
            </p>
            <button className='btn bg-primary mt-2 d-flex align-items-center justify-content-center' style={{ gap: 10 }}>
                <p className='fs-14px text-white'>
                    Launch Co-Pilot
                </p>
                <i style={{ fontSize: 12 }} className="text-white fa-solid fa-arrow-up-right-from-square"></i>
            </button>
        </div>
    )
}
