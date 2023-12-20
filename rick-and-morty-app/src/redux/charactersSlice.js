import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchCharacters = createAsyncThunk(
  "characters/getCharacters",
  async (page) => {
    const res = await axios(
      `${process.env.REACT_APP_API_BASE_ENDPOINT}/character/?page=${page}`
    );
    return res.data.results;
  }
);
export const charactersSlice = createSlice({
  name: "characters",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    page: 1,
    hasNextPage: true,
  },

  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCharacters.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCharacters.fulfilled, (state, action) => {
      state.items = [...state.items, ...action.payload];
      state.isLoading = false;
      state.page += 1;

      if (action.payload.length < 20) {
        state.hasNextPage = false;
      }
    });

    builder.addCase(fetchCharacters.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });
  },
});

export default charactersSlice.reducer;
