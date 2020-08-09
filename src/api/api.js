import constants from "../constants";

const getOptions = (method) => ({
  method,
  timeout: 25000,
  headers: {
    "Content-Type": "application/json",
  },
});

const status = (res) => {
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res;
};

const get = async (route, params) => {
  try {
    const query = Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join("&");

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}${route}?${query}`,
      getOptions("GET")
    );

    status(response);
    const responseJson = await response.json();

    return responseJson;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getMoviesApi = (searchValue) => {
  const params = {
    api_key: process.env.REACT_APP_API_KEY,
    sort_by: constants.filters.popularityDesc,
  };

  if (searchValue) {
    params.query = searchValue;

    return get(constants.routes.search, params);
  } else {
    return get(constants.routes.discover, params);
  }
};

export const getMovieByIdApi = (movieId) => {
  const params = {
    api_key: process.env.REACT_APP_API_KEY,
  };

  return get(`${constants.routes.movie}/${movieId}`, params);
};
