import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import config from 'config';
import PropTypes from 'prop-types';
import React from 'react';
import { Badge } from 'reactstrap';
import './MovieCard.scss';
import defaultMovie from 'assets/imgs/default-movie.png';

MovieCard.propTypes = {
    movie: PropTypes.object,
    onViewDetailClick: PropTypes.func,
};

function MovieCard({ movie, onViewDetailClick }) {
    const { original_title, poster_path, id, genre_ids, overview, vote_average } = movie;

    const handleViewDetailClick = () => {
        if (onViewDetailClick) {
            onViewDetailClick(id);
        }
    };

    return (
        <div className='movie-card'>
            <div className='movie-card__main' onClick={handleViewDetailClick}>
                <img
                    src={
                        poster_path
                            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                            : defaultMovie
                    }
                    alt={original_title}
                />
                <div className='movie-card__overlay'>
                    <div className='movie-card__overlay--title'>{original_title}</div>
                    <div className='movie-card__overlay--vote'>{vote_average}</div>

                    <div className='movie-card__overlay--icon'>
                        <FontAwesomeIcon size='4x' icon={faPlayCircle} className='icon' />
                    </div>
                    <div className='movie-card__overlay--overview'>{overview}</div>
                    <ul className='movie-card__overlay--genres'>
                        {genre_ids.map((id) => (
                            <li key={id}>
                                <Badge color='dark'>{config.GENRES[id]}</Badge>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className='movie-card__title'>{original_title}</div>
        </div>
    );
}

export default MovieCard;
