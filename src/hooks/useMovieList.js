import moviesApi from 'api/tmdbApi/moviesApi';

const { useEffect, useState } = require('react');

const useMovieList = (type, page, amount) => {
    const [movieList, setMovieList] = useState([]);
    const [totalPages, setTotalPages] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            const res = await moviesApi.getMovies(type, page);
            const newMovieList = amount ? res.results.slice(0, amount) : res.results;
            const newTotalPages = res.total_pages;
            setMovieList(newMovieList);
            setTotalPages(newTotalPages);
        };

        fetchMovies();
    }, [page]);

    return { movieList, totalPages };
};

export default useMovieList;
