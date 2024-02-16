import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './Components/NavBar/NavBar';
import Profil from './Components/Pages/ProfilePage';
import Messages from './Components/Pages/MessagingPage';
import Parametres from './Components/Pages/SettingsPage';
import Login from './Components/AuthForm/Login';
import Accueil from './Components/Pages/MainPage';
import Recherche from './Components/Pages/SearchPage';
import ProtectedRoute from './Components/ProtectedRoute'; // Ensure this is correctly imported
import './App.css';
import {AuthProvider, AuthContext, useAuth} from "./Contexts/AuthContext";

const App: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

    const handleSwitch = () => {
        setIsLoggedIn(!isLoggedIn);
    };

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    const { user, jwtToken } = useAuth();

    return (
        <AuthProvider>
            <Router>
                <NavBar onSettingsClick={togglePopup}/>
                <Routes>
                    <Route path="/" element={<Accueil/>}/>
                    <Route path="/profile/*" element={user ? <Profil/> : <Navigate to="/login" />}/>
                    <Route path="/messages/*" element={user ? <Messages/> : <Navigate to="/login" />}/>
                    <Route path="/parametres" element={user ? <Parametres isOpen={isPopupOpen} togglePopup={togglePopup}/> : <Navigate to="/login" />}/>
                    <Route path="/login/*" element={<Login onSwitch={handleSwitch}/>}/>
                    <Route path="/recherche/*" element={<Recherche/>}/>
                    <Route path="*" element={<div>Page not found</div>}/>
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
