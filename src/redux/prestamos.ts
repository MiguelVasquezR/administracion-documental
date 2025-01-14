import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  prestamos: [],
};

export const counterSlice = createSlice({
  name: "prestamos",
  initialState,
  reducers: {
    setPrestamos: (state, action) => {
      state.prestamos = action.payload;
    },
  },
});

export const { setPrestamos } = counterSlice.actions;

export default counterSlice.reducer;
