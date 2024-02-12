import React, { createContext, useState, ReactNode, useContext } from 'react';

// Define the shape of the context state
interface AuthContextType {
    user: any; // Consider using a more specific type if possible
    setUser: React.Dispatch<React.SetStateAction<any>>;
}

// Provide a default context value that matches the AuthContextType
const defaultAuthContextValue: AuthContextType = {
    user: null, // Initial user state is null, indicating no user is logged in
    setUser: () => {}, // No-op function as a placeholder
};

// Create the context with the default value
export const AuthContext = createContext<AuthContextType>(defaultAuthContextValue);

// Define the props for AuthProvider component
interface AuthProviderProps {
    children: ReactNode;
}

// AuthProvider component
export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<any>(null); // State to hold the current user

    // Provide the current state and the setter function to the context
    const value = { user, setUser };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for consuming the context
export const useAuth = () => useContext(AuthContext);
