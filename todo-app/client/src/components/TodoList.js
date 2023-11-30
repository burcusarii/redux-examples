import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  toggle,
  destroy,
  getTodosAsync,
  selectFilteredTodos,
} from "../redux/todos/todosSlice";

function TodoList() {
  const dispatch = useDispatch();
  const filteredTodos = useSelector(selectFilteredTodos);

  const handleDestroy = (item) => {
    if (window.confirm("Are You Sure?")) {
      dispatch(destroy(item));
    }
  };

  useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch]);

  return (
    <ul className="todo-list">
      {filteredTodos.map((item) => (
        <li key={item.id} className={item.completed ? "completed" : ""}>
          <div className="view">
            <input
              className="toggle"
              type="checkbox"
              checked={item.completed}
              onChange={() => dispatch(toggle(item))}
            />
            <label>{item.title}</label>
            <button
              className="destroy"
              onClick={() => handleDestroy(item)}
            ></button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
