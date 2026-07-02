import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const nowPlayingMovies = useSelector((state) => state.movie.nowPlaying);
  const popularMovies = useSelector((state) => state.movie.popularMovies);
  const topRatedMovies = useSelector((state) => state.movie.topRatedMovies);
  const upcomingMovies = useSelector((state) => state.movie.upcomingMovies);

  return (
    <div className="bg-black">
      <div className="relative z-10 -mt-10 pb-8 sm:-mt-20 md:-mt-28 lg:-mt-46">
        <MovieList title="Now Playing" movies={nowPlayingMovies} />
        <MovieList title="Popular" movies={popularMovies} />
        <MovieList title="Top Rated" movies={topRatedMovies} />
        <MovieList title="Upcoming" movies={upcomingMovies} />
      </div>
    </div>
  );
};

export default SecondaryContainer;
