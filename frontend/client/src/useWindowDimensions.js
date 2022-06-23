import { useState, useEffect } from 'react';

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    let boardHeight, boardWidth;
    if (width > 900) {
        boardWidth = (width - 96) / 2;
        boardHeight = boardWidth;
    } else {
        boardWidth = (width - 64);
        boardHeight = boardWidth;
    }
    return {
        width,
        height,
        boardHeight,
        boardWidth
    };
}

export default function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}