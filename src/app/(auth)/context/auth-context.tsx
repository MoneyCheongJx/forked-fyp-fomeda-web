"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextProps {
    redirecting: boolean;
    setRedirecting: (value: boolean) => void;
}


const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [redirecting, setRedirecting] = useState(false);

    return (
        <AuthContext.Provider value={{redirecting, setRedirecting}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
