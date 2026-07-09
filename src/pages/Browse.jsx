import { useSelector } from "react-redux";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import MainContainer from "../components/media/MainContainer";
import SecondaryContainer from "../components/media/SecondaryContainer";
import MoreInfoModal from "../components/moreinfo/MoreInfoModal";
import usePopularTV from "../hooks/usePopularTV";
import useTrendingBanner from "../hooks/useTrendingBanner";
import useTopRatedTv from "../hooks/useTopRatedTv";
import useOnTheAir from "../hooks/useOnTheAir";

const Browse = () => {
  const isModalOpen = useSelector((state) => state.modal.isModalOpen);
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();
  usePopularTV();
  useTrendingBanner();
  useTopRatedTv();
  useOnTheAir();
  return (
    <div className="relative min-h-screen">
      <MainContainer />
      <SecondaryContainer />
      {isModalOpen && <MoreInfoModal />}
    </div>
  );
};

export default Browse;
