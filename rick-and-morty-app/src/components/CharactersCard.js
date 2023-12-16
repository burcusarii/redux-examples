import React from "react";

function CharactersCard({ item }) {
  return (
    <div>
      <div>{item.name}</div>
      <img src={item.image} alt="" />
    </div>
  );
}

export default CharactersCard;
