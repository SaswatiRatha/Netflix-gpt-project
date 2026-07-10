import { useSelector } from "react-redux";
import useMediaList from "../hooks/useMediaList";
import {
  addNowPlayingMovies,
  setOnTheAir,
  setPopularMovies,
  setPopularTv,
  setTopRatedMovies,
  setTopRatedTV,
  setUpcomingMovies,
} from "../store/slices/mediaSlice";

import MainContainer from "../components/media/MainContainer";
import SecondaryContainer from "../components/media/SecondaryContainer";
import MoreInfoModal from "../components/moreinfo/MoreInfoModal";

import useTrendingBanner from "../hooks/useTrendingBanner";

const Browse = () => {
  const isModalOpen = useSelector((state) => state.modal.isModalOpen);
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
  useMediaList("/tv/popular?language=en-US&page=1", "tv", setPopularTv);
  useMediaList("/tv/top_rated?language=en-US&page=1", "tv", setTopRatedTV);
  useMediaList("/tv/on_the_air?language=en-US&page=4", "tv", setOnTheAir);

  useTrendingBanner();

  return (
    <div className="relative min-h-screen">
      <MainContainer />
      <SecondaryContainer />
      {isModalOpen && <MoreInfoModal />}
    </div>
  );
};

export default Browse;
