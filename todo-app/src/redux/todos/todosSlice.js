import { createSlice } from "@reduxjs/toolkit";

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [
      {
        id: "1",
        title: "Learn React",
        completed: true,
      },
      {
        id: "2",
        title: "Learn CSS",
        completed: false,
      },
    ],
  },
  reducers: {
    addTodo: (state, action) => {
      if (action.payload.title === "") {
        alert("Please enter new todo");
      } else {
        state.items.push(action.payload);
      }
    },
  },
});
export const { addTodo } = todosSlice.actions;
export default todosSlice.reducer;
