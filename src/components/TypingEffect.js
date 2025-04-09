import React, { useEffect, useState } from 'react';
const TypingEffect = ({
    text,
    speed = 50,
    loop = false,
    deleteSpeed = 50,
    pauseBeforeDelete = 1000,
}) => {
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        let timeout;

        if (!isDeleting && index < text.length) {
            timeout = setTimeout(() => {
                setDisplayText(prev => prev + text.charAt(index));
                setIndex(prev => prev + 1);
            }, speed);
        } else if (loop && isDeleting && index > 0) {
            timeout = setTimeout(() => {
                setDisplayText(prev => prev.slice(0, -1));
                setIndex(prev => prev - 1);
            }, deleteSpeed);
        } else if (loop && index === text.length) {
            timeout = setTimeout(() => setIsDeleting(true), pauseBeforeDelete);
        } else if (loop && index === 0 && isDeleting) {
            setIsDeleting(false);
        }

        return () => clearTimeout(timeout);
    }, [index, isDeleting, loop, text, speed, deleteSpeed, pauseBeforeDelete]);

    return (
        <span style={{ width: "60%", height: 196 }}>
            <span className="text-white fw-600 orbitron-family" style={{ fontSize: "44px", lineHeight: "58px" }}>
                {displayText}
            </span>
            <span className='ml-2' style={{ style: "inline-block", background: 'white', height: 40, width: 2, animation: 'blink 0.75s step-end infinite' }}>&nbsp;</span>
        </span>
    );
};

export default TypingEffect;
