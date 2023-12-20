import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchLocations = createAsyncThunk(
  "locations/getLocations",
  async () => {
    const res = await axios("https://rickandmortyapi.com/api/location");
    return res.data.results;
  }
);

export const locationsSlice = createSlice({
  name: "locations",
  initialState: {
    items: [],
    isLoading: false,
  },

  reducer: {},
  extraReducers(builder) {
    builder.addCase(fetchLocations.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchLocations.fulfilled, (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchLocations.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });
  },
});

export default locationsSlice.reducer;
