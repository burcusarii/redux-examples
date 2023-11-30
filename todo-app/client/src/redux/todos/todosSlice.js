import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";

export const getTodosAsync = createAsyncThunk(
  "todo/getTodosAsync",
  async () => {
    const res = await fetch("http://localhost:7000/todos");
    return await res.json();
  }
);

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
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
  extraReducers: {
    [getTodosAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getTodosAsync.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
    },
    [getTodosAsync.rejected]: (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    },
  },
});

export const selectTodos = (state) => state.todos.items;
export const selectFilteredTodos = (state) => {
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
