import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 5,
  },
  reducers: {
    increase: (state) => {
      state.value += 1;
    },
    decrease: (state) => {
      state.value -= 1;
    },

    sifirla: (state) => {
      state.value = 0;
    },
  },
});

export const { increase, decrease, sifirla } = counterSlice.actions;
export default counterSlice.reducer;
