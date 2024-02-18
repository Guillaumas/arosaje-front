import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext';

const Logout: React.FC = () => {
    const { setToken } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        setToken(null);
        localStorage.clear();
        window.location.reload();
        navigate('/');
    }, [setToken, navigate]);

    return null;
};

export default Logout;