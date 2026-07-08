import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { LOGO } from "../utils/constants";
import SearchBar from "./SearchBar";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    <header className="fixed left-0 top-0 z-50 flex w-full items-center justify-between bg-linear-to-b from-black via-black/90 to-transparent px-4 py-4 backdrop-blur-md shadow-lg sm:px-8">
      <div className="flex flex-1 items-center gap-6">
        <img
          className="w-20 cursor-pointer sm:w-28 lg:w-32"
          src={LOGO}
          alt="logo"
          onClick={() => navigate("/browse")}
        />

        <ul className="hidden sm:flex items-center gap-5 text-sm lg:text-base xl:text-lg font-medium whitespace-nowrap">
          <Link
            to="/browse"
            className="text-white hover:text-gray-300 transition-colors"
          >
            Home
          </Link>

          <Link
            to="/movies"
            className="text-white hover:text-gray-300 transition-colors"
          >
            Movies
          </Link>

          <Link
            to="/tv"
            className="text-white hover:text-gray-300 transition-colors"
          >
            TV Shows
          </Link>

          <Link
            to="/watchlist"
            className="text-white hover:text-gray-300 transition-colors"
          >
            My List
          </Link>
        </ul>

        <div className="relative sm:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-2 text-white"
          >
            Browse
            <span
              className={`text-xs transition-transform duration-200 ${
                isMenuOpen ? "rotate-180" : ""
              }`}
            >
              ▼
            </span>
          </button>

          {isMenuOpen && (
            <div className="absolute left-0 top-full mt-3 w-44 rounded-md border border-gray-700 bg-black shadow-xl">
              <Link
                to="/browse"
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 text-white hover:bg-zinc-800"
              >
                Home
              </Link>

              <Link
                to="/movies"
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 text-white hover:bg-zinc-800"
              >
                Movies
              </Link>

              <Link
                to="/tv"
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 text-white hover:bg-zinc-800"
              >
                TV Shows
              </Link>

              <Link
                to="/watchlist"
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-3 text-white hover:bg-zinc-800"
              >
                My List
              </Link>
            </div>
          )}
        </div>
      </div>

      {user && (
        <div className="ml-auto flex items-center gap-2 md:gap-4">
          <SearchBar />

          <p className="hidden md:block text-sm font-medium text-gray-300">
            {user.name}
          </p>

          <button
            onClick={handleSignOut}
            className="rounded-md border border-gray-600 bg-zinc-900 px-2 py-1 text-xs text-white transition hover:border-white hover:bg-zinc-800 sm:px-4 sm:py-2 sm:text-sm"
          >
            Sign Out
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
