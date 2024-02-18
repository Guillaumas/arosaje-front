import React, {createContext, useState} from 'react';

interface AuthFormContextType {
    isAuthFormLogin: boolean;
    setIsAuthFormLogin: (isLogin: boolean) => void;
}

export const AuthFormContext = createContext<AuthFormContextType>({
    isAuthFormLogin: true,
    setIsAuthFormLogin: isLogin => console.warn('no auth form provider')
});