import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "Burcu",
    age: 28,
    mail: "burcusaridev@gmail.com",
  },
  reducers: {
    setUser: (state, action) => {
      state.name = action.payload.name;
      state.age = action.payload.age;
      state.mail = action.payload.mail;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
