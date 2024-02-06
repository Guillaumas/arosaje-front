import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Messaging/Sidebar';
import Conversation from './Messaging/Conversation';
import NavBar from './NavBar/NavBar';
import Profil from './Pages/ProfilePage';
import Messages from './Pages/MessagingPage';
import Parametres from './Pages/SettingsPage';
import Login from './AuthForm/Login';
import Accueil from './Pages/MainPage';
import Recherche from './Pages/SearchPage';
import './App.css';

const App: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<any>({});
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const handleSwitch = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/profil/*" element={<Profil />} />
        <Route path="/messages/*" element={<Messages />} />
        <Route path="/parametres/*" element={<Parametres />} />
        <Route path="/login/*" element={<Login onSwitch={handleSwitch} />} />
        <Route path="/recherche/*" element={<Recherche />} />
      </Routes>
      <Sidebar isconversationselected={selectedConversation !== null} />
      <Conversation selectedConversation={selectedConversation} />
    </Router>
  );
};

export default App;