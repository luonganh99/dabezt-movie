import { faPlayCircle, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import { Badge, Button } from 'reactstrap';
import './WishlistCard.scss';

WishlistCard.propTypes = {
    movie: PropTypes.object,
    onViewDetailClick: PropTypes.func,
    onRemoveClick: PropTypes.func,
};

function WishlistCard({ movie, onViewDetailClick, onRemoveClick }) {
    const { original_title, poster_path, id, genres, overview, vote_average } = movie;

    const handleViewDetailClick = () => {
        if (onViewDetailClick) {
            onViewDetailClick(id);
        }
    };

    const handleRemoveClick = () => {
        if (onRemoveClick) {
            onRemoveClick(id);
        }
    };

    return (
        <div className='wishlist-card'>
            <div className='wishlist-card__main'>
                <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt={original_title} />
                <div className='wishlist-card__overlay'>
                    <div className='wrapper' onClick={handleViewDetailClick}>
                        <div className='wishlist-card__overlay--title'>{original_title}</div>
                        <div className='wishlist-card__overlay--vote'>{vote_average}</div>

                        <div className='wishlist-card__overlay--icon'>
                            <FontAwesomeIcon size='4x' icon={faPlayCircle} className='icon' />
                        </div>
                        <div className='wishlist-card__overlay--overview'>{overview}</div>
                        <ul className='wishlist-card__overlay--genres'>
                            {genres.map((genre) => (
                                <li key={genre.id}>
                                    <Badge color='dark'>{genre.name}</Badge>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <Button color='danger' onClick={handleRemoveClick}>
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                </div>
            </div>

            <div className='wishlist-card__title'>{original_title}</div>
        </div>
    );
}

export default WishlistCard;
