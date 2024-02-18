import React, { useState } from 'react';
import Login from './Login';
import './AuthForm.css';
import '../../Styles/App.css';
import SignUp from "./SignUp";

function FormManager() {
    const [isLogin, setIsLogin] = useState(true);

    const handleSwitch = () => {
        setIsLogin(!isLogin);
    };

    return isLogin ? <Login onSwitch={handleSwitch} /> : <SignUp onSwitch={handleSwitch} />;
}

export default FormManager;