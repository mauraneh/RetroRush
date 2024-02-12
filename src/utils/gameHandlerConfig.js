/* DETAILS */

    // InitialDirection : Direction initiale pour le minijeux
    // keyActions : Touches utilisées
    // preventOpposite: // Empecher element de revenir sur lui-même
    // stopOnKeyUp: Evenement quand la touche se lève.

export  const snakeConfig = {
    initialDirection: 'right',
    keyActions: {
        'ArrowUp': { direction: 'up', opposite: 'down' },
        'ArrowDown': { direction: 'down', opposite: 'up' },
        'ArrowLeft': { direction: 'left', opposite: 'right' },
        'ArrowRight': { direction: 'right', opposite: 'left' },
        'z': { direction: 'up', opposite: 'down' },
        's': { direction: 'down', opposite: 'up' },
        'q': { direction: 'left', opposite: 'right' },
        'd': { direction: 'right', opposite: 'left' }
    },
    preventOpposite: true,
    stopOnKeyUp: false
};

export const breakoutConfig = {
    initialDirection: null,
    keyActions: {
        'ArrowLeft': { direction: 'left' },
        'ArrowRight': { direction: 'right' },
        'q': { direction: 'left', opposite: 'right' },
        'd': { direction: 'right', opposite: 'left' }
    },
    preventOpposite: false,
    stopOnKeyUp: true
};
