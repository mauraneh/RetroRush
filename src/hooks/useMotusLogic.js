import {useEffect, useState} from "react";
import {fetchRandomWord} from "../utils/motusHelper";

const useMotusLogic = () => {
    const [isGameActive, setIsGameActive] = useState(false);
    const [score, setScore] = useState(0);
    const[userNickname, setUserNickname] = useState(
        (localStorage.getItem("userNickname")) || "Anonymous");
    const [bestScore, setBestScore] = useState(
        parseInt(localStorage.getItem(`${userNickname}_Motus_bestScore`)|| 0 ));
    const [isGameLost, setIsGameLost] = useState(false);
    const [isGameWin, setIsGameWin] = useState(false);
    const [word, setWord] = useState('');
    const [displayWord, setDisplayWord] = useState('');
    const [attemptsLeft, setAttemptsLeft] = useState(6);
    const [userAttempts, setUserAttempts] = useState([]);

    useEffect(() => {
        if (isGameActive) {
            fetchRandomWord().then(word => {
                setWord(word);
                setDisplayWord(word[0] + '_'.repeat(word.length - 1));
            });
        }
    }, [isGameActive]);

    const initializeGame = () => {
        setIsGameWin(false);
        setIsGameLost(false);
        setIsGameActive(true);
        setScore(0);
        setUserAttempts([]);
        setAttemptsLeft(6);
    };

    const checkAttempt = (attempt) => {
        let newDisplayWord = displayWord.split('');
        let correctGuess = true;

        let attemptDetails = attempt.split('').map((char, index) => {
            const isCorrect = word.toLowerCase()[index] === char.toLowerCase();
            if (isCorrect) {
                newDisplayWord[index] = char;
            } else {
                correctGuess = false;
            }
            return {
                char,
                correct: isCorrect
            };
        });

        setUserAttempts([...userAttempts, attemptDetails]);
        setDisplayWord(newDisplayWord.join(''));

        if (correctGuess || attempt.toLowerCase() === word.toLowerCase()) {
            setTimeout(() => {
                setIsGameWin(true);
                setIsGameActive(false);
                const newScore = attemptsLeft * 10;
                setScore(newScore);
                if (newScore > bestScore) {
                    setBestScore(newScore);
                    localStorage.setItem(`${userNickname}_Motus_bestScore`, newScore.toString());
                }
            }, 500);
        } else {
            setAttemptsLeft(attemptsLeft - 1);
            if (attemptsLeft <= 1) {
                setIsGameLost(true);
                setIsGameActive(false);
            }
        }
    };


    return { isGameLost, isGameWin, score, bestScore, isGameActive, initializeGame, checkAttempt, displayWord, attemptsLeft };
};
export default useMotusLogic;