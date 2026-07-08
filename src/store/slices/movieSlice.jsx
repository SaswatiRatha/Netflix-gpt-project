import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nowPlaying: null,
  popularMovies: null,
  topRatedMovies: null,
  upcomingMovies: null,
  trailersById: {},
  selectedMovie: {},
  isModalOpen: false,
  movieCasts: null,
  movieGenre: null,
  popularTv: null,
  myList: [],
  trending: null,
  trendingMovies: null,
  trendingTV: null,
  topRatedTV: null,
  onTheAir: null,
  similarShows: null,
  certificate: "",
  tvDetails: null,
  episodes: null,
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlaying = action.payload;
    },
    setMovieTrailer: (state, action) => {
      const { movieId, trailer } = action.payload;
      if (movieId) {
        state.trailersById[movieId] = trailer;
      }
    },
    setPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    setTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
    setUpcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload;
    },
    setCardTrailer: (state, action) => {
      const { trailerKey, trailer } = action.payload;
      if (trailerKey) {
        state.trailersById[trailerKey] = trailer;
      }
    },
    openModal: (state, action) => {
      state.selectedMovie = action.payload;
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.selectedMovie = null;
      state.isModalOpen = false;
    },
    setMovieCasts: (state, action) => {
      state.movieCasts = action.payload;
    },
    setMovieGenre: (state, action) => {
      state.movieGenre = action.payload;
    },
    setPopularTv: (state, action) => {
      state.popularTv = action.payload;
    },
    addToWatchList: (state, action) => {
      console.log(action.payload);

      const exists = state.myList.find((item) => item.id === action.payload.id);
      console.log(exists);

      if (!exists) {
        state.myList.push(action.payload);
      } else {
        state.myList = state.myList.filter(
          (movie) => movie.id !== action.payload.id,
        );
      }
    },
    setTrending: (state, action) => {
      state.trending = action.payload;
    },
    setTrendingMovie: (state, action) => {
      state.trendingMovie = action.payload;
    },
    setTrendingTV: (state, action) => {
      state.trendingTV = action.payload;
    },
    setTopRatedTV: (state, action) => {
      state.topRatedTV = action.payload;
    },
    setOnTheAir: (state, action) => {
      state.onTheAir = action.payload;
    },
    setSimilarShows: (state, action) => {
      state.similarShows = action.payload;
    },
    setCertificate: (state, action) => {
      state.certificate = action.payload;
    },
    setTvDetails: (state, action) => {
      state.tvDetails = action.payload;
    },
    setEpisodes: (state, action) => {
      state.episodes = action.payload;
    },
  },
});

export const {
  addNowPlayingMovies,
  setMovieTrailer,
  setPopularMovies,
  setTopRatedMovies,
  setUpcomingMovies,
  setCardTrailer,
  openModal,
  closeModal,
  setMovieCasts,
  setMovieGenre,
  setPopularTv,
  addToWatchList,
  setTrending,
  setTrendingMovie,
  setTrendingTV,
  setTopRatedTV,
  setOnTheAir,
  setSimilarShows,
  setCertificate,
  setTvDetails,
  setEpisodes,
} = movieSlice.actions;
export default movieSlice.reducer;
