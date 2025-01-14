import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  usuario: [],
};

export const counterSlice = createSlice({
  name: "usuarios",
  initialState,
  reducers: {
    setUsuario: (state, action) => {
      state.usuario = action.payload;
    },
  },
});

export const { setUsuario } = counterSlice.actions;

export default counterSlice.reducer;
