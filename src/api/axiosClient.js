import axios from 'axios';
import queryString from 'query-string';
import config from '../config';

export const axiosMovies = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    paramsSerializer: (params) => queryString.stringify(params),
    params: {
        api_key: config.MOVIE_DB_API_KEY,
    },
});

axiosMovies.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    (error) => {
        throw error;
    }
);
