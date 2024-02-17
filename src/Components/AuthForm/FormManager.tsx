import React, {useEffect, useState} from 'react';
import Login from './Login';
import './AuthForm.css';
import '../../Styles/App.css';
import SignIn from "./SignIn";
import { useAuth } from '../../Contexts/AuthContext';

function FormManager() {
    const { jwtToken } = useAuth();
    const [isLogin, setIsLogin] = useState<boolean>(true);

    useEffect(() => {
        if (jwtToken) {
            setIsLogin(false);
        }
    }, [jwtToken]);

    return isLogin ? <Login onSwitch={() => setIsLogin(false)} /> : <SignIn onSwitch={() => setIsLogin(true)} />;
}

export default FormManager;