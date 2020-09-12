import Footer from 'components/Footer';
import AuthenticationForm from 'features/Auth/components/AuthenticationForm';
import firebase from 'firebase';
import { useAuth } from 'hooks/useAuth';
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { Link, Redirect } from 'react-router-dom';
import './SignIn.scss';

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
    const { user } = useAuth();

    const initialValues = {
        email: '',
        password: '',
    };

    const handleSubmit = async (data, { setSubmitting, setStatus }) => {
        setSubmitting(true);
        try {
            await firebase.auth().signInWithEmailAndPassword(data.email, data.password);
        } catch (err) {
            setStatus(err.code);
        }
        setSubmitting(false);
    };

    return (
        <>
            {!user ? (
                <div className='sign-in'>
                    <div className='sign-in__form'>
                        <div className='sign-in__form-title'>Login to DaBezt Movie</div>
                        <div className='sign-in__form-body'>
                            <AuthenticationForm
                                initialValues={initialValues}
                                onSubmit={handleSubmit}
                            />
                        </div>
                        <div className='sign-in__form-footer'>
                            <p>
                                Do not have an account ?{' '}
                                <Link className='link' to='/sign-up'>
                                    Sign up
                                </Link>{' '}
                            </p>
                        </div>
                        <div className='sign-in__form-seperator'>or</div>
                        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                    </div>
                </div>
            ) : (
                <Redirect to='/' />
            )}
            <Footer />
        </>
    );
}

export default SignIn;
