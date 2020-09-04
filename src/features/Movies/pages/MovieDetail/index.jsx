import {
    faCalendarAlt,
    faClock,
    faFilm,
    faListUl,
    faMoneyBillAlt,
    faPlay,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moviesApi from 'api/tmdbApi/moviesApi';
import MovieCard from 'features/Movies/components/MovieCard';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Slider from 'react-slick';
import { Badge, Button, Modal } from 'reactstrap';
import './MovieDetail.scss';

const settings_actors = {
    dots: false,
    infinite: false,
    speed: 600,
    slidesToShow: 7,
    slidesToScroll: 7,
};

const settings_movies = {
    dots: false,
    infinite: false,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 4,
};

function MovieDetail(props) {
    const { movieId } = useParams();
    const history = useHistory();

    const [movieInfo, setMovieInfo] = useState(null);
    const [videos, setVideos] = useState(null);
    const [casts, setCasts] = useState(null);
    const [recommendations, setRecommendations] = useState(null);
    const [playingVideo, setPlayingVideo] = useState(null);

    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const toggle = () => setModal(!modal);

    const handleMovieTrailerClick = (video) => {
        toggle();
        setPlayingVideo(video);
    };

    const handleViewDetailClick = (movieId) => {
        history.push(`/movie/${movieId}`);
    };

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const [
                    movieDetail,
                    movieVideo,
                    movieCredits,
                    movieRecommendations,
                ] = await Promise.all([
                    moviesApi.getMovieDetail(+movieId),
                    moviesApi.getMovieVideo(+movieId),
                    moviesApi.getMovieCredit(+movieId),
                    moviesApi.getRecommendations(+movieId),
                ]);
                setMovieInfo(movieDetail);
                setVideos(movieVideo.results);
                setCasts(movieCredits.cast);
                setRecommendations(movieRecommendations.results.slice(0, 8));
                setLoading(true);
            } catch (e) {
                console.log(e);
            }
        };

        fetchMovie();
    }, [movieId]);

    return (
        <>
            {loading ? (
                <div className='movie-info'>
                    <div
                        className='movie-info__backdrop'
                        style={{
                            background: `linear-gradient(rgba(2, 13, 24, 0.75), rgba(2, 13, 24, 0.75)), url( https://image.tmdb.org/t/p/w1280/${movieInfo.backdrop_path}
                                ) no-repeat center center/cover`,
                        }}
                    ></div>
                    <div className='movie-info__container'>
                        <div className='movie-info__main'>
                            <div className='movie-info__poster'>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500/${movieInfo.poster_path}`}
                                    alt={movieInfo.original_title}
                                />
                            </div>
                            <div className='movie-info__des'>
                                <div className='movie-info__des__header'>
                                    <div className='left'>
                                        <h1>{movieInfo.original_title}</h1>
                                        <p>{movieInfo.tagline}</p>
                                    </div>
                                    <div className='right'>
                                        <div className='vote'>{movieInfo.vote_average}</div>
                                    </div>
                                </div>
                                <div className='movie-info__des__body'>
                                    <div className='left'>
                                        <div>
                                            <FontAwesomeIcon icon={faClock} />
                                        </div>
                                        <div>Duration</div>
                                        <div>{movieInfo.runtime}</div>
                                        <div>
                                            <FontAwesomeIcon icon={faCalendarAlt} />
                                        </div>
                                        <div>Release</div>
                                        <div>{movieInfo.release_date}</div>
                                        <div>
                                            <FontAwesomeIcon icon={faMoneyBillAlt} />
                                        </div>
                                        <div>Budget</div>
                                        <div>{movieInfo.revenue}</div>
                                    </div>
                                    <div className='right'>
                                        <ul className='genres'>
                                            {movieInfo.genres.map((genre) => (
                                                <li key={genre.id}>
                                                    <Badge color='dark'>{genre.name}</Badge>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className='movie-info__des__btn'>
                                    <div className='movie-info__des__btn--wishlist'>
                                        <Button color='info'>
                                            <FontAwesomeIcon icon={faListUl} className='mr-1' /> Add
                                            to Wishlist
                                        </Button>
                                    </div>
                                    <div className='movie-info__des__btn--watched'>
                                        <Button color='danger'>
                                            <FontAwesomeIcon icon={faFilm} className='mr-1' />
                                            Add to Watched
                                        </Button>
                                    </div>
                                </div>
                                <div className='movie-info__des__overview'>
                                    {movieInfo.overview}
                                </div>
                            </div>
                        </div>
                        <div className='movie-info__actors'>
                            <div className='movie-info__actors--title'>
                                <h2>Actors</h2>
                            </div>
                            <Slider {...settings_actors} className='movie-info__actors--cast'>
                                {casts.map((cast) => (
                                    <div key={cast.cast_id}>
                                        <div className='avatar'>
                                            <img
                                                src={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`}
                                                alt={cast.name}
                                            />
                                        </div>
                                        <div className='name'>{cast.name}</div>
                                        <div className='character'>{cast.character}</div>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                        <div className='movie-info__trailers'>
                            <div className='movie-info__trailers--title'>
                                <h2>Trailers</h2>
                            </div>
                            <Slider {...settings_movies} className='movie-info__trailers--video'>
                                {videos.map((video) => (
                                    <div key={video.id}>
                                        <div
                                            className='video-item'
                                            onClick={() => handleMovieTrailerClick(video)}
                                        >
                                            <img
                                                src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                                                alt={`${video.name}`}
                                            />
                                            <div className='overlay'>
                                                <FontAwesomeIcon
                                                    className='icon'
                                                    size='2x'
                                                    icon={faPlay}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                        <div className='movie-info__recommendations'>
                            <div className='movie-info__recommendations--title'>
                                <h2>Recommendations</h2>
                            </div>
                            <div className='movie-info__recommendations--list'>
                                {recommendations.map((movie) => (
                                    <MovieCard
                                        key={movie.id}
                                        movie={movie}
                                        onViewDetailClick={handleViewDetailClick}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <Modal
                        className='movie-info__modal'
                        isOpen={modal}
                        toggle={toggle}
                        backdrop={true}
                        centered
                    >
                        {playingVideo && (
                            <iframe
                                width='1000'
                                height='562'
                                src={`https://www.youtube.com/embed/${playingVideo.key}`}
                                frameBorder='0'
                                allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                                allowFullScreen
                                title={`${playingVideo.name}`}
                            ></iframe>
                        )}
                    </Modal>
                </div>
            ) : (
                <div>Loading ...</div>
            )}
        </>
    );
}

export default MovieDetail;
