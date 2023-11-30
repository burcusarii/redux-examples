import React from "react";

function Error({ message }) {
  return (
    <div style={{ padding: 15, fontSize: 16, backgroundColor: "red" }}>
      Error: {message}
    </div>
  );
}

export default Error;
