import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import styles from "./Rating.module.css";

const Rating = ({ setRatingHandler, rating }) => {
  const [displayRating, setDisplayRating] = useState(0);

  const ratingChangedHandler = (newRating) => {
    if (newRating === rating) {
      setDisplayRating(0);
      setRatingHandler(0);
    } else {
      setDisplayRating(newRating);
      setRatingHandler(newRating);
    }
  };

  const willRateHandler = (newRating) => {
    setDisplayRating(newRating);
  };

  const cancelRateHandler = () => {
    setDisplayRating(rating);
  };

  const renderStars = () => {
    let stars = [];

    for (let i = 0; i < 5; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          className={styles.star}
          icon={faStar}
          color={displayRating >= i + 1 ? "orange" : "black"}
          onClick={() => ratingChangedHandler(i + 1)}
          onMouseMove={() => willRateHandler(i + 1)}
          onMouseOut={() => cancelRateHandler()}
        />
      );
    }

    return stars;
  };

  return (
    <div className={styles.ratingContainer}>
      <span>Rating:</span>
      {renderStars()}
    </div>
  );
};

export default Rating;
