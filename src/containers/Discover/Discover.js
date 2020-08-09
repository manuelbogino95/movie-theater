import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import styles from "./Discover.module.css";
import { getMoviesApi } from "../../api/api";
import { filterMoviesHelper } from "../../helpers/moviesHelpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Search from "../../components/Search/Search";
import Rating from "../../components/Rating/Rating";
import Message from "../../components/Message/Message";
import Loader from "../../components/Loader/Loader";
import noImage from "../../assets/noImage.jpg";
import constants from "../../constants";

const Discover = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [rating, setRating] = useState();
  let history = useHistory();

  useEffect(() => {
    const getMovies = async () => {
      try {
        setLoading(true);
        const { results } = await getMoviesApi(searchValue);
        setLoading(false);
        setMovies(results);
      } catch (e) {
        setLoading(false);
        setError(true);
      }
    };

    getMovies();
  }, [searchValue]);

  const renderMovies = () => {
    const filteredMovies = filterMoviesHelper(movies, rating);
    if (filteredMovies.length > 0) {
      return filteredMovies.map((movie) => (
        <div
          className={styles.movieCard}
          key={movie.id}
          onClick={() => history.push(`/movie/${movie.id}`)}
        >
          <img
            src={
              movie && movie.poster_path
                ? `${process.env.REACT_APP_IMG_API_URL}${constants.imageSize.w500}${movie.poster_path}`
                : noImage
            }
            alt={movie.title}
            className={styles.movieImg}
          />
          <div className={styles.movieInfo}>
            <FontAwesomeIcon
              icon={faStar}
              color="orange"
              className={styles.ratingStar}
            />
            <span>{movie.vote_average}</span>
            <p>{movie.title}</p>
          </div>
        </div>
      ));
    }

    return <Message message="No movies found!" type="info" />;
  };

  return (
    <div className={styles.discoverContainer}>
      <h2 className={styles.title}>Discover</h2>
      <Search setSearchValue={setSearchValue} />
      <Rating setRatingHandler={setRating} rating={rating} />
      <div className={styles.movieListContainer}>
        {error ? (
          <Message message="UPS! An error ocurred" type="error" />
        ) : isLoading ? (
          <Loader />
        ) : (
          movies && renderMovies()
        )}
      </div>
    </div>
  );
};

export default Discover;
