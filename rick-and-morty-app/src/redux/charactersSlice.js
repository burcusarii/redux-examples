import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchCharacters = createAsyncThunk(
  "characters/getCharacters",
  async () => {
    const res = await axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}`);
    return res.data.results;
  }
);

export const charactersSlice = createSlice({
  name: "characters",
  initialState: {
    items: [],
  },

  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCharacters.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export default charactersSlice.reducer;