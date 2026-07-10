import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedMedia: {},
  isModalOpen: false,
  casts: null,
  genre: null,
  similarShows: null,
  certificate: "",
  seasons: null,
  selectedSeason: 1,
  episodes: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.selectedMedia = action.payload;
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.selectedMedia = null;
      state.isModalOpen = false;
    },
    setCasts: (state, action) => {
      state.casts = action.payload;
    },
    setGenre: (state, action) => {
      state.genre = action.payload;
    },
    setSimilarShows: (state, action) => {
      state.similarShows = action.payload;
    },
    setCertificate: (state, action) => {
      state.certificate = action.payload;
    },
    setTvDetails: (state, action) => {
      state.seasons = action.payload;
    },
    setSelectedSeason: (state, action) => {
      state.selectedSeason = action.payload;
    },
    setEpisodes: (state, action) => {
      state.episodes = action.payload;
    },
    setMediaDetails: (state, action) => {
      const { casts, genre, similarShows, certificate, seasons } =
        action.payload;
      state.casts = casts;
      state.genre = genre;
      state.similarShows = similarShows;
      state.certificate = certificate;
      if (seasons !== undefined) state.seasons = seasons;
    },
  },
});

export const {
  openModal,
  closeModal,
  setCasts,
  setGenre,
  setSimilarShows,
  setCertificate,
  setTvDetails,
  setEpisodes,
  setSelectedSeason,
  setMediaDetails,
} = modalSlice.actions;
export default modalSlice.reducer;
