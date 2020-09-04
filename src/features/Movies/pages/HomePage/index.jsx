import MovieList from 'features/Movies/components/MovieList';
import React from 'react';
import { Container } from 'reactstrap';
import './HomePage.scss';

function HomePage() {
    return (
        <div className='homepage'>
            <Container fluid>
                <MovieList type='now_playing' />
                <MovieList type='popular' />
                <MovieList type='top_rated' />
                <MovieList type='upcoming' />
            </Container>
        </div>
    );
}

export default HomePage;
