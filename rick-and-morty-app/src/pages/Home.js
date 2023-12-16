import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCharacters } from "../redux/charactersSlice";
import CharactersCard from "../components/CharactersCard";
function Home() {
  const data = useSelector((state) => state.characters.items);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCharacters());
  }, [dispatch]);

  console.log(data);
  return (
    <div>
      <h1>Characters</h1>
      {data.map((item) => {
        return <CharactersCard item={item} />;
      })}
    </div>
  );
}

export default Home;
