import firebase from 'firebase';
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Redirect } from 'react-router-dom';
import { useAuthContext } from 'features/Auth/components/AuthenticationProvider';

const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    callbacks: {
        // Avoid redirects after sign-in.
        signInSuccessWithAuthResult: () => false,
    },
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
};

function SignIn() {
    const { user } = useAuthContext();

    return (
        <>
            {!user ? (
                <div className='sign-in'>
                    <div className='sign-in__form'>
                        <div className='sign-in__form-title'>Login to DaBezt Movie</div>
                        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                        <div>or</div>
                        <form></form>
                    </div>
                </div>
            ) : (
                <Redirect to='/' />
            )}
        </>
    );
}

export default SignIn;
