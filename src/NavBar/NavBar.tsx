import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledNav = styled.nav`
  background-color: #f8f9fa;
  padding: 10px;
  display: flex;
  justify-content: space-around;
  position: absolute;
  top: 0;
  z-index: 100;
  width: 100%;
  box-sizing: border-box;
`;

const StyledUl = styled.ul`
    display: flex;
    list-style: none;
`;

const StyledLi = styled.li`
    margin: 0 10px;
`;

const NavBar: React.FC = () => {
  return (
    <StyledNav>
      <StyledUl>
        <StyledLi>
          <Link to="/">Accueil</Link>
        </StyledLi>
        <StyledLi>
          <Link to="/profil">Profil</Link>
        </StyledLi>
        <StyledLi>
          <Link to="/messages">Messages</Link>
        </StyledLi>
        <StyledLi>
          <Link to="/parametres">Paramètres</Link>
        </StyledLi>
        <StyledLi>
          <Link to="/login">Login</Link>
        </StyledLi>
        <StyledLi>
          <Link to="/recherche">Recherche</Link>
        </StyledLi>
      </StyledUl>
    </StyledNav>
  );
};

export default NavBar;



//todo affichage de la navbar responsive