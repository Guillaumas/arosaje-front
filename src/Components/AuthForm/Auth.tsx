import React, { useEffect, useState } from 'react';
import MainPage from '../Pages/MainPage';
import { isTokenExpired } from "./AuthFunction";
import { useAuth } from '../../Contexts/AuthContext';
import FormManager from "./FormManager";

const Auth = () => {
    const { jwtToken, setJwtToken } = useAuth();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        const checkTokenExpiration = async () => {
            if (jwtToken) {
                if (await isTokenExpired()) {
                    setJwtToken(null);
                    setIsLoggedIn(false);
                } else {
                    setIsLoggedIn(true);
                }
            }
        };

        checkTokenExpiration();
    }, [jwtToken, setJwtToken]);

    return isLoggedIn ? <MainPage /> : <FormManager />;
};

export default Auth;