import { useAuth } from 'hooks/useAuth';
import React from 'react';
import { Redirect, Route } from 'react-router-dom';

function PrivateRoute({ component: Component, ...rest }) {
    const { user } = useAuth();
    const userLocal = JSON.parse(localStorage.getItem('user'));

    if (!user && !userLocal) {
        return <Redirect to='/sign-in' />;
    }

    return <Route component={Component} {...rest} />;
}

export default PrivateRoute;
