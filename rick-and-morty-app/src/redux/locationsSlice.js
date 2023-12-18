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
  },

  reducer: {},
  extraReducers(builder) {
    builder.addCase(fetchLocations.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  },
});

export default locationsSlice.reducer;
