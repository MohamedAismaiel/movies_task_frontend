import { legacy_createStore as createStore } from "redux";

const reducerFun = (
  state = {
    movies: [],
    detailedMovie: null,
    detailsPageContentLoaded: false,
    totalResults: null,
    pageSize: 20,
    sameSearchKey: false,
    // url: " https://movies-sylndr-task.onrender.com",
    url: " http://localhost:4000",
  },
  action
) => {
  if (action.type === "filter") {
    return {
      ...state,
      movies: action.payload.movies.results,
      detailedMovie: null,
      totalResults:
        action.payload.movies.total_pages > 500
          ? 500 * state.pageSize
          : action.payload.movies.total_results,
    };
  }
  if (action.type === "resetMovies") {
    return {
      ...state,
      movies: action.payload,
      totalResults: null,
    };
  }
  if (action.type === "movies") {
    return {
      ...state,
      movies: action.payload.movies.results,
      detailedMovie: null,
      totalResults:
        action.payload.movies.total_pages > 500
          ? 500 * state.pageSize
          : action.payload.movies.total_results,
    };
  }
  if (action.type === "detailedMovie") {
    return { ...state, detailedMovie: action.payload.movie };
  }
  if (action.type === "sameSearchKey") {
    return { ...state, sameSearchKey: true };
  }
  if (action.type === "differentSearchKey") {
    return { ...state, sameSearchKey: false };
  }
  return state;
};

const store = createStore(reducerFun);

export default store;
