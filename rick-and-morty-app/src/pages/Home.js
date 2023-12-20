import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCharacters } from "../redux/charactersSlice";
import CharactersCard from "../components/CharactersCard";
import Loading from "../components/Loading";
import Error from "../components/Error";
function Home() {
  const data = useSelector((state) => state.characters.items);
  const isLoading = useSelector((state) => state.characters.isLoading);
  const page = useSelector((state) => state.characters.page);
  const hasNextPage = useSelector((state) => state.characters.hasNextPage);
  const error = useSelector((state) => state.characters.error);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCharacters());
  }, [dispatch]);

  if (error) {
    return <Error message={error} />;
  }
  return (
    <div>
      <h1 className="page-title">Characters</h1>
      <div className="chars">
        {data.map((item) => {
          return <CharactersCard item={item} key={item.id} />;
        })}
      </div>
      <div style={{ textAlign: "center", padding: 35 }}>
        {isLoading && <Loading />}

        {!isLoading && hasNextPage && (
          <button
            className="next-page-btn"
            onClick={() => dispatch(fetchCharacters(page))}
          >
            Next Page {page}
          </button>
        )}
      </div>
    </div>
  );
}

export default Home;
