import React, {useEffect} from "react";

const TetrisCanvas = ({canvasRef}) => {
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);


    }, [])
    return <canvas ref={canvasRef} width="500" height="500" />;

};
export default TetrisCanvas;
