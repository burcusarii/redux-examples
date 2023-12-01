import { useState } from "react";
import Loading from "./Loading";
import { useDispatch, useSelector } from "react-redux";
import { addTodoAsync } from "../redux/todos/todosSlice";
function Form() {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.todos.addNewTodoisLoading);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await dispatch(addTodoAsync({ title }));
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        disabled={isLoading}
        className="new-todo"
        placeholder="enter new todo"
        autoFocus
        value={title}
        onChange={(e) => {
          console.log(title);

          setTitle(e.target.value);
        }}
      />
      <button className="btn-add" type="submit">
        Add
      </button>
    </form>
  );
}

export default Form;
