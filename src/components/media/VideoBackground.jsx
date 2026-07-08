import { useSelector } from "react-redux";
import { useEffect } from "react";
import useMovieTrailer from "../../hooks/useMovieTrailer";

const VideoBackground = ({ movieId, type = "movie" }) => {
  useMovieTrailer(movieId, type);
  const trailerKey = `${type}:${movieId}`;
  const trailer = useSelector((state) => state.movie.trailersById[trailerKey]);
  //console.log(trailer);
  useEffect(() => {
    console.log("VideoBackground mounted");

    return () => {
      console.log("VideoBackground unmounted");
    };
  }, []);
  if (!trailer) {
    return <div className="aspect-video w-full bg-black animate-pulse" />;
  }

  return (
    <div className="w-full h-full -mt-10">
      <iframe
        className="aspect-video w-full"
        src={`https://www.youtube.com/embed/${trailer?.key}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&loop=1&playlist=${trailer?.key}&playsinline=1`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export default VideoBackground;
