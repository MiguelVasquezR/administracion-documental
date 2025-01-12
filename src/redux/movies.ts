import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: [],
};

export const counterSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload;
    },
  },
});

export const { setBooks } = counterSlice.actions;

export default counterSlice.reducer;
