import { createAsyncThunk } from "@reduxjs/toolkit";

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

export const clearCompletedAsync = createAsyncThunk(
  "todo/clearCompletedAsync",
  async () => {
    const res = await fetch(`http://localhost:7000/todos`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await res.json();
  }
);
