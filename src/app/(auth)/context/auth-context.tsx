"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserData {
    fullname?: string;
    username?: string;
    email_address?: string;
    is_active?: string;
    type?: string;
    modules?: string[]; // Assuming modules are part of user data
}

interface AuthContextProps {
    userData: UserData | null;
    setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
    resetUserData: () => void;
    redirecting: boolean;
    setRedirecting: (value: boolean) => void;
}


const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [userData, setUserData] = useState<UserData | null>(null);
    const [redirecting, setRedirecting] = useState(false);

    const resetUserData = () => {
        setUserData(null);
        setRedirecting(false);
    };

    return (
        <AuthContext.Provider value={{ userData, setUserData, resetUserData, redirecting, setRedirecting}}>
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
