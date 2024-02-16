import React, {createContext, useState, ReactNode, useContext} from 'react';
import {User} from "../Interfaces/User";

interface AuthContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    jwtToken: string | null;
    setJwtToken: (data: { jwtToken: string, user: User }) => void;
}

const defaultAuthContextValue: AuthContextType = {
    user: null,
    setUser: () => {},
    jwtToken: null,
    setJwtToken: () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContextValue);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [jwtToken, setJwtToken] = useState<string | null>(localStorage.getItem('jwtToken'));

    const setToken = (data: { jwtToken: string, user: User }) => {
        localStorage.setItem('jwtToken', data.jwtToken);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        setJwtToken(data.jwtToken);
    };

    const value = { user, setUser, jwtToken, setJwtToken: setToken };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);