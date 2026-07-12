import { useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useOutsideClick from "../../hooks/useOutsideClick";
const navLinkClass = ({ isActive }) =>
  `transition-colors ${
    isActive
      ? "font-bold text-white"
      : "font-medium text-gray-300 hover:text-white"
  }`;
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownref = useRef(null);
  useOutsideClick(dropdownref, () => setIsMenuOpen(false), isMenuOpen);

  return (
    <div className="flex flex-1 items-center gap-6">
      <h1
        className="text-red-600 text-xl leading-tight font-extrabold font-sans cursor-pointer sm:text-2xl lg:text-3xl"
        onClick={() => navigate("/browse")}
      >
        CineVerse
      </h1>

      <ul className="hidden md:flex items-center gap-5 text-sm lg:text-base xl:text-base font-medium whitespace-nowrap">
        <NavLink to="/browse" className={navLinkClass}>
          Home
        </NavLink>

        <NavLink to="/movies" className={navLinkClass}>
          Movies
        </NavLink>

        <NavLink to="/tv" className={navLinkClass}>
          TV Shows
        </NavLink>

        <NavLink to="/watchlist" className={navLinkClass}>
          My List
        </NavLink>
        <NavLink to="/language" className={navLinkClass}>
          Browse by language
        </NavLink>
      </ul>

      <div ref={dropdownref} className="relative flex items-center md:hidden">
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
            {/* <Link
              to="/browse"
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-3 text-white hover:bg-zinc-800"
            >
              Home
            </Link> */}

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
