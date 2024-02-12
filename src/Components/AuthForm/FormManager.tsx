import React, { useState } from 'react';
import Login from './Login';
import './AuthForm.css';
import '../../App.css';
import SignIn from "./SignIn";

function FormManager() {
    const [isLogin, setIsLogin] = useState(true);

    const handleSwitch = () => {
        setIsLogin(!isLogin);
    };

    return isLogin ? <Login onSwitch={handleSwitch} /> : <SignIn onSwitch={handleSwitch} />;
}

export default FormManager;