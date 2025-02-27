import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
};

export const counterSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
  },
});

export const { setMovies } = counterSlice.actions;

export default counterSlice.reducer;
