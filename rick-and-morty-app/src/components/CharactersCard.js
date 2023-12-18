import React from "react";

function CharactersCard({ item }) {
  return (
    <div className="char-card">
      <h3>
        <a href="#">{item.name}</a>
      </h3>
      <img src={item.image} alt={item.name} />
    </div>
  );
}

export default CharactersCard;
