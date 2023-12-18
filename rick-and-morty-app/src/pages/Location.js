import { useEffect } from "react";
import { fetchLocations } from "../redux/locationsSlice";
import { useSelector, useDispatch } from "react-redux";

function Location() {
  const locations = useSelector((state) => state.locations.items);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchLocations());
  }, [dispatch]);

  console.log("locations", locations);

  return (
    <div>
      <h1 className="page-title">Locations</h1>
      <div>
        {locations.map((item) => {
          return <div>{item.name}</div>;
        })}
      </div>
    </div>
  );
}

export default Location;
