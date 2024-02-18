import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import NavBar from './Components/NavBar/NavBar';
import Profil from './Components/Pages/ProfilePage';
import Messages from './Components/Pages/MessagingPage';
import Parametres from './Components/Pages/SettingsPage';
import Accueil from './Components/Pages/MainPage';
import Recherche from './Components/Pages/SearchPage';
import './Styles/App.css';
import {AuthProvider, useAuth} from "./Contexts/AuthContext";
import PostPage from "./Components/Pages/PostPage";
import {AuthFormContext} from "./Contexts/AuthFormContext";
import FormManager from "./Components/AuthForm/FormManager";

const App: React.FC = () => {
    const [isAuthFormLogin, setIsAuthFormLogin] = useState<boolean>(true);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
    const [currentUser, setCurrentuser] = useState<any>(null);
    const {user} = useAuth();

    useEffect(() => {
        setCurrentuser(user);
        console.log('user:', user);
    });

    const handleSwitch = () => {
        setIsLoggedIn(!isLoggedIn);
    };

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };



    return (
        <AuthProvider>
            <AuthFormContext.Provider value={{isAuthFormLogin, setIsAuthFormLogin}}>
                <Router>
                    <NavBar onSettingsClick={togglePopup}/>
                    <Routes>
                        <Route path="/" element={<Accueil/>}/>
                        <Route path="/profile/*" element={<Profil/>} />
                        <Route path="/messages/*" element={ <Messages/>} />
                        <Route path="/parametres" element={ <Parametres isOpen={isPopupOpen} togglePopup={togglePopup}/>} />
                        <Route path="/login/*" element={<FormManager/>}/>
                        <Route path="/recherche/*" element={<Recherche/>} />
                        <Route path="/logout" element={<Navigate to="/login"/>}/>
                        <Route path="/announce/:id" element={<PostPage/>} />
                        <Route path="*" element={<div>Page not found</div>}/>
                    </Routes>
                </Router>
            </AuthFormContext.Provider>
        </AuthProvider>
    );
};

export default App;