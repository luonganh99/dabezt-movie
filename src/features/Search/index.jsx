import moviesApi from 'api/tmdbApi/moviesApi';
import Pagination from 'components/Pagination';
import MovieCard from 'features/Movies/components/MovieCard';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Container } from 'reactstrap';
import './Search.scss';

function Search(props) {
    const { query, page } = useParams();
    const [movieList, setMovieList] = useState([]);
    const [totalPages, setTotalPages] = useState(null);
    const history = useHistory();

    useEffect(() => {
        const fetchMovies = async () => {
            const res = await moviesApi.searchMovies(query, page);
            setMovieList(res.results);
            setTotalPages(res.total_pages);
        };

        fetchMovies();
    }, [query, page]);

    const handleViewDetailClick = (movieId) => {
        history.push(`/movie/${movieId}`);
    };

    const handlePaginationClick = (newPage) => {
        history.push(`/search/${query}/${newPage}`);
    };

    return (
        <div className='movie-search'>
            <Container fluid>
                <div className='movie-search__title'>
                    Search results for <span>"{query}"</span>{' '}
                </div>
                <div className='movie-search__list'>
                    {movieList.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            onViewDetailClick={handleViewDetailClick}
                        />
                    ))}
                </div>
                <Pagination
                    totalPages={totalPages}
                    page={+page}
                    onPaginationClick={handlePaginationClick}
                />
            </Container>
        </div>
    );
}

export default Search;
