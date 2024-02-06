import React from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Accueil</Link>
        </li>
        <li>
          <Link to="/profil">Profil</Link>
        </li>
        <li>
          <Link to="/messages">Messages</Link>
        </li>
        <li>
          <Link to="/parametres">Paramètres</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/recherche">Recherche</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;



//todo affichage de la navbar responsive
//todo - bouton d'accueil
//todo - bouton de profil
//todo - bouton de messages
//todo - bouton de parametres
//todo - bouton de login
//todo - bouton de recherche
//todo 2 si l'utilisateur appuie sur le bouton de profil, afficher la page du profil
//todo 3 si l'utilisateur appuie sur le bouton de messages, afficher la page des messages
//todo 4 si l'utilisateur appuie sur le bouton de parametres, afficher la page des parametres
//todo 5 si l'utilisateur appuie sur le bouton de login, afficher la page de login
//todo 6 si l'utilisateur appuie sur le bouton de d'accueil, afficher la page d'accueil
//todo 7 si l'utilisateur appuie sur le bouton de recherche, afficher la page de recherche
