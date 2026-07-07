import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {
  const movies = useSelector((state) => state.movie?.trending);
  if (!movies) return;
  //console.log(movies);
  const mainMovie = movies[0];
  //console.log(mainMovie);

  return (
    <div>
      <VideoTitle movie={mainMovie} />
      <div className="w-screen aspect-video">
        <VideoBackground movieId={mainMovie.id} type="movie" />
      </div>
    </div>
  );
};

export default MainContainer;
