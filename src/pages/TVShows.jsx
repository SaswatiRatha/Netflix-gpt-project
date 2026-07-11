import { useSelector } from "react-redux";
import useMediaList from "../hooks/useMediaList";
import useTrendingBanner from "../hooks/useTrendingBanner";
import MainContainer from "../components/media/MainContainer";
import MovieList from "../components/media/MovieList";
import MoreInfoModal from "../components/moreinfo/MoreInfoModal";
import {
  setPopularTv,
  setTopRatedTV,
  setOnTheAir,
  setGenreMediaList,
} from "../store/slices/mediaSlice";
import Dropdown from "../components/media/Dropdown";
import { TV_GENRES } from "../utils/constants";
import MediaGrid from "../components/media/MediaGrid";

const TVShows = () => {
  const isModalOpen = useSelector((state) => state.modal.isModalOpen);
  const selectedGenre = useSelector((state) => state.media.selectedGenre);

  useMediaList("/tv/popular?language=en-US&page=1", "tv", setPopularTv);
  useMediaList("/tv/top_rated?language=en-US&page=1", "tv", setTopRatedTV);
  useMediaList("/tv/on_the_air?language=en-US&page=4", "tv", setOnTheAir);
  useMediaList(
    `/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${selectedGenre.id}`,
    "tv",
    setGenreMediaList,
    selectedGenre.id === 0,
  );
  useTrendingBanner();

  return (
    <div className="relative">
      <MainContainer
        moviesKey={selectedGenre.id === 0 ? "trendingTV" : "genreMediaList"}
      />
      <div className="fixed top-16 left-0 right-0 z-30 flex items-center gap-4 px-4 py-4 sm:px-8 bg-black/90 backdrop-blur-md">
        <h1 className="text-2xl font-bold text-white sm:text-3xl">TV</h1>
        <Dropdown value={TV_GENRES} type="genre" />
      </div>
      <div className="bg-black">
        <div className="relative z-10 -mt-10 pb-8 sm:-mt-14 md:-mt-28 lg:-mt-34">
          {selectedGenre.id === 0 ? (
            <>
              <MovieList
                title="Top Rated TV"
                moviesKey="topRatedTV"
                type="tv"
              />
              <MovieList
                title="Popular TV Shows"
                moviesKey="popularTv"
                type="tv"
              />
              <MovieList
                title="Top 10 TV Today"
                moviesKey="trendingTV"
                type="tv"
              />
              <MovieList title="On The Air" moviesKey="onTheAir" type="tv" />
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

export default TVShows;
