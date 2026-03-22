import React, { createContext, useState } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [delaySeconds, setDelaySeconds] = useState(3);
    const [audioSpeed, setAudioSpeed] = useState(100);
    const [backgroundVolume, setBackgroundVolume] = useState(2);

    return (
        <AppContext.Provider value={{
            delaySeconds, setDelaySeconds,
            audioSpeed, setAudioSpeed,
            backgroundVolume, setBackgroundVolume
        }}>
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppProvider };