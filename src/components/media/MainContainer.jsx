import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";
import MainSpinner from "../MainSpinner";

const MainContainer = () => {
  const movies = useSelector((state) => state.media?.trending);

  //if (!movies) return;
  if (!movies || movies.length === 0) {
    return <MainSpinner />;
  }
  //console.log(movies);
  const mainMovie = movies[0];
  //console.log(mainMovie);

  return (
    <div>
      <VideoTitle movie={mainMovie} />
      <div className="w-full aspect-video">
        <VideoBackground movieId={mainMovie.id} type={mainMovie.media_type} />
      </div>
    </div>
  );
};

export default MainContainer;
