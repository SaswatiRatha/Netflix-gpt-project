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
} from "../store/slices/mediaSlice";

const TVShows = () => {
  const isModalOpen = useSelector((state) => state.modal.isModalOpen);

  useMediaList("/tv/popular?language=en-US&page=1", "tv", setPopularTv);
  useMediaList("/tv/top_rated?language=en-US&page=1", "tv", setTopRatedTV);
  useMediaList("/tv/on_the_air?language=en-US&page=4", "tv", setOnTheAir);
  useTrendingBanner();

  return (
    <div className="relative min-h-screen">
      <MainContainer moviesKey="trendingTV" />
      <div className="bg-black">
        <div className="relative z-10 -mt-10 pb-8 sm:-mt-14 md:-mt-28 lg:-mt-34">
          <MovieList title="Top Rated TV" moviesKey="topRatedTV" type="tv" />
          <MovieList title="Popular TV Shows" moviesKey="popularTv" type="tv" />
          <MovieList title="Top 10 TV Today" moviesKey="trendingTV" type="tv" />
          <MovieList title="On The Air" moviesKey="onTheAir" type="tv" />
        </div>
      </div>
      {isModalOpen && <MoreInfoModal />}
    </div>
  );
};

export default TVShows;
