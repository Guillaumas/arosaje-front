import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import Popup from '../PopupSettings/popup';


const StyledNav = styled.nav`
    background-color: #f8f9fa;
    padding: 10px;
    display: flex;
    justify-content: space-around;
    position: relative;
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

interface NavBarProps {
    onSettingsClick: () => void;
}

const NavBar: React.FC<NavBarProps> = ({onSettingsClick}) => {
    const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

    const handleReset = () => {
        document.documentElement.style.setProperty('--color1', '#48806c');
        document.documentElement.style.setProperty('--color2', 'rgb(5, 5, 5)');
    };

    const handleChange = () => {
        const color1 = '#' + Math.floor(Math.random() * 16777215).toString(16);
        const color2 = '#' + Math.floor(Math.random() * 16777215).toString(16);

        document.documentElement.style.setProperty('--color1', color1);
        document.documentElement.style.setProperty('--color2', color2);
    };

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    return (
        <StyledNav>
            <StyledUl>
                <StyledLi>
                    <Link to="/">Accueil</Link>
                </StyledLi>
                <StyledLi>
                    <Link to="/profile">Profil</Link>
                </StyledLi>
                <StyledLi>
                    <Link to="/messages">Messages</Link>
                </StyledLi>
                <StyledLi>
                    <a href="src/Components/NavBar#" onClick={(e) => {
                        e.preventDefault();
                        togglePopup();
                    }}>Paramètres</a>
                    {isPopupOpen &&
                        <Popup handleClose={togglePopup} handleReset={handleReset} handleChange={handleChange}/>}
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