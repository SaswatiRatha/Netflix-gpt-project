import { useDispatch, useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import { closeModal } from "../store/slices/movieSlice";
import useMovieCast from "../hooks/useMovieCasts";
import { useState } from "react";
import useMovieGenre from "../hooks/useMovieGenre";
import useSimilarShows from "../hooks/useSimilarShows";
import MoviePoster from "./MoviePoster";

const MoreInfoModal = () => {
  const [showAllCast, setShowAllCast] = useState(false);
  const selectedMovie = useSelector((state) => state.movie.selectedMovie);
  const dispatch = useDispatch();
  useMovieCast(selectedMovie.id);
  useMovieGenre(selectedMovie.id);
  useSimilarShows(selectedMovie.id);

  const casts = useSelector((state) => state.movie.movieCasts);
  const genre = useSelector((state) => state.movie.movieGenre);
  const similarMovies = useSelector((state) => state.movie.similarShows);
  if (!similarMovies) return;
  if (!selectedMovie) return;
  if (!casts) return;
  if (!genre) return;
  console.log(similarMovies);
  const selectedCast = showAllCast ? casts : casts.slice(0, 5);

  //console.log(selectedMovie);
  return (
    <div className="absolute inset-0 z-50 bg-black/70 transition-all duration-150">
      <div className="absolute w-[70vw] max-w-5xl mx-auto mt-5 inset-0 z-50 items-start justify-center bg-black rounded-xl shadow-2xl">
        <button
          onClick={() => dispatch(closeModal())}
          className="absolute top-5 right-3 bg-gray-600 rounded-full px-4 py-2 text-white"
        >
          X
        </button>
        <div className="w-[70vw] rounded-lg overflow-hidden">
          <VideoBackground movieId={selectedMovie.id} />
        </div>
        <div className="m-4 p-4 gap-3 grid grid-cols-3">
          <div className="col-span-2 flex flex-col gap-3">
            <h1 className="font-bold text-2xl">{selectedMovie.title}</h1>
            <p className="border-2 w-max px-4 py-1">
              {selectedMovie.adult ? "A" : "U/A"}
            </p>
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
        </div>
        <h1 className="mx-4 px-4 font-bold text-2xl">More like this</h1>
        <div className="mx-4 grid grid-cols-3 gap-3 py-6 sm:mx-8 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5">
          {similarMovies.map((movie) => (
            <div
              key={movie.id}
              className="h-60 w-full max-w-40 transition-transform duration-200 hover:scale-105"
            >
              <MoviePoster posterPath={movie.poster_path} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoreInfoModal;
