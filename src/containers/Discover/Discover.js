import React, { useState, useEffect } from "react";
import styles from "./Discover.module.css";
import { getMoviesApi } from "../../api/api";

const Discover = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const { results } = await getMoviesApi();
      setMovies(results);
    };

    getMovies();
  }, []);

  const renderMovies = () => {
    return movies.map((movie) => (
      <div className={styles.movieCard} key={movie.id}>
        <img
          src={`${process.env.REACT_APP_IMG_API_URL}${movie.poster_path}`}
          alt={movie.title}
          className={styles.movieImg}
        />
        <p>{movie.title}</p>
      </div>
    ));
  };

  return (
    <div>
      <h2 className={styles.title}>Discover</h2>
      <div className={styles.movieListContainer}>
        {movies && renderMovies()}
      </div>
    </div>
  );
};

export default Discover;
