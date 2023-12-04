import React, { useEffect } from "react";
import { message } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodoAsync } from "../redux/todos/todosSlice";
import Loading from "./Loading";
import Error from "./Error";

function Form() {
  const [title, setTitle] = useState("");
  const isLoading = useSelector((state) => state.todos.addNewTodo.isLoading);
  const error = useSelector((state) => state.todos.addNewTodo.error);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (e.target[0].value === "") {
      alert("please enter todo");
    } else {
      await dispatch(addTodoAsync({ title }));
    }
    setTitle("");
  };

  // error mesajı
  // const [messageApi, contextHolder] = message.useMessage();

  // const error = () => {
  //   messageApi.open({
  //     type: "error",
  //     content: newError,
  //   });
  // };
  // useEffect(() => {
  //   if (newError) {
  //     error();
  //   }
  // }, [newError]);

  return (
    <div>
      <div>
        {/* <div>{contextHolder}</div> */}

        <form onSubmit={handleSubmit}>
          <input
            disabled={isLoading}
            className="new-todo"
            placeholder="enter new todo"
            autoFocus
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <button className="btn-add" type="submit">
            Add
          </button>
        </form>
      </div>
      <div style={{ height: 15 }}>{isLoading && <Loading />}</div>
      <div style={{ height: 15 }}>{error && <Error message={error} />}</div>
    </div>
  );
}

export default Form;
