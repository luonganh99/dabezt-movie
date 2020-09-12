import Header from 'components/Header';
import PrivateRoute from 'components/PrivateRoute';
import firebase from 'firebase';
import { useAuth } from 'hooks/useAuth';
import React, { lazy, Suspense, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import './App.scss';

const Movies = lazy(() => import('./features/Movies'));
const Search = lazy(() => import('./features/Search'));
const WishList = lazy(() => import('./features/List/pages/Wishlist'));
const WatchedList = lazy(() => import('./features/List/pages/Watchedlist'));
const SignIn = lazy(() => import('./features/Auth/pages/SignIn'));
const SignUp = lazy(() => import('./features/Auth/pages/SignUp'));

const config = {
    apiKey: 'AIzaSyBTw3sn3I9w0AWeveopwnfFQ2iy7SF_YzA',
    authDomain: 'dabezt-movie.firebaseapp.com',
    databaseURL: 'https://dabezt-movie.firebaseio.com/',
};
firebase.initializeApp(config);

function App() {
    const { login, setWishlist, setWatchedlist } = useAuth();

    useEffect(() => {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
            if (!user) {
                localStorage.removeItem('user');
                return;
            }
            localStorage.setItem('user', JSON.stringify(user));
            login(user);
            setWishlist(user);
            setWatchedlist(user);
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
                    <PrivateRoute path='/watchedlist' component={WatchedList} />
                    <Route path='/sign-in' component={SignIn} />
                    <Route path='/sign-up' component={SignUp} />
                    <Route path='/' component={Movies} />
                </Switch>
            </Suspense>
        </div>
    );
}

export default App;
