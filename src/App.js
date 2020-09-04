import Header from 'components/Header';
import PrivateRoute from 'components/PrivateRoute';
import { useAuthContext } from 'features/Auth/components/AuthenticationProvider';
import firebase from 'firebase';
import React, { lazy, Suspense, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import './App.scss';

const Movies = lazy(() => import('./features/Movies'));
const Search = lazy(() => import('./features/Search'));
const WishList = lazy(() => import('./features/WishList'));
const SignIn = lazy(() => import('./features/Auth/pages/SignIn'));

const config = {
    apiKey: 'AIzaSyBTw3sn3I9w0AWeveopwnfFQ2iy7SF_YzA',
    authDomain: 'dabezt-movie.firebaseapp.com',
    databaseURL: 'https://dabezt-movie.firebaseio.com/',
};
firebase.initializeApp(config);

function App() {
    const { login, logout } = useAuthContext();

    useEffect(() => {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                console.log('User does not login');
                return;
            }

            login(user);
            console.log('Logined user: ', user.displayName);
        });

        return () => unregisterAuthObserver();
    }, []);

    return (
        <div className='App'>
            <Header />
            <Suspense fallback={'Loading ...'}>
                <Switch>
                    <Route path='/search/:query/:page' component={Search} />
                    <PrivateRoute path='/wishlist' component={WishList} />
                    <Route path='/sign-in' component={SignIn} />
                    <Route path='/' component={Movies} />
                </Switch>
            </Suspense>
        </div>
    );
}

export default App;
