import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import Profil from './Pages/ProfilePage';
import Messages from './Pages/MessagingPage';
import Parametres from './Pages/SettingsPage';
import Login from './AuthForm/Login';
import Accueil from './Pages/MainPage';
import Recherche from './Pages/SearchPage';
import './App.css';

const App: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

    const handleSwitch = () => {
        setIsLoggedIn(!isLoggedIn);
    };

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    return (
        <Router>
            <NavBar onSettingsClick={togglePopup}/>
            <Routes>
                <Route path="/" element={<Accueil/>}/>
                <Route path="/profile/*" element={<Profil/>}/>
                <Route path="/messages/*" element={<Messages/>}/>
                <Route path="/parametres" element={<Parametres isOpen={isPopupOpen} togglePopup={togglePopup}/>}/>
                <Route path="/login/*" element={<Login onSwitch={handleSwitch}/>}/>
                <Route path="/recherche/*" element={<Recherche/>}/>
                <Route path="*" element={<div>Page not found</div>}/>
            </Routes>
        </Router>
    );
};

export default App;