import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";

function Detail() {
  const [char, setChar] = useState(null);
  const [loading, setLoading] = useState(true);
  const { char_id } = useParams();

  useEffect(() => {
    axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}/character/${char_id}`)
      .then((res) => res.data)
      .then((data) => setChar(data))
      .finally(() => setLoading(false));
  }, [char_id]);

  console.log(char);
  return (
    <div>
      {loading && <Loading />}
      {char && (
        <div className="char-details">
          <div>
            <img src={char.image} alt="" />
          </div>
          <div>
            <h1>{char.name}</h1>
            <p>
              <span className="chart-text-title">Status: </span>
              <span className={char.status === "Alive" ? "green" : "red"}>
                {char.status}
              </span>
            </p>

            <p>
              <span className="chart-text-title">Species: </span>
              <span>{char.species}</span>
            </p>
            <p>
              <span className="chart-text-title">Gender: </span>
              <span>{char.gender}</span>
            </p>
            <p>
              <span className="chart-text-title">Planet: </span>
              <span>{char.origin.name}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Detail;
