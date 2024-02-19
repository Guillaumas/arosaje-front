import React from 'react';
import Popup from '../PopupSettings/popup';

interface SettingsProps {
    isOpen: boolean;
    togglePopup: () => void;
}

const   Settings: React.FC<SettingsProps> = ({ isOpen, togglePopup }) => {
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

    return (
        <div>
            {isOpen && <Popup handleClose={togglePopup} handleReset={handleReset} handleChange={handleChange}/>}
        </div>
    );
};

export default Settings;