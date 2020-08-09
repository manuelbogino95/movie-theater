import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieByIdApi } from "../../api/api";
import styles from "./MovieDetails.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import constants from "../../constants";
import Loader from "../../components/Loader/Loader";
import Message from "../../components/Message/Message";

const MovieDetails = () => {
  const [movie, setMovie] = useState();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const getMovie = async () => {
      try {
        setLoading(true);
        const response = await getMovieByIdApi(id);
        setLoading(false);
        setMovie(response);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };

    getMovie();
  }, [id]);

  const renderMovie = () => {
    return (
      <div
        className={styles.movie}
        style={{
          backgroundImage: `url('${process.env.REACT_APP_IMG_API_URL}${constants.imageSize.original}${movie.backdrop_path}')`,
        }}
      >
        <div className={styles.darkOpacity}></div>
        <div className={styles.movieDetails}>
          <img
            src={`${process.env.REACT_APP_IMG_API_URL}${constants.imageSize.w500}${movie.poster_path}`}
            alt={movie.title}
          />
          <div className={styles.movieDescription}>
            <h1 className={styles.title}>{movie.title}</h1>
            <div>
              <FontAwesomeIcon
                icon={faStar}
                color="orange"
                className={styles.rateSize}
              />
              <span className={styles.rateSize}>{movie.vote_average}</span>
            </div>
            <div>Year: {new Date(movie.release_date).getFullYear()}</div>
            <div>Popularity: {movie.popularity}</div>
            <div>
              Country: {movie.production_countries.map((c) => `${c.name} - `)}
            </div>
            <div>
              Producer: {movie.production_companies.map((c) => `${c.name} - `)}
            </div>
            <div>Genre: {movie.genres.map((g) => `${g.name} - `)}</div>
            <div>{movie.overview}</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {error ? (
        <Message message="UPS! An error ocurred" type="error" />
      ) : isLoading ? (
        <Loader />
      ) : (
        movie && renderMovie()
      )}
    </div>
  );
};

export default MovieDetails;
