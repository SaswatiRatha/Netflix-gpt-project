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
import { useEffect, useState } from "react";

const Movies = () => {
  const [scrolled, setScrolled] = useState(false);
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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50); // Change after 50px
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative">
      <MainContainer
        moviesKey={selectedGenre.id === 0 ? "trendingMovies" : "genreMediaList"}
      />
      <div
        className={`fixed top-12 sm:top-16 left-0 right-0 z-30
                    flex items-center gap-4 px-4 py-4
                    transition-all duration-300
                    ${scrolled ? "bg-black shadow-lg" : "bg-transparent"}`}
      >
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
