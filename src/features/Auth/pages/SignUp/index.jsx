import AuthenticationForm from 'features/Auth/components/AuthenticationForm';
import firebase from 'firebase';
import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import './SignUp.scss';
import { useAuth } from 'hooks/useAuth';
import Footer from 'components/Footer';

function SignUp() {
    const { user } = useAuth();

    const initialValues = {
        email: '',
        password: '',
    };

    const handleSubmit = async (data, { setSubmitting, setStatus }) => {
        setSubmitting(true);
        try {
            await firebase.auth().createUserWithEmailAndPassword(data.email, data.password);
        } catch (err) {
            setStatus(err.code);
        }
        setSubmitting(false);
    };

    return (
        <>
            {!user ? (
                <div className='sign-up'>
                    <div className='sign-up__form'>
                        <div className='sign-up__form-title'>Sign up</div>
                        <div className='sign-up__form-body'>
                            <AuthenticationForm
                                initialValues={initialValues}
                                onSubmit={handleSubmit}
                            />
                        </div>
                        <div className='sign-up__form-footer'>
                            <p>
                                Already have an account ?{' '}
                                <Link className='link' to='/sign-in'>
                                    Sign up
                                </Link>{' '}
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <Redirect to='/' />
            )}
            <Footer />
        </>
    );
}

export default SignUp;
