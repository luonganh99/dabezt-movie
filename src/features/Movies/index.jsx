import React, { lazy } from 'react';
import { Route, Switch } from 'react-router-dom';

const HomePage = lazy(() => import('./pages/HomePage'));
const MovieFilter = lazy(() => import('./pages/MovieFilter'));
const MovieDetail = lazy(() => import('./pages/MovieDetail'));

function Movies(props) {
    return (
        <>
            <Switch>
                <Route path='/' exact component={HomePage} />
                <Route path='/movie/:movieId' exact component={MovieDetail} />
                <Route path='/:movieType/:page' exact component={MovieFilter} />
            </Switch>
        </>
    );
}

export default Movies;
