import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeActiveFilter } from "../redux/todos/todosSlice";
function ContentFooter() {
  const items = useSelector((state) => state.todos.items);
  const notCompleted = items.filter((item) => item.completed === false);

  const activeFilter = useSelector((state) => state.todos.activeFilter);

  const dispatch = useDispatch();
  return (
    <div className="content-footer">
      <span className="todo-count">
        <strong>{notCompleted.length} </strong>
        item{notCompleted.length > 1 && "s"} left
      </span>

      <ul className="filters">
        <li>
          <a
            href="#/"
            className={activeFilter === "all" ? "selected" : ""}
            onClick={() => dispatch(changeActiveFilter("all"))}
          >
            All
          </a>
        </li>
        <li>
          <a
            href="#/"
            className={activeFilter === "active" ? "selected" : ""}
            onClick={() => dispatch(changeActiveFilter("active"))}
          >
            Active
          </a>
        </li>
        <li>
          <a
            href="#/"
            className={activeFilter === "completed" ? "selected" : ""}
            onClick={() => dispatch(changeActiveFilter("completed"))}
          >
            Completed
          </a>
        </li>
      </ul>

      <button className="clear-completed">Clear completed</button>
    </div>
  );
}

export default ContentFooter;
