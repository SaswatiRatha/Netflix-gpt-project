import MovieList from "./MovieList";

const SecondaryContainer = () => {
  return (
    <div className="bg-black">
      <div className="relative z-10 -mt-10 pb-8 sm:-mt-14 md:-mt-28 lg:-mt-34">
        <MovieList title="New Releases" moviesKey="nowPlaying" type="movie" />
        <MovieList title="Popular" moviesKey="popularMovies" type="movie" />
        <MovieList
          title="Top 10 in Movies Today"
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

        <MovieList title="Top Rated TV" moviesKey="topRatedTV" type="tv" />
        <MovieList title="Popular TV Shows" moviesKey="popularTv" type="tv" />
        <MovieList
          title="Top 10 in TV Today"
          moviesKey="trendingTV"
          type="tv"
        />
        <MovieList title="On The Air" moviesKey="onTheAir" type="tv" />
      </div>
    </div>
  );
};

export default SecondaryContainer;
