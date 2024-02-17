import React, {useEffect, useState} from 'react';
import Login from './Login';
import '../../Styles/AuthForm.css';
import '../../Styles/App.css';
import SignUp from "./SignUp";
import { useAuth } from '../../Contexts/AuthContext';

function FormManager() {
    const { jwtToken } = useAuth();
    const [isLogin, setIsLogin] = useState<boolean>(true);

    useEffect(() => {
        if (jwtToken) {
            setIsLogin(false);
        }
    }, [jwtToken]);

    return isLogin ? <Login onSwitch={() => setIsLogin(false)} /> : <SignUp onSwitch={() => setIsLogin(true)} />;
}

export default FormManager;