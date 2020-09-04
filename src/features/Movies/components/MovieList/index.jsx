import useMovieList from 'hooks/useMovieList';
import PropTypes from 'prop-types';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { formatType } from 'utils';
import MovieCard from '../MovieCard';
import './MovieList.scss';

MovieList.propTypes = {
    type: PropTypes.string,
};

function MovieList({ type }) {
    const { movieList } = useMovieList(type, 1, 5);
    const history = useHistory();

    const handleViewDetailClick = (movieId) => {
        history.push(`/movie/${movieId}`);
    };

    return (
        <div className='movie-list'>
            <div className='d-flex justify-content-between align-items-center pb-2'>
                <div className='movie-list__title'>{formatType(type)}</div>
                <div className='movie-list__view'>
                    <Link to={`/${type}/1`}>View all</Link>
                </div>
            </div>
            <div className='movie-list__list'>
                {movieList.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                        onViewDetailClick={handleViewDetailClick}
                    />
                ))}
            </div>
        </div>
    );
}

export default MovieList;
