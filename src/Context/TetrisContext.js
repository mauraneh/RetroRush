import React, { createContext, useContext, useState } from 'react';

const TetrisContext = createContext();

export const useTetris = () => useContext(TetrisContext);

export const TetrisProvider = ({ children }) => {
    const [speedTetris, setSpeedTetris] = useState(500);

    return (
        <TetrisContext.Provider value={{ speedTetris, setSpeedTetris }}>
            {children}
        </TetrisContext.Provider>
    );
};
