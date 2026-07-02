import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nowPlaying: null,
  popularMovies: null,
  topRatedMovies: null,
  upcomingMovies: null,
  movieTrailer: null,
  cardTrailer: {},
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlaying = action.payload;
    },
    setMovieTrailer: (state, action) => {
      state.movieTrailer = action.payload;
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
      const { movieId, trailer } = action.payload;
      state.cardTrailer[movieId] = trailer;
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
} = movieSlice.actions;
export default movieSlice.reducer;
