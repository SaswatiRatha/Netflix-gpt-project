import { useSelector } from "react-redux";
import useMediaList from "../hooks/useMediaList";
import {
  addNowPlayingMovies,
  setGenreMediaList,
  setPopularMovies,
  setTopRatedMovies,
  setUpcomingMovies,
} from "../store/slices/mediaSlice";
import MainContainer from "../components/media/MainContainer";
import MoreInfoModal from "../components/moreinfo/MoreInfoModal";
import MovieList from "../components/media/MovieList";
import GenreDropdown from "../components/media/GenreDropdown";
import { MOVIE_GENRE } from "../utils/constants";

const Movies = () => {
  const isModalOpen = useSelector((state) => state.modal.isModalOpen);
  const selectedGenre = useSelector((state) => state.media.selectedGenre);
  useMediaList("/movie/now_playing?page=1", "movie", addNowPlayingMovies);
  useMediaList(
    "/movie/popular?language=en-US&page=3",
    "movie",
    setPopularMovies,
  );
  useMediaList(
    "/movie/top_rated?language=en-US&page=1",
    "movie",
    setTopRatedMovies,
  );
  useMediaList(
    "/movie/upcoming?language=en-US&page=4",
    "movie",
    setUpcomingMovies,
  );
  useMediaList(
    `/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc&with_genres=${selectedGenre.id}`,
    "movie",
    setGenreMediaList,
    selectedGenre.id === 0,
  );

  return (
    <div className="relative min-h-screen">
      <MainContainer moviesKey="trendingMovies" />
      <div className="absolute top-20 left-4 right-4 z-20 flex flex-col gap-3 sm:top-24 sm:left-8 sm:right-8 sm:flex-row sm:items-center ">
        <h1 className="text-2xl font-bold text-white sm:text-3xl">Movies</h1>
        <GenreDropdown genres={MOVIE_GENRE} />
      </div>
      <div className="bg-black">
        <div className="relative z-10 -mt-10 pb-8 sm:-mt-14 md:-mt-28 lg:-mt-34">
          {selectedGenre.id === 0 ? (
            <>
              <MovieList
                title="New Releases"
                moviesKey="nowPlaying"
                type="movie"
              />
              <MovieList
                title="Popular"
                moviesKey="popularMovies"
                type="movie"
              />
              <MovieList
                title="Top 10 Movies Today"
                moviesKey="trendingMovies"
                type="movie"
              />
              <MovieList
                title="Critically Acclaimed"
                moviesKey="topRatedMovies"
                type="movie"
              />
              <MovieList
                title="Upcoming Movies"
                moviesKey="upcomingMovies"
                type="movie"
              />
            </>
          ) : (
            <MovieList
              title={selectedGenre.name}
              moviesKey="genreMediaList"
              type="movie"
            />
          )}
        </div>
      </div>
      {isModalOpen && <MoreInfoModal />}
    </div>
  );
};

export default Movies;
