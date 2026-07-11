import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="flex flex-1 items-center gap-6">
      <h1
        className="text-red-600 text-xl leading-tight font-extrabold font-sans cursor-pointer sm:text-2xl lg:text-3xl"
        onClick={() => navigate("/browse")}
      >
        CineVerse
      </h1>

      <ul className="hidden md:flex items-center gap-5 text-sm lg:text-base xl:text-base font-medium whitespace-nowrap">
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
        <Link
          to="/language"
          className="text-white hover:text-gray-300 transition-colors"
        >
          Browse by language
        </Link>
      </ul>

      <div className="relative flex items-center md:hidden">
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
            <Link
              to="/language"
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-3 text-white hover:bg-zinc-800"
            >
              Browse by language
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
