import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchText: "",
  gptMovies: [],
  searchResults: [],
};

const gptSlice = createSlice({
  name: "gpt",
  initialState,
  reducers: {
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
    setGptMovies: (state, action) => {
      state.gptMovies = [...action.payload];
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
    },
  },
});

export const { setSearchText, setGptMovies, setSearchResults } =
  gptSlice.actions;
export default gptSlice.reducer;
