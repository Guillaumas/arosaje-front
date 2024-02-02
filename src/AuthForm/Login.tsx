import React, { useState } from 'react';
import './AuthForm.css';

interface LoginProps {
    onSwitch: () => void;
}

function Login({ onSwitch }: LoginProps) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        setUsernameError('');
        setPasswordError('');

        if (username.trim() === '') {
            setUsernameError('Username is required');
        }

        if (password.trim() === '') {
            setPasswordError('Password is required');
        }

        if (usernameError === '' && passwordError === '') {
            // Implémentez la logique de connexion
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