import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeActiveFilter, selectTodos } from "../redux/todos/todosSlice";
import { clearCompletedAsync } from "../redux/todos/services";
function ContentFooter() {
  const items = useSelector(selectTodos);
  const notCompleted = items.filter((item) => item.completed === false);
  const dispatch = useDispatch();
  const activeFilter = useSelector((state) => state.todos.activeFilter);

  useEffect(() => {
    localStorage.setItem("activeFilter", activeFilter);
  }, [activeFilter]);

  // clear completed
  const clearCompleted = () => {
    if (window.confirm("Are you sure?")) {
      dispatch(clearCompletedAsync());
    }
  };

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

      <button className="clear-completed" onClick={() => clearCompleted()}>
        Clear completed
      </button>
    </div>
  );
}
export default ContentFooter;
