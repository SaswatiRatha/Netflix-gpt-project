import { useSelector } from "react-redux";
import MoviePoster from "./MoviePoster";
import { LOGIN_BG } from "../utils/constants";

const MyWatchList = () => {
  const myList = useSelector((state) => state.movie.myList);
  if (!myList) return;
  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <img
        className="fixed inset-0 h-dvh w-full object-cover"
        src={LOGIN_BG}
        alt="background-img"
      />
      <div className="fixed inset-0 z-10 bg-black/80" />
      <h1 className="relative z-30 mx-4 pt-20 text-2xl font-bold text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] sm:mx-8 sm:text-3xl">
        My Watchlist
      </h1>
      {myList.length === 0 ? (
        <p className="relative z-30 text-center mt-40 text-gray-500">
          You haven't added any movies to your list yet.
        </p>
      ) : (
        <div className="relative z-20 mx-4 grid grid-cols-1 gap-3 py-6 sm:mx-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {myList.map((movie) => (
            <div
              key={movie.id}
              className="h-60 w-full max-w-40 transition-transform duration-200 hover:scale-105"
            >
              <MoviePoster posterPath={movie.poster_path} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyWatchList;
