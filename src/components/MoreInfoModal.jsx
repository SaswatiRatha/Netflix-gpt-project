import { useDispatch, useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import { addToWatchList, closeModal } from "../store/slices/movieSlice";
import useMovieCast from "../hooks/useMovieCasts";
import { useState } from "react";
import useMovieGenre from "../hooks/useMovieGenre";
import useSimilarShows from "../hooks/useSimilarShows";
import MoviePoster from "./MoviePoster";
import { createPortal } from "react-dom";
import useLockBodyScroll from "../hooks/useLockBodyScroll";
import useCertificate from "../hooks/useCertificate";
import useSeriesDetails from "../hooks/useSeriesDetails";
import EpisodeCard from "./EpisodeCard";
import useEpisodes from "../hooks/useEpisodes";

const MoreInfoModal = () => {
  const [showAllCast, setShowAllCast] = useState(false);
  const [hoveredMovieId, setHoveredMovieId] = useState(null);
  const selectedMovie = useSelector((state) => state.movie.selectedMovie);
  const watchlist = useSelector((state) => state.movie.myList);
  console.log(watchlist);

  const dispatch = useDispatch();
  useLockBodyScroll();
  useMovieCast(selectedMovie.id, selectedMovie.media_type);
  useMovieGenre(selectedMovie.id, selectedMovie.media_type);
  useSimilarShows(selectedMovie.id, selectedMovie.media_type);
  useCertificate(selectedMovie.id, selectedMovie.media_type);
  useSeriesDetails(selectedMovie.id, selectedMovie.media_type);
  useEpisodes(selectedMovie.id, selectedMovie.media_type);

  const casts = useSelector((state) => state.movie.movieCasts);
  const genre = useSelector((state) => state.movie.movieGenre);
  const similarMovies = useSelector((state) => state.movie.similarShows);
  const certificate = useSelector((state) => state.movie.certificate);
  const seasons = useSelector((state) => state.movie.tvDetails);
  const episodes = useSelector((state) => state.movie.episodes);

  if (!similarMovies) return;
  if (!selectedMovie) return;
  if (!casts) return;
  if (!genre) return;
  if (!certificate) return;
  if (selectedMovie.media_type === "tv") {
    if (!episodes) return;
    if (!seasons) return;
  }

  console.log(similarMovies);
  const selectedCast = showAllCast ? casts : casts.slice(0, 5);

  //console.log(selectedMovie);
  return createPortal(
    <div className="fixed inset-0 z-50 bg-black/70 overflow-y-auto">
      <div className="relative mx-auto mt-5 w-[70vw] max-w-5xl rounded-xl bg-black shadow-2xl">
        <button
          onClick={() => dispatch(closeModal())}
          className="absolute top-4 right-4 bg-gray-600 rounded-full px-4 py-2 text-white transition-all duration-300 hover:bg-gray-700"
        >
          X
        </button>
        <div className="w-[70vw] rounded-lg overflow-hidden">
          <VideoBackground
            movieId={selectedMovie.id}
            type={selectedMovie.media_type}
          />
        </div>
        <div className="m-4 p-4 gap-3 grid grid-cols-3">
          <div className="col-span-2 flex flex-col gap-3">
            <h1 className="font-bold text-2xl">
              {selectedMovie.title || selectedMovie.name}
            </h1>
            <p className="border-2 w-max px-4 py-1">{certificate}</p>
            <span>Rating: {Math.round(selectedMovie.vote_average)}/10</span>
            <p>{selectedMovie.overview}</p>
          </div>
          <div className="col-span-1 flex flex-col gap-3">
            <p className=" text-gray-500">
              Cast:{" "}
              <span className="text-white font-normal">
                {selectedCast.join(", ")}{" "}
                {casts.length > 5 && (
                  <span
                    className="italic"
                    onClick={() => setShowAllCast(!showAllCast)}
                  >
                    , more
                  </span>
                )}
              </span>
            </p>
            <p className=" text-gray-500">
              Genre:{" "}
              <span className="text-white font-normal">
                {genre.join(", ")}{" "}
              </span>
            </p>
          </div>
          {selectedMovie.media_type === "tv" && (
            <div className="col-span-3 flex flex-col justify-between mt-4 ">
              <h1 className="font-bold text-2xl">Episodes</h1>
              {seasons.length > 1 && (
                <button className="px-4 py-2 border-2 border-gray-500 text-white">
                  Season {seasons}{" "}
                  <span className=" fill-white  text-white text-xs ml-2">
                    ▼
                  </span>
                </button>
              )}
              {episodes.map((episode, index) => (
                <EpisodeCard number={index + 1} episode={episode} />
              ))}
            </div>
          )}
        </div>
        <h1 className="mx-4 px-4 font-bold text-2xl">More like this</h1>
        <div className="mx-4 grid grid-cols-3 gap-3 py-6 sm:mx-8 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
          {similarMovies.map((movie) => {
            const exists = watchlist.some((item) => item.id === movie.id);
            return (
              <div
                key={movie.id}
                className="bg-zinc-900 rounded-lg overflow-hidden flex flex-col "
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
                        {movie.release_date.slice(0, 4)}
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
      </div>
    </div>,
    document.getElementById("modal-root"),
  );
};

export default MoreInfoModal;
