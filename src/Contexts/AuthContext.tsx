import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { User } from "../Interfaces/User";
import {isTokenExpired} from "../Components/AuthForm/AuthFunction";

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
    const [jwtToken, setJwtToken] = useState<string | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const jwtToken = localStorage.getItem('jwtToken');

        if (storedUser && jwtToken) { //todo: check if token is expired
            setUser(JSON.parse(storedUser));
            setJwtToken(jwtToken);
        } else {
            setUser(null);
            setJwtToken(null);
        }
    }, []);

    const setToken = (data: { jwtToken: string, user: User } | null) => {
        if (data) {
            localStorage.setItem('jwtToken', data.jwtToken);
            localStorage.setItem('user', JSON.stringify(data.user));
            setJwtToken(data.jwtToken);
            setUser(data.user);
        } else {
            localStorage.removeItem('jwtToken');
            localStorage.removeItem('user');
            setJwtToken(null);
            setUser(null);
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
