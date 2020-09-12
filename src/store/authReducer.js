import { LOGIN, LOGOUT, SET_WISHLIST, SET_WATCHEDLIST } from './actionTypes';

export const authReducer = (state, action) => {
    switch (action.type) {
        case LOGIN: {
            return {
                ...state,
                user: action.user,
            };
        }
        case LOGOUT: {
            return {
                ...state,
                user: null,
            };
        }
        case SET_WISHLIST: {
            return {
                ...state,
                wishlist: action.wishlist,
            };
        }
        case SET_WATCHEDLIST: {
            return {
                ...state,
                watchedlist: action.watchedlist,
            };
        }
        default:
            return state;
    }
};
