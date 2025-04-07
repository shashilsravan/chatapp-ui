import React from 'react'

export default function Header() {
    return (
        <div className='mainHeader'>
            <div className="container h-100 d-block mx-auto">
                <div className="h-100 d-flex align-items-center justify-content-between w-100">
                    <div className="d-flex align-items-center" style={{ gap: 8 }}>
                        <i className="fa-solid fa-robot"></i>
                        <a className="mainLogo" href='/'>WizBot</a>
                    </div>

                    <div className="d-flex align-items-center" style={{ gap: 24 }}>
                        <a href='#'>Docs</a>
                        <a href='#'>Our Co-Pilots</a>
                        <a href='#'>About us</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
