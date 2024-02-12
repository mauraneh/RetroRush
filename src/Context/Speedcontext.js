import React, { createContext, useContext, useState } from 'react';

const SpeedContext = createContext();

export const useSpeed = () => useContext(SpeedContext);

export const SpeedProvider = ({ children }) => {
    const [speedBall, setSpeedBall] = useState(3);

    return (
        <SpeedContext.Provider value={{ speedBall, setSpeedBall }}>
            {children}
        </SpeedContext.Provider>
    );
};
