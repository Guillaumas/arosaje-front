import React, { useEffect, useState } from 'react';
import FormManager from './FormManager'; // Importez FormManager
import MainPage from './MainPage';
import { isTokenExpired } from './AuthFunction';

const Auth = () => {
    const [tokenExpired, setTokenExpired] = useState(false);

    useEffect(() => {
        // Vérifiez l'état du token OAuth ici
        const checkToken = async () => {
            const expired = await isTokenExpired();
            setTokenExpired(expired);
        };

        checkToken();
    }, []);

    return tokenExpired ? <FormManager /> : <MainPage />;
};

export default Auth;