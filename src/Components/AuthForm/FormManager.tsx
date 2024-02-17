import React from 'react';
import Login from './Login';
import '../../Styles/AuthForm.css';
import '../../Styles/App.css';
import SignUp from "./SignUp";
import {useAuth} from '../../Contexts/AuthContext';
import {AuthFormContext} from '../../Contexts/AuthFormContext';

function FormManager() {
    const {jwtToken} = useAuth();
    const {isAuthFormLogin, setIsAuthFormLogin} = React.useContext(AuthFormContext);

    return isAuthFormLogin ? <Login /> : <SignUp />;
}

export default FormManager;