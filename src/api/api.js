import constants from "../constants";

const getOptions = (method) => ({
  method,
  timeout: 25000,
  headers: {
    "Content-Type": "application/json",
  },
});

const get = async (route, params) => {
  try {
    const query = Object.keys(params)
      .map((key) => `${key}=${params[key]}`)
      .join("&");

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}${route}?${query}`,
      getOptions("GET")
    );

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
