import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { Link, useNavigate } from "react-router-dom";
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
    <header className="fixed left-0 top-0 z-50 flex w-full flex-row items-center justify-between gap-3 bg-linear-to-b from-black via-black/90 to-transparent backdrop-blur-md px-4 py-5 shadow-lg sm:px-8 sm:py-4">
      <div className="flex items-center gap-10">
        <img
          className="w-20 sm:w-28 lg:w-33 cursor-pointer"
          src={LOGO}
          alt="logo"
          onClick={() => navigate("browse")}
        />
        <ul className="flex items-center gap-7 text-[17px] font-medium">
          <Link
            className="cursor-pointer text-white transition-colors duration-200 hover:text-gray-300"
            to="/browse"
          >
            Home
          </Link>
          <Link className="cursor-pointer text-white transition-colors duration-200 hover:text-gray-300">
            Movies
          </Link>
          <Link className="cursor-pointer text-white transition-colors duration-200 hover:text-gray-300">
            TV Shows
          </Link>
          <Link
            className="cursor-pointer text-white transition-colors duration-200 hover:text-gray-300"
            to="/watchlist"
          >
            My List
          </Link>
        </ul>
      </div>
      {user && (
        <div className="flex items-center gap-2 sm:gap-3">
          <SearchBar />
          <p className="text-sm font-medium text-gray-300">{user.name}</p>
          <button
            onClick={handleSignOut}
            className="rounded-md border border-gray-600 bg-zinc-900 px-4 py-2 text-white transition hover:border-white hover:bg-zinc-800"
          >
            Sign Out
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
