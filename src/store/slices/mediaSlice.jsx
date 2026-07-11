import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nowPlaying: null,
  popularMovies: null,
  topRatedMovies: null,
  upcomingMovies: null,
  trailersById: {},
  popularTv: null,
  myList: [],
  trending: null,
  trendingMovies: null,
  trendingTV: null,
  topRatedTV: null,
  onTheAir: null,
  selectedGenre: { id: 0, name: "Genre" },
  genreMediaList: null,
  selectedLanguage: { id: 0, name: "Select Language" },
  languageMediaList: null,
};

const mediaSlice = createSlice({
  name: "media",
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
      state.trendingMovies = action.payload;
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
    setSelectedGenre: (state, action) => {
      state.selectedGenre = action.payload;
    },
    setGenreMediaList: (state, action) => {
      state.genreMediaList = action.payload;
    },
    setSelectedLanguage: (state, action) => {
      state.selectedLanguage = action.payload;
    },
    setLanguageMediaList: (state, action) => {
      state.languageMediaList = action.payload;
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
  setPopularTv,
  addToWatchList,
  setTrending,
  setTrendingMovie,
  setTrendingTV,
  setTopRatedTV,
  setOnTheAir,
  setSelectedGenre,
  setGenreMediaList,
  setSelectedLanguage,
  setLanguageMediaList,
} = mediaSlice.actions;
export default mediaSlice.reducer;
