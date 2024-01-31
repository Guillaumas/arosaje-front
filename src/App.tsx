import React, { useState } from 'react';
import Login from './Login';
import SignIn from './SignIn';
import './App.css';

const App: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);

    const handleSwitch = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className="App">
            {isLogin ? <Login onSwitch={handleSwitch} /> : <SignIn onSwitch={handleSwitch} />}
        </div>
    );
};

export default App;