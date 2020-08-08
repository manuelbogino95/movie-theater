export const getRatingRange = (rating) => {
  switch (rating) {
    case 1:
      return [0, 2];

    case 2:
      return [2, 4];

    case 3:
      return [4, 6];

    case 4:
      return [6, 8];

    case 5:
      return [8, 10];

    default:
      return [0, 10];
  }
};

export const filterMoviesHelper = (movies, rating) => {
  const [ratingStart, ratingLimit] = getRatingRange(rating);
  return movies.filter(
    (m) => m.vote_average >= ratingStart && m.vote_average <= ratingLimit
  );
};
