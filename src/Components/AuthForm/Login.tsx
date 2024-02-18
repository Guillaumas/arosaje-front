import React, {useContext, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import '../../Styles/AuthForm.css';
import {useAuth} from "../../Contexts/AuthContext";
import {AuthFormContext} from "../../Contexts/AuthFormContext";
import {AuthService} from "../../Services/AuthService";


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const {setIsAuthFormLogin} = useContext(AuthFormContext);

    const navigate = useNavigate();
    const {setJwtToken} = useAuth();

    const checkAllInput = () => {
        return email !== '' && password !== '';
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        setEmailError('');
        setPasswordError('');

        if (password.trim() === '') {
            setPasswordError('Password is required');
            return;
        }

        if (email.trim() === '') {
            setEmailError('Email is required');
            return;
        }

        try {
            const response = await AuthService.login(email, password);

            if (!response.ok) {
                throw new Error('Failed to log in');
            }

            const data = await response.json();
            setJwtToken(data.token);
            navigate('/');
        } catch (error) {
            setEmailError('Failed to log in');
            setPasswordError('Failed to log in');
        }
    };

    return (
        <div className="login-background">
            <div className="form-container">
                <form onSubmit={handleSubmit} className="login-form">
                    <label>
                        Email Adress <sup style={{fontSize: '0.6em'}}>*</sup>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={emailError ? {border: '1px solid red'} : {}}
                        />
                    </label>
                    <label>
                        Password <sup style={{fontSize: '0.6em'}}>*</sup>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={passwordError ? {border: '1px solid red'} : {}}
                        />
                    </label>
                    <input type="submit" value="Log In" className="button-connect" disabled={!checkAllInput()}/>
                    <div className="login-text">
                        <span className="text-account-question">Don't have an account ? </span>
                        <button onClick={() => setIsAuthFormLogin(false)}>Sign Up</button>
                    </div>
                    <div className="text-asterisk">
                        * Champs obligatoires
                    </div>
                    <div className="text-rights">
                        All rights reserved, Arosaje©
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;