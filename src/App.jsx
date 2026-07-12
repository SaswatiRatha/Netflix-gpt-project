import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Body from "./components/Body";
import Login from "./pages/Login";
import Browse from "./pages/Browse";
import Error from "./pages/Error";
import SearchResults from "./components/search/SearchResults";
import MyWatchList from "./pages/MyWatchList";
import Movies from "./pages/Movies";
import TVShows from "./pages/TVShows";
import LanguageBrowse from "./pages/LanguageBrowse";
import ManageProfile from "./pages/ManageProfile";
import UserProfile from "./pages/UserProfile";
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
        path: "movies",
        element: <Movies />,
      },
      {
        path: "tv",
        element: <TVShows />,
      },
      {
        path: "search",
        element: <SearchResults />,
      },
      {
        path: "watchlist",
        element: <MyWatchList />,
      },
      {
        path: "language",
        element: <LanguageBrowse />,
      },
      {
        path: "manage-profile",
        element: <ManageProfile />,
      },
      {
        path: "profile",
        element: <UserProfile />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
