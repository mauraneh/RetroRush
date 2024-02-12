import {useState} from "react";

const useTetrisLogic = () => {
    const [isGameActive, setIsGameActive] = useState(false);
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [isGameLost, setIsGameLost] = useState(false);
    const [isGameWin, setIsGameWin] = useState(false);


    const initializeGame = () => {
        console.log('partie initialisées');
    }
    return {
        isGameLost,isGameWin, score, bestScore, isGameActive, initializeGame
    }
}
export default useTetrisLogic;
