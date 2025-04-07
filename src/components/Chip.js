import React from 'react'

export default function Chip({ text, isActive, setActiveCategory }) {
    return (
        <div onClick={() => setActiveCategory(text)} className={`myChip ${isActive && 'active'} py-1 px-3 bg-gray fs-12px`} style={{ borderRadius: 8 }}>
            {text}
        </div>
    )
}
