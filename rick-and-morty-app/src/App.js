import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Location from "./pages/Location";
import Navbar from "./components/Navbar";
import Detail from "./pages/Detail";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/location",
    element: <Location />,
  },
  {
    path: "/:char_id",
    element: <Detail />,
  },
]);
function App() {
  return (
    <div>
      <Navbar />
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
