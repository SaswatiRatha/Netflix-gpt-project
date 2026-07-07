import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { LOGO } from "../utils/constants";
import SearchBar from "./SearchBar";

const Header = () => {
  const user = useSelector((state) => state.user.currentUser);
  //console.log(user);

  const navigate = useNavigate();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <header className="fixed left-0 top-0 z-50 flex w-full flex-row items-center justify-between gap-3 bg-black/70 px-4 py-3 shadow-lg sm:px-8 sm:py-4">
      <img
        className="w-24 sm:w-32 lg:w-38 cursor-pointer"
        src={LOGO}
        alt="logo"
        onClick={() => navigate("browse")}
      />
      <ul className="flex gap-3 text-lg text-white decoration-0 cursor-pointer">
        <li className="active:font-bold" onClick={() => navigate("browse")}>
          Home
        </li>
        <li>Movies</li>
        <li>TV Shows</li>
        <li onClick={() => navigate("watchlist")}>My List</li>
      </ul>
      {user && (
        <div className="flex items-center gap-2 sm:gap-3">
          <SearchBar />
          <h1 className="text-sm font-bold text-white sm:text-base">
            Hello {user.name}!
          </h1>
          <button
            onClick={handleSignOut}
            className="rounded-md bg-red-400 px-3 py-2 text-sm text-white transition-all duration-150 hover:bg-red-500 sm:px-4 sm:text-base"
          >
            Sign Out
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
