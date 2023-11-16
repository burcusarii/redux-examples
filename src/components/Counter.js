import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increase, decrease, sifirla } from "../redux/counter/counterSlice";
function Counter() {
  const countValue = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <div>
      <h1>{countValue}</h1>

      <br />
      <button onClick={() => dispatch(decrease())}>Decrease</button>
      <button onClick={() => dispatch(increase())}>Increase</button>
      <button onClick={() => dispatch(sifirla())}>Set Zero</button>
    </div>
  );
}

export default Counter;
