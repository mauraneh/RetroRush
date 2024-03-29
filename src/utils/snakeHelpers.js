const cellSize = 20;

// Fonction pour initialiser les paramètres du jeu
export const initializeGame = (setSnake, setFood, setScore, setIsGameActive, setIsGameLost) => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(spawnFood(25, 25));
    setScore(0);
    setIsGameActive(true);
    setIsGameLost(false);
};

// Fonction pour générer une position aléatoire pour la nourriture
export const spawnFood = (width, height) => ({
  x: Math.floor(Math.random() * width),
  y: Math.floor(Math.random() * height),
});

// Fonction principale de la boucle du jeu
export const gameLoop = (snake, direction, setSnake, food, setFood, score, setScore, bestScore, setBestScore, setIsGameActive, setIsGameLost) => {
    const newSnake = [...snake];
    const newHead = { ...newSnake[0] };

// Mouvement du serpent
switch (direction) {
    case 'right': newHead.x += 1; break;
    case 'left': newHead.x -= 1; break;
    case 'up': newHead.y -= 1; break;
    case 'down': newHead.y += 1; break;
    default: break;
}

// Collision avec la nourriture
if (newHead.x === food.x && newHead.y === food.y) {
    setFood(spawnFood(25, 25));
    setScore(score + 1);
    if (score + 1 > bestScore) {
        setBestScore(score + 1);
    }
} else {
    newSnake.pop();
}

  // Vérifier la collision avec les bords ou avec lui-même
    if (newHead.x < 0 || newHead.x >= 25 || newHead.y < 0 || newHead.y >= 25 || collisionWithSelf(newHead, newSnake)) {
    setIsGameActive(false);
    setIsGameLost(true);
    return;
    }

    newSnake.unshift(newHead); // Ajouter la nouvelle tête en avant du corps
    setSnake(newSnake);
};

// Fonction pour détecter la collision du serpent avec lui-même
const collisionWithSelf = (head, snake) => {
    return snake.some(segment => segment.x === head.x && segment.y === head.y);
};

// Fonction pour gérer les pressions des touches
export const handleKeyPress = (e, setDirection, currentDirection, isGameActive) => {
    if (!isGameActive) return;
    switch (e.key) {
        case 'ArrowUp': if (currentDirection !== 'down') setDirection('up'); break;
        case 'ArrowDown': if (currentDirection !== 'up') setDirection('down'); break;
        case 'ArrowLeft': if (currentDirection !== 'right') setDirection('left'); break;
        case 'ArrowRight': if (currentDirection !== 'left') setDirection('right'); break;
        default: break;
    }
};

// Fonction pour dessiner le jeu sur le canvas
export const drawGame = (canvasRef, snake, food) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dessiner le serpent
    snake.forEach(segment => {
        ctx.fillStyle = '#14b400';
        ctx.fillRect(segment.x * cellSize, segment.y * cellSize, cellSize, cellSize);
    });

    // Dessiner la nourriture
    ctx.fillStyle = '#e32426';
    ctx.beginPath();
    ctx.arc(food.x * cellSize + cellSize / 2, food.y * cellSize + cellSize / 2, cellSize / 2, 0, Math.PI * 2, true);
    ctx.fill();
    };
