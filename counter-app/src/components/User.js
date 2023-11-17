import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/user/userSlice";
function User() {
  const [enteredUser, setEnteredUser] = useState({
    name: "Burcu",
    age: 28,
    mail: "burcusaridev@mail.com",
  });
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  console.log(enteredUser);
  return (
    <div>
      <label htmlFor="name">Please enter your name</label>
      <br />
      <input
        type="text"
        name="name"
        value={enteredUser.name}
        onChange={(e) =>
          setEnteredUser({ ...enteredUser, name: e.target.value })
        }
      />
      <br />
      <br />
      <label htmlFor="age">Please enter your age</label>
      <br />
      <input
        type="number"
        name="age"
        value={enteredUser.age}
        onChange={(e) =>
          setEnteredUser({ ...enteredUser, age: e.target.value })
        }
      />
      <br />
      <br />
      <label htmlFor="mail">Please enter your mail address</label>
      <br />
      <input
        type="email"
        value={enteredUser.mail}
        onChange={(e) =>
          setEnteredUser({ ...enteredUser, mail: e.target.value })
        }
      />
      <br />
      <br />
      <button onClick={() => dispatch(setUser(enteredUser))}>OK</button>
      <br /> <br />
      <div>
        Hello, my name is {user.name} and i'm {user.age} years old.
      </div>
      <div>There is my mail address: {user.mail}</div>
    </div>
  );
}

export default User;
