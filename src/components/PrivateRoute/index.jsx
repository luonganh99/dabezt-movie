import React from 'react';
import { useAuthContext } from 'features/Auth/components/AuthenticationProvider';
import { Redirect, Route } from 'react-router-dom';

function PrivateRoute({ component: Component, ...rest }) {
    const { user } = useAuthContext();

    if (!user) {
        return <Redirect to='/sign-in' />;
    }

    return <Route component={Component} {...rest} />;
}

export default PrivateRoute;
