import { useAuth } from 'hooks/useAuth';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Spinner } from 'reactstrap';
import CustomCard from '../../components/CustomCard';
import './Wishlist.scss';

function WishList() {
    const { wishlist, deleteWishlist } = useAuth();
    const history = useHistory();

    const handleViewDetailClick = (movieId) => {
        history.push(`/movie/${movieId}`);
    };

    const handleRemoveClick = (movieId) => {
        deleteWishlist(movieId);
    };

    return (
        <div className='wish-list'>
            <Container fluid>
                <div className='wish-list__title'>Wishlist</div>
                <div className='wish-list__list'>
                    {!wishlist ? (
                        <Spinner />
                    ) : (
                        wishlist.map((movie) => (
                            <CustomCard
                                onViewDetailClick={handleViewDetailClick}
                                onRemoveClick={handleRemoveClick}
                                key={movie.id}
                                movie={movie}
                            >
                                {movie.original_title}
                            </CustomCard>
                        ))
                    )}
                </div>
                {wishlist && wishlist.length === 0 && (
                    <p>There is no movies in your wishlist yet!</p>
                )}
            </Container>
        </div>
    );
}

export default WishList;
