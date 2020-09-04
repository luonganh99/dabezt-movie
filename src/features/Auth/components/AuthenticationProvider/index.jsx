import React, { createContext, useMemo, useState, useContext } from 'react';
import {} from 'react';

const AuthContext = createContext(null);

function AuthenticationProvider(props) {
    const [user, setUser] = useState(null);

    const auth = useMemo(() => {
        return {
            user,
            login: (user) => setUser(user),
            logout: () => setUser(null),
        };
    }, [user]);

    return <AuthContext.Provider value={auth} {...props} />;
}

export const useAuthContext = () => useContext(AuthContext);

export default AuthenticationProvider;
