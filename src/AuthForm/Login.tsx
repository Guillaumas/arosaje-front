import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './AuthForm.css';

interface LoginProps {
    onSwitch: () => void;
}

function Login({ onSwitch }: LoginProps) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const history = useHistory();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        setUsernameError('');
        setPasswordError('');

        const hardcodedUsername = 'test';
        const hardcodedPassword = 'test';

        if (username.trim() === '') {
            setUsernameError('Username is required');
        } else if (username !== hardcodedUsername) {
            setUsernameError('Invalid username');
        }

        if (password.trim() === '') {
            setPasswordError('Password is required');
        } else if (password !== hardcodedPassword) {
            setPasswordError('Invalid password');
        }

        if (username === hardcodedUsername && password === hardcodedPassword) {
            history.push('/');
        }
    };

    return (
        <div className="login-background">
            <div className="form-container">
                <form onSubmit={handleSubmit} className="login-form">
                    <label>
                        Username <sup style={{fontSize: '0.6em'}}>*</sup>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={usernameError ? {border: '1px solid red'} : {}}
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
                    <input type="submit" value="Log In" className="button-connect"/>
                    <div className="login-text">
                        <span className="text-account-question">Don't have an account ? </span>
                        <span className="text-switch-log" onClick={onSwitch}>Sign up</span>
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