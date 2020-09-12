import { AuthContext } from 'context/AuthenticationProvider';
import firebase from 'firebase';
import { useContext } from 'react';
import { LOGIN, LOGOUT, SET_WISHLIST, SET_WATCHEDLIST } from 'store/actionTypes';

export const useAuth = () => {
    const { dispatch, state } = useContext(AuthContext);
    const login = (user) => {
        dispatch({
            type: LOGIN,
            user,
        });
    };

    const logout = () => {
        dispatch({
            type: LOGOUT,
        });
    };

    const setWishlist = (user) => {
        firebase
            .database()
            .ref(`wishlist/${user.uid}`)
            .on('value', (snapshot) => {
                let wishlistRes = [];
                snapshot.forEach((snap) => {
                    wishlistRes.push(snap.val());
                });
                dispatch({
                    type: SET_WISHLIST,
                    wishlist: wishlistRes,
                });
            });
    };

    const deleteWishlist = async (movieID) => {
        try {
            firebase
                .database()
                .ref('wishlist/' + state.user.uid + '/' + movieID)
                .remove();
        } catch (err) {
            console.log(err);
        }
    };

    const addWishlist = async (movie) => {
        try {
            firebase
                .database()
                .ref('wishlist/' + state.user.uid)
                .update({
                    [movie.id]: {
                        ...movie,
                    },
                });
        } catch (err) {
            console.log(err);
        }
    };

    const setWatchedlist = (user) => {
        firebase
            .database()
            .ref(`watchedlist/${user.uid}`)
            .on('value', (snapshot) => {
                let watchedlistRes = [];
                snapshot.forEach((snap) => {
                    watchedlistRes.push(snap.val());
                });
                dispatch({
                    type: SET_WATCHEDLIST,
                    watchedlist: watchedlistRes,
                });
            });
    };

    const deleteWatchedlist = async (movieID) => {
        try {
            firebase
                .database()
                .ref('watchedlist/' + state.user.uid + '/' + movieID)
                .remove();
        } catch (err) {
            console.log(err);
        }
    };

    const addWatchedlist = async (movie) => {
        try {
            firebase
                .database()
                .ref('watchedlist/' + state.user.uid)
                .update({
                    [movie.id]: {
                        ...movie,
                    },
                });
        } catch (err) {
            console.log(err);
        }
    };

    return {
        user: state.user,
        wishlist: state.wishlist,
        watchedlist: state.watchedlist,
        login,
        logout,
        addWishlist,
        deleteWishlist,
        setWishlist,
        addWatchedlist,
        deleteWatchedlist,
        setWatchedlist,
    };
};
