import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { User } from "../Interfaces/User";

interface AuthContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    jwtToken: string | null;
    setJwtToken: React.Dispatch<React.SetStateAction<string | null>>;
    setToken: (data: { jwtToken: string, user: User } | null) => void;
}

const defaultAuthContextValue: AuthContextType = {
    user: null,
    setUser: () => {},
    jwtToken: null,
    setJwtToken: () => {},
    setToken: () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContextValue);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [jwtToken, setJwtToken] = useState<string | null>(localStorage.getItem('jwtToken'));

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const setToken = (data: { jwtToken: string, user: User } | null) => {
        if (data) {
            localStorage.setItem('jwtToken', data.jwtToken);
            localStorage.setItem('user', JSON.stringify(data.user));
            setUser(data.user);
            setJwtToken(data.jwtToken);
        } else {
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('user');
            setUser(null);
            setJwtToken(null);
        }
    };

    const value = { user, setUser, jwtToken, setJwtToken, setToken };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
