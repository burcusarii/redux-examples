import React from "react";

function ContentFooter() {
  return (
    <div className="content-footer">
      <span className="todo-count">
        <strong>2 </strong>
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
