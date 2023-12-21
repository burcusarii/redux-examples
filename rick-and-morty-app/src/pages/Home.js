import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCharacters } from "../redux/charactersSlice";
import { Link } from "react-router-dom";
import CharactersCard from "../components/CharactersCard";
import Loading from "../components/Loading";
import Error from "../components/Error";
function Home() {
  const data = useSelector((state) => state.characters.items);
  const status = useSelector((state) => state.characters.status);
  const page = useSelector((state) => state.characters.page);
  const hasNextPage = useSelector((state) => state.characters.hasNextPage);
  const error = useSelector((state) => state.characters.error);

  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCharacters());
    }
  }, [dispatch, status]);

  if (status === "failed") {
    return <Error message={error} />;
  }
  return (
    <div>
      <h1 className="page-title">Characters</h1>
      <div className="chars">
        {data.map((item) => {
          return (
            <Link to="char/2" key={item.id}>
              <CharactersCard item={item} />
            </Link>
          );
        })}
      </div>
      <div style={{ textAlign: "center", padding: 35 }}>
        {status === "loading" && <Loading />}

        {status !== "loading" && hasNextPage && (
          <button
            className="next-page-btn"
            onClick={() => dispatch(fetchCharacters(page))}
          >
            Next Page {page}
          </button>
        )}

        {!hasNextPage && <div>no more characters</div>}
      </div>
    </div>
  );
}

export default Home;
