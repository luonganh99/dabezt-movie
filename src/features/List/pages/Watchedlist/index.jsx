import { useAuth } from 'hooks/useAuth';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Spinner } from 'reactstrap';
import CustomCard from '../../components/CustomCard';
import './Watchedlist.scss';

function Watchedlist() {
    const { watchedlist, deleteWatchedlist } = useAuth();
    const history = useHistory();

    const handleViewDetailClick = (movieId) => {
        history.push(`/movie/${movieId}`);
    };

    const handleRemoveClick = (movieId) => {
        deleteWatchedlist(movieId);
    };

    return (
        <div className='watched-list'>
            <Container fluid>
                <div className='watched-list__title'>Watched List</div>
                <div className='watched-list__list'>
                    {!watchedlist ? (
                        <Spinner />
                    ) : (
                        watchedlist.map((movie) => (
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
                {watchedlist && watchedlist.length === 0 && (
                    <p>There is no movies in your watched list yet!</p>
                )}
            </Container>
        </div>
    );
}

export default Watchedlist;
