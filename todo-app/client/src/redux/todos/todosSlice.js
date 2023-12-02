import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// GET TODOS
export const getTodosAsync = createAsyncThunk(
  "todo/getTodosAsync",
  async () => {
    const res = await fetch("http://localhost:7000/todos");
    return await res.json();
  }
);

// ADD TODO
export const addTodoAsync = createAsyncThunk(
  "todo/addTodosAsync",
  async (data) => {
    const res = await fetch("http://localhost:7000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  }
);

// TOGGLE TODO
export const toggleTodoAsync = createAsyncThunk(
  "todo/toggleTodoAsync",
  async ({ id, data }) => {
    const res = await fetch(`http://localhost:7000/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
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
    addNewTodoisLoading: false,
    addNewTodoError: null,
  },
  reducers: {
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
    // get todos
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

    // add todo
    [addTodoAsync.pending]: (state, action) => {
      state.addNewTodoisLoading = true;
    },
    [addTodoAsync.fulfilled]: (state, action) => {
      if (action.payload.title === "") {
        alert("Please enter new todo");
      } else {
        state.items.push(action.payload);
      }
      state.addNewTodoisLoading = false;
    },
    [addTodoAsync.rejected]: (state, action) => {
      state.addNewTodoisLoading = false;
      state.addNewTodoError = action.error.message;
    },

    // toggle todo
    [toggleTodoAsync.fulfilled]: (state, action) => {
      const { id, completed } = action.payload;
      const index = state.items.findIndex((item) => item.id == id);
      state.items[index].completed = completed;
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
export const { toggle, destroy, changeActiveFilter, clearCompleted } =
  todosSlice.actions;
export default todosSlice.reducer;
