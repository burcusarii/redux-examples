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

// DELETE TODO
export const deleteTodoAsync = createAsyncThunk(
  "todo/deleteTodoAsync",
  async (id) => {
    await fetch(`http://localhost:7000/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await id;
  }
);

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    activeFilter: localStorage.getItem("activeFilter")
      ? localStorage.getItem("activeFilter")
      : "all",
    addNewTodo: {
      isLoading: false,
      error: null,
    },
  },
  reducers: {
    changeActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },

    clearCompleted: (state) => {
      const filtered = state.items.filter((item) => item.completed === false);
      state.items = filtered;
    },
  },
  extraReducers(builder) {
    // get todos
    builder.addCase(getTodosAsync.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTodosAsync.fulfilled, (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
    });

    builder.addCase(getTodosAsync.rejected, (state, action) => {
      state.error = action.error.message;
      state.isLoading = false;
    });

    // add todo
    builder.addCase(addTodoAsync.pending, (state, action) => {
      state.addNewTodo.isLoading = true;
    });

    builder.addCase(addTodoAsync.fulfilled, (state, action) => {
      state.items.push(action.payload);
      state.addNewTodo.isLoading = false;
    });

    builder.addCase(addTodoAsync.rejected, (state, action) => {
      state.addNewTodo.isLoading = false;
      console.log("error", action.error.message);
      state.addNewTodo.error = action.error.message;
    });
    // toggle todo

    builder.addCase(toggleTodoAsync.fulfilled, (state, action) => {
      const { id, completed } = action.payload;
      const index = state.items.findIndex((item) => item.id === id);
      state.items[index].completed = completed;
    });

    // delete todo
    builder.addCase(deleteTodoAsync.fulfilled, (state, action) => {
      const id = action.payload;
      const filtered = state.items.filter((item) => item.id !== id);
      state.items = filtered;
    });
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
export const { changeActiveFilter, clearCompleted } = todosSlice.actions;
export default todosSlice.reducer;
