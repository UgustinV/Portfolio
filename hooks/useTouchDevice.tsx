import { useState, useEffect } from 'react';

export const useTouchDevice = () => {
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    useEffect(() => {
        const detectTouch = () => {
            const hasTouch = (
                'ontouchstart' in window ||
                navigator.maxTouchPoints > 0 ||
                window.matchMedia('(pointer: coarse)').matches ||
                !window.matchMedia('(hover: hover)').matches
            );
            
            setIsTouchDevice(hasTouch);
        };

        detectTouch();

        const mediaQuery = window.matchMedia('(hover: hover)');
        const handleMediaChange = () => detectTouch();
        
        mediaQuery.addEventListener('change', handleMediaChange);

        return () => {
            mediaQuery.removeEventListener('change', handleMediaChange);
        };
    }, []);

    return isTouchDevice;
};