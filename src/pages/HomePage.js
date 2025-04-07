import React, { useState } from 'react'
import Chip from '../components/Chip'
import EachCard from '../components/EachCard'

export default function HomePage() {
    const availableCategories = ["Banking", "Fin-Tech", "Telecom", "Ecommerce", "Medical"]
    const [activeCategory, setActiveCategory] = useState(availableCategories[0])
    return (
        <div className="container h-100">
            <div className='w-100 h-100 px-5 pt-3'>
                <div className="d-flex flex-column h-100" style={{ gap: 16 }}>
                    <div className="input-group">
                        <span className="input-group-text">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </span>
                        <div className="form-floating">
                            <input type="text" className="form-control" id="floatingInputGroup1" placeholder="Search" />
                            <label for="floatingInputGroup1">Search our Co-Pilots Catalog ...</label>
                        </div>
                    </div>
                    <div className='d-flex align-items-center' style={{ gap: 8 }}>
                        {availableCategories.map((each, i) => (
                            <Chip isActive={activeCategory === each} setActiveCategory={setActiveCategory} text={each} key={i} />
                        ))}
                    </div>
                    <div className='w-100 d-flex align-items-center flex-wrap py-4 overflow-scroll' 
                        style={{ maxHeight: `calc(100% - 120px)`, gap: 28 }}>
                        {[1, 1, 1, 1, 1, 1, 1, 1].map(() => <EachCard />)}
                    </div>
                </div>
            </div>
        </div>
    )
}
