import MovieList from "features/Movies/components/MovieList";
import React from "react";
import "./HomePage.scss";

function HomePage() {
    return (
        <div className="homepage">
            <MovieList type="now_playing" />
            <MovieList type="popular" />
            <MovieList type="top_rated" />
            <MovieList type="upcoming" />
        </div>
    );
}

export default HomePage;
