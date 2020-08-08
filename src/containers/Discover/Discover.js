import React, { useState, useEffect } from "react";
import styles from "./Discover.module.css";
import { getMoviesApi } from "../../api/api";
import { filterMoviesHelper } from "../../helpers/moviesHelpers";
import Search from "../../components/Search/Search";
import Rating from "../../components/Rating/Rating";
import Message from "../../components/Message/Message";

const Discover = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [rating, setRating] = useState();

  useEffect(() => {
    const getMovies = async () => {
      try {
        const { results } = await getMoviesApi(searchValue);
        setMovies(results);
      } catch (e) {
        setError(true);
      }
    };

    getMovies();
  }, [searchValue]);

  const renderMovies = () => {
    const filteredMovies = filterMoviesHelper(movies, rating);
    if (filteredMovies.length > 0) {
      return filteredMovies.map((movie) => (
        <div className={styles.movieCard} key={movie.id}>
          <img
            src={`${process.env.REACT_APP_IMG_API_URL}${movie.poster_path}`}
            alt={movie.title}
            className={styles.movieImg}
          />
          <p>{movie.title}</p>
        </div>
      ));
    } else {
      return <Message message="No movies found!" type="info" />;
    }
  };

  return (
    <div>
      <h2 className={styles.title}>Discover</h2>
      <Search setSearchValue={setSearchValue} />
      <Rating setRatingHandler={setRating} rating={rating} />
      <div className={styles.movieListContainer}>
        {error ? (
          <Message message="UPS! An error ocurred" type="error" />
        ) : (
          movies && renderMovies()
        )}
      </div>
    </div>
  );
};

export default Discover;
