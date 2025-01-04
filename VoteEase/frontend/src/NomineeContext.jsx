import React, { createContext, useContext, useState } from 'react';

// Create the context
const NomineeContext = createContext();

// Custom hook to use the NomineeContext
export const useNomineeContext = () => {
    const context = useContext(NomineeContext);
    if (!context) {
        throw new Error('useNomineeContext must be used within a NomineeProvider');
    }
    return context;
};

// Provider component
export const NomineeProvider = ({ children }) => {
    const [nominees, setNominees] = useState([]); // Initial state

    return (
        <NomineeContext.Provider value={{ nominees, setNominees }}>
            {children}
        </NomineeContext.Provider>
    );
};
