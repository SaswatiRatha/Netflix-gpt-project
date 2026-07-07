import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Browse from "./components/Browse";
import Error from "./components/Error";
import SearchResults from "./components/SearchResults";
import MyWatchList from "./components/MyWatchList";
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Body />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "browse",
        element: <Browse />,
      },
      {
        path: "search",
        element: <SearchResults />,
      },
      {
        path: "watchlist",
        element: <MyWatchList />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
