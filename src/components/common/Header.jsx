import { signOut } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchBar from "../search/SearchBar";
import { useState } from "react";
import { PROFILE } from "../../utils/constants";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
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
        <h1
          className="text-red-600 text-xl leading-tight font-extrabold font-sans cursor-pointer sm:text-2xl lg:text-4xl"
          onClick={() => navigate("/browse")}
        >
          CineVerse
        </h1>

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
          <div className="relative">
            <button
              onClick={() => setIsProfileOpen(true)}
              className="flex gap-1 items-center"
            >
              <img
                src={PROFILE}
                alt="profile"
                className="w-10 h-10 rounded-lg"
              />
              <span className="fill-white text-white text-xs ml-2">▼</span>
            </button>
            {isProfileOpen && (
              <div className="absolute flex flex-col top-full right-0  mt-1 w-max rounded-md border border-gray-600 bg-zinc-900 shadow-lg z-50">
                <h1
                  onClick={() => setIsProfileOpen(false)}
                  className="w-full px-4 py-2 text-center text-white text-base font-bold"
                >
                  {user.name}
                </h1>
                <button className="w-full px-4 py-2 text-center text-white hover:bg-gray-700 text-base">
                  Manage Profile
                </button>
                <button
                  onClick={handleSignOut}
                  className=" border-t border-gray-600 w-full px-4 py-2 text-center text-white hover:bg-gray-700 text-base"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
