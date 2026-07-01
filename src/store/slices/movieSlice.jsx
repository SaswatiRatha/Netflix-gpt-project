import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nowPlaying: null,
  movieTrailer: null,
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
  },
});

export const { addNowPlayingMovies, setMovieTrailer } = movieSlice.actions;
export default movieSlice.reducer;
