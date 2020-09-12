import { authReducer } from 'store/authReducer';
import React, { createContext, useReducer } from 'react';
export const AuthContext = createContext(null);

const initialState = {
    user: null,
    wishlist: null,
    watchedlist: null,
};

function AuthenticationProvider(props) {
    const [state, dispatch] = useReducer(authReducer, initialState);
    return <AuthContext.Provider value={{ state, dispatch }} {...props} />;
}

export default AuthenticationProvider;
