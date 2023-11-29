import { createSlice, nanoid } from "@reduxjs/toolkit";

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
    activeFilter: "all",
  },
  reducers: {
    addTodo: {
      reducer: (state, action) => {
        if (action.payload.title === "") {
          alert("Please enter new todo");
        } else {
          state.items.push(action.payload);
        }
      },

      prepare: ({ title }) => {
        return {
          payload: {
            id: nanoid(),
            completed: false,
            title,
          },
        };
      },
    },

    toggle: (state, action) => {
      const id = action.payload.id;
      state.items.map((item) => {
        if (item.id === id) {
          item.completed = !item.completed;
        }
      });
    },

    destroy: (state, action) => {
      const id = action.payload.id;
      const filtered = state.items.filter((item) => item.id !== id);
      state.items = filtered;
    },
    changeActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },

    clearCompleted: (state) => {
      const filtered = state.items.filter((item) => item.completed === false);
      state.items = filtered;
    },
  },
});

export const selectTodos = (state) => state.todos.items;
export const filteredTodos = (state) => {
  if (state.todos.activeFilter === "all") {
    return state.todos.items;
  } else if (state.todos.activeFilter === "active") {
    return state.todos.items.filter((item) => item.completed === false);
  } else {
    return state.todos.items.filter((item) => item.completed === true);
  }
};
export const { addTodo, toggle, destroy, changeActiveFilter, clearCompleted } =
  todosSlice.actions;
export default todosSlice.reducer;
