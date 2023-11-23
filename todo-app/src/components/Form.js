import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/todos/todosSlice";
import { nanoid } from "@reduxjs/toolkit";
function Form() {
  const [newTodo, setNewtodo] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    dispatch(addTodo({ id: nanoid(), title: newTodo, completed: false }));
    setNewtodo("");
    e.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        className="new-todo"
        placeholder="enter new todo"
        autoFocus
        value={newTodo}
        onChange={(e) => {
          console.log(newTodo);

          setNewtodo(e.target.value);
        }}
      />
      <button className="btn-add" type="submit">
        Add
      </button>
    </form>
  );
}

export default Form;
