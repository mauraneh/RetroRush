import {useEffect} from "react";

const BreakOutCanvas = ({canvasRef}) => {
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

    }, [canvasRef]);

    return <canvas ref={canvasRef} width="500" height="500" />;
}