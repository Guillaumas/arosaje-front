import React, { useContext } from 'react';
import { Route, Navigate, Outlet, RouteProps } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthContext';

// @ts-ignore
interface ProtectedRouteProps extends RouteProps {
    // No need to explicitly define the component prop here
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ ...rest }) => {
    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error('AuthContext is undefined, ensure AuthProvider is set up correctly.');
    }

    const { user } = authContext;

    // Directly return an Outlet or Navigate based on the authentication status
    return user ? <Outlet {...rest} /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
