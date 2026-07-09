import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MoviePoster from "../media/MoviePoster";
import { addToWatchList } from "../../store/slices/mediaSlice";

const SimilarMediaCards = () => {
  const [hoveredMovieId, setHoveredMovieId] = useState(null);
  const { similarShows, certificate } = useSelector((state) => state.modal);
  const watchlist = useSelector((state) => state.media.myList);
  const dispatch = useDispatch();
  if (!similarShows || !certificate) return;
  return (
    <>
      <h1 className="mx-4 px-4 font-bold text-2xl">More like this</h1>
      <div className="mx-4 grid grid-cols-2 gap-3 py-6 sm:mx-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
        {similarShows.map((movie) => {
          const exists = watchlist.some((item) => item.id === movie.id);
          return (
            <div
              key={movie.id}
              className="bg-zinc-800 rounded-lg overflow-hidden flex flex-col "
            >
              <div className="h-70">
                <MoviePoster posterPath={movie.poster_path} />
              </div>

              <div className="p-3 flex flex-col  text-white">
                <div className="grid grid-cols-3 gap-2 ">
                  <div className="flex gap-2 items-center col-span-2">
                    <p className="border border-gray-500 text-gray-300 w-max px-4 text-md">
                      {certificate}
                    </p>
                    <p className="border border-gray-500 text-gray-300 w-max px-1 text-xs h-max">
                      HD
                    </p>
                    <p className="text-gray-300 text-md">
                      {movie.release_date?.slice(0, 4) ||
                        movie.first_air_date.slice(0, 4)}
                    </p>
                  </div>
                  <div className="relative flex justify-end">
                    <button
                      onClick={() => dispatch(addToWatchList(movie))}
                      onMouseEnter={() => setHoveredMovieId(movie.id)}
                      onMouseLeave={() => setHoveredMovieId(null)}
                      className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-gray-500 text-xl text-white transition-all hover:border-white"
                    >
                      {exists ? "✓" : "+"}
                    </button>

                    {hoveredMovieId === movie.id && (
                      <>
                        <span className="absolute bottom-11 whitespace-nowrap rounded-md bg-white px-3 py-1 text-xs font-medium text-black shadow-lg">
                          {exists ? "Remove from My List" : "Add to My List"}
                        </span>

                        <span className="absolute bottom-8 right-3 text-white text-xs">
                          ▼
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <p className="text-xs">
                  {Math.round(movie.vote_average * 10)}% Match
                </p>

                <p className="text-xs line-clamp-3">{movie.overview}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default SimilarMediaCards;
