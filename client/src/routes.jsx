import { createBrowserRouter } from "react-router-dom";
import { Game, Login, Signup } from "./index.jsx";
import App from "./App.jsx";
const routes = createBrowserRouter([
  {
    element: <App />,
    path: "/",
  },
  {
    element: <Login />,
    path: "/login",
  },
  {
    element: <Signup />,
    path: "/signup",
  },
  {
    element: <Game />,
    path: "/game",
  },
]);

export default routes;
