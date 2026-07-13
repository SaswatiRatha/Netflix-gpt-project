import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";
import MainSpinner from "../MainSpinner";
import useIsMobile from "../../hooks/useIsMobile";
import MobileHero from "./MobileHero";

const MainContainer = ({ moviesKey = "trending" }) => {
  const movies = useSelector((state) => state.media?.[moviesKey]);
  const isMobile = useIsMobile();
  //if (!movies) return;
  if (!movies || movies.length === 0) {
    return <MainSpinner />;
  }
  //console.log(movies);
  const mainMovie = movies[0];
  //console.log(mainMovie);

  if (isMobile) {
    return <MobileHero movie={mainMovie} />;
  }

  return (
    <div>
      <VideoTitle movie={mainMovie} />
      <div className="w-full aspect-video">
        <VideoBackground
          movieId={mainMovie.id}
          type={mainMovie.media_type}
          backdrop={mainMovie.backdrop_path}
        />
      </div>
    </div>
  );
};

export default MainContainer;
