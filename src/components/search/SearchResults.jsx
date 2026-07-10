import { useSelector } from "react-redux";
import MovieCard from "../media/MovieCard";
import { LOGIN_BG } from "../../utils/constants";
import MoreInfoModal from "../moreinfo/MoreInfoModal";

const SearchResults = () => {
  const searchResultMovies =
    useSelector((state) => state.gpt.searchResults) || [];
  const aiRecommendations = useSelector((state) => state.gpt.gptMovies) || [];
  const searchText = useSelector((state) => state.gpt.searchText);
  console.log("searchResultMovies: ", searchResultMovies);
  console.log("aiRecommendations: ", aiRecommendations);
  const isModalOpen = useSelector((state) => state.modal.isModalOpen);

  const movies = Array.from(
    new Map(
      [...searchResultMovies, ...aiRecommendations]
        .filter(Boolean)
        .map((movie) => [movie.id, movie]),
    ).values(),
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <img
        className="fixed inset-0 h-dvh w-full object-cover"
        src={LOGIN_BG}
        alt="background-img"
      />
      <div className="fixed inset-0 z-10 bg-black/80" />
      <h1 className="relative z-30 mx-4 pt-20 text-2xl font-bold text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] sm:mx-8 sm:text-3xl">
        Showing Results for {searchText}...
      </h1>
      <div className="relative z-20 mx-4 grid grid-cols-3 gap-3 py-6 sm:mx-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {movies.map((movie, index) =>
          movie.poster_path ? (
            <MovieCard
              key={movie.id}
              movie={movie}
              index={index}
              totalMovies={movies.length}
            />
          ) : (
            ""
          ),
        )}
      </div>
      {isModalOpen && <MoreInfoModal />}
    </div>
  );
};

export default SearchResults;
