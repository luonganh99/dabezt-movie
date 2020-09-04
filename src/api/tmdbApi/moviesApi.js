import { axiosMovies } from 'api/axiosClient';

const moviesApi = {
    getMovies(type, page) {
        const url = `/movie/${type}`;
        return axiosMovies.get(url, {
            params: {
                page,
                language: 'en-US',
            },
        });
    },
    getMovieDetail(id) {
        const url = `/movie/${id}`;
        return axiosMovies.get(url);
    },
    getMovieVideo(id) {
        const url = `/movie/${id}/videos`;
        return axiosMovies.get(url);
    },
    getMovieCredit(id) {
        const url = `/movie/${id}/credits`;
        return axiosMovies.get(url);
    },
    getRecommendations(id) {
        const url = `/movie/${id}/recommendations`;
        return axiosMovies.get(url);
    },
    searchMovies(query, page) {
        const url = `/search/movie`;
        return axiosMovies.get(url, {
            params: {
                page,
                query,
            },
        });
    },
};

export default moviesApi;
