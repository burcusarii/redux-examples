import React from "react";
import { useSelector } from "react-redux";
function ContentFooter() {
  const items = useSelector((state) => state.todos.items);
  const notCompleted = items.filter((item) => item.completed === false);

  return (
    <div className="content-footer">
      <span className="todo-count">
        <strong>{notCompleted.length} </strong>
        items left
      </span>

      <ul className="filters">
        <li>
          <a href="#/" className="selected">
            All
          </a>
        </li>
        <li>
          <a href="#/">Active</a>
        </li>
        <li>
          <a href="#/">Completed</a>
        </li>
      </ul>

      <button className="clear-completed">Clear completed</button>
    </div>
  );
}

export default ContentFooter;
