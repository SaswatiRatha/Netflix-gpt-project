import { useDispatch, useSelector } from "react-redux";
import useMediaList from "../hooks/useMediaList";
import {
  addNowPlayingMovies,
  setGenreMediaList,
  setPopularMovies,
  setSelectedGenre,
  setTopRatedMovies,
  setUpcomingMovies,
} from "../store/slices/mediaSlice";
import MainContainer from "../components/media/MainContainer";
import MoreInfoModal from "../components/moreinfo/MoreInfoModal";
import MovieList from "../components/media/MovieList";
import Dropdown from "../components/media/Dropdown";
import { MOVIE_GENRES } from "../utils/constants";
import MediaGrid from "../components/media/MediaGrid";
import { useEffect } from "react";

const Movies = () => {
  const isModalOpen = useSelector((state) => state.modal.isModalOpen);
  const selectedGenre = useSelector((state) => state.media.selectedGenre);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSelectedGenre({ id: 0, name: "Genre" }));
  }, [dispatch]);
  useMediaList("/movie/now_playing?", "movie", addNowPlayingMovies);
  useMediaList("/movie/popular?language=en-US", "movie", setPopularMovies);
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
    <div className="relative">
      <MainContainer
        moviesKey={selectedGenre.id === 0 ? "trendingMovies" : "genreMediaList"}
      />
      <div className="fixed top-16 left-0 right-0 z-30 flex flex-wrap items-center gap-3 px-4 py-4 sm:gap-4 sm:px-8 bg-black/90 backdrop-blur-md">
        <h1 className="text-2xl font-bold text-white sm:text-3xl">Movies</h1>
        <Dropdown value={MOVIE_GENRES} type="genre" />
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
            <MediaGrid title={selectedGenre.name} moviesKey="genreMediaList" />
          )}
        </div>
      </div>
      {isModalOpen && <MoreInfoModal />}
    </div>
  );
};

export default Movies;
