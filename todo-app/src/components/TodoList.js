import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggle, destroy, selectTodos } from "../redux/todos/todosSlice";

function TodoList() {
  const dispatch = useDispatch();
  const items = useSelector(selectTodos);
  const activeFilter = useSelector((state) => state.todos.activeFilter);
  const handleDestroy = (item) => {
    if (window.confirm("Are You Sure?")) {
      dispatch(destroy(item));
    }
  };
  let filtered = [];
  if (activeFilter === "all") {
    filtered = items;
  } else if (activeFilter === "active") {
    filtered = items.filter((item) => item.completed === false);
  } else {
    filtered = items.filter((item) => item.completed === true);
  }

  return (
    <ul className="todo-list">
      {filtered.map((item) => (
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
