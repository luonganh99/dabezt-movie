import moviesApi from 'api/tmdbApi/moviesApi';
import Pagination from 'components/Pagination';
import MovieCard from 'features/Movies/components/MovieCard';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Container } from 'reactstrap';
import { formatType } from 'utils';
import './MovieFilter.scss';

function MovieFilter(props) {
    const history = useHistory();
    const { movieType, page } = useParams();
    const [movieList, setMovieList] = useState([]);
    const [totalPages, setTotalPages] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            const res = await moviesApi.getMovies(movieType, page);
            const newMovieList = res.results;
            const newTotalPages = res.total_pages;
            setMovieList(newMovieList);
            setTotalPages(newTotalPages);
            window.scrollTo(0, 0);
        };

        fetchMovies();
    }, [page]);

    const handleViewDetailClick = (movieId) => {
        history.push(`/movie/${movieId}`);
    };

    const handlePaginationClick = (newPage) => {
        history.push(`/${movieType}/${newPage}`);
    };

    return (
        <div className='movie-filter'>
            <Container fluid>
                <div className='movie-filter__title'>{formatType(movieType)}</div>
                <div className='movie-filter__list'>
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

export default MovieFilter;
