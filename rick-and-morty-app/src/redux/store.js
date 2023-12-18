import { configureStore } from "@reduxjs/toolkit";
import charactersSlice from "./charactersSlice";
import locationsSlice from "./locationsSlice";
export const store = configureStore({
  reducer: {
    characters: charactersSlice,
    locations: locationsSlice,
  },
});
