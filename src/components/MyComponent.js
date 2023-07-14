import React, { useEffect, useState, useRef } from 'react';
import './MyComponent.css';

const MyComponent = () => {
    const [mouseMoves, setMouseMoves] = useState(0);
    const [startTime, setStartTime] = useState(0);
    const [showEasterEgg, setShowEasterEgg] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const timeoutIdRef = useRef();

    useEffect(() => {
        clearTimeout(timeoutIdRef.current);
        if (mouseMoves >= 150 && Date.now() - startTime >= 7000) {
            setShowEasterEgg(true);
            setShowButton(false);
            timeoutIdRef.current = setTimeout(() => {
                setShowEasterEgg(false);
                setStartTime(0);
                setMouseMoves(0);
            }, 5000);
        } else if (mouseMoves > 300 && Date.now() - startTime >= 10000) {
            setShowEasterEgg(true);
            setShowButton(false);
            timeoutIdRef.current = setTimeout(() => {
                setShowEasterEgg(false);
                setStartTime(0);
                setMouseMoves(0);
            }, 5000);
        } else if (mouseMoves > 600 && Date.now() - startTime >= 15000) {
            setShowEasterEgg(true);
            setShowButton(true);
        } else {
            clearTimeout(timeoutIdRef.current);
            setShowEasterEgg(false);
            setShowButton(false);
        }

        return () => {
            clearTimeout(timeoutIdRef.current);
        };
    }, [mouseMoves, startTime]);
    const handleMouseMove = () => {
        setMouseMoves(prevMoves => prevMoves + 1);
        if (startTime === 0) {
            setStartTime(Date.now());
        }
    };

    const handleReturn = () => {
        setMouseMoves(0);
        setStartTime(0);
        setShowEasterEgg(false);
        setShowButton(false);
        window.location.reload(); // Обновление страницы
    };

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div>
            {showEasterEgg && (
                <div className="overlay">
                    <div className="easter-egg">
                        {mouseMoves >= 150 && Date.now() - startTime >= 5000 && (
                            <div className="message">Быстрее!</div>
                        )}
                        {mouseMoves > 300 && Date.now() - startTime >= 10000 && (
                            <div className="message">Продолжайте!</div>
                        )}
                        {mouseMoves > 600 && Date.now() - startTime >= 15000 && (
                            <div className="message">
                                Успокоились? Пора вернуться к делам.
                                    <div style={{margin: 5}}>
                                    <button className="return-button" onClick={handleReturn}>
                                        Вернуться к делам
                                    </button>
                                    </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
            <div className="background"></div>
        </div>
    );
};
export default MyComponent;
