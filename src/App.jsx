import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Body from "./components/Body";
import Login from "./pages/Login";
import Browse from "./pages/Browse";
import Error from "./pages/Error";
import SearchResults from "./components/search/SearchResults";
import MyWatchList from "./pages/MyWatchList";
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
