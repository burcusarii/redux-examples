import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggle, destroy } from "../redux/todos/todosSlice";

function TodoList() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.todos.items);
  const handleDestroy = (item) => {
    if (window.confirm("Are You Sure?")) {
      dispatch(destroy(item));
    }
  };
  return (
    <ul className="todo-list">
      {/* <li className="completed">
        <div className="view">
          <input className="toggle" type="checkbox" />
          <label>Learn JavaScript</label>
          <button className="destroy"></button>
        </div>
      </li> */}

      {items.map((item) => (
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
