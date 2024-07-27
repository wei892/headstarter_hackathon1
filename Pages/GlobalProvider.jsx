import React, { createContext, useState } from 'react';

// Create a Context
export const GlobalContext = createContext();

// Create a Provider component
export const GlobalProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    return (
        <GlobalContext.Provider value={{ user, setUser }}>
            {children}
        </GlobalContext.Provider>
    );
};
