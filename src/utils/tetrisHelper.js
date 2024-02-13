export const TETROMINOS = {
    0: { shape: [[0]], color: '0, 0, 0' },
    I: {
        shape: [
            [0, 'I', 0, 0],
            [0, 'I', 0, 0],
            [0, 'I', 0, 0],
            [0, 'I', 0, 0]
        ],
        color: '#B5ED8F',
    },
    J: {
        shape: [
            [0, 'J', 0],
            [0, 'J', 0],
            ['J', 'J', 0],
        ],
        color: '#FFD3F3',
    },
    L: {
        shape: [
            [0, 'L', 0],
            [0, 'L', 0],
            [0, 'L', 'L'],
        ],
        color: 'rgb(36,157,0)',
    },
    O: {
        shape: [
            ['O', 'O'],
            ['O', 'O'],
        ],
        color: '#E95659',
    },
    S: {
        shape: [
            [0, 'S', 'S'],
            ['S', 'S', 0],
            [0, 0, 0],
        ],
        color: '#158E98',
    },
    T: {
        shape: [
            [0, 0, 0],
            ['T', 'T', 'T'],
            [0, 'T', 0],
        ],
        color: '#EFD150',
    },
    Z: {
        shape: [
            ['Z', 'Z', 0],
            [0, 'Z', 'Z'],
            [0, 0, 0],
        ],
        color: '#D30994',
    },
};

export const randomTetromino = () => {
    const tetrominos = 'IJLOSTZ'; //'X TESTS'
    const randTetromino =
        TETROMINOS[tetrominos[Math.floor(Math.random() * tetrominos.length)]];
    const startPos = { x: Math.floor((10 - randTetromino.shape[0].length) / 2), y: 0 };
    return { ...randTetromino, pos: startPos };
};

