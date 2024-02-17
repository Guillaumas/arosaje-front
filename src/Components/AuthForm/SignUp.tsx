import React, {useState} from 'react';
import '../../Styles/AuthForm.css';

interface SignUpProps {
    onSwitch: () => void;
}

function SignUp({ onSwitch }: SignUpProps) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');

    const handleSignUp = async (event: React.FormEvent) => {
        event.preventDefault();

        setUsernameError('');
        setPasswordError('');
        setEmailError('');

        if (username.trim() === '') {
            setUsernameError('Username is required');
        }

        if (password.trim() === '') {
            setPasswordError('Password is required');
        }

        if (email.trim() === '') {
            setEmailError('Email is required');
        }

        if (usernameError === '' && passwordError === '' && emailError === '') {
            try {
                const response = await fetch('/api/auth/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password, email })
                });

                if (!response.ok) {
                    throw new Error(`Signup failed: ${response.statusText}`);
                }
            } catch (error) {
                console.error('Error during signup:', error);
            }
        }
    };

    return (
        <div className="login-background">
            <div className="form-container">
                <form onSubmit={handleSignUp} className="login-form">
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
                    <input type="submit" value="Sign In" className="button-connect"/>
                    <div className="login-text">
                        <span className="text-account-question">Already have an account ? </span>
                        <span className="text-switch-log" onClick={onSwitch}>Log in</span>
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

export default SignUp;