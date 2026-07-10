import { useSelector } from "react-redux";
import useMovieTrailer from "../../hooks/useMovieTrailer";
import { IMG_CDN_URL } from "../../utils/constants";

const VideoBackground = ({ movieId, type = "movie", backdrop }) => {
  useMovieTrailer(movieId, type);
  const trailerKey = `${type}:${movieId}`;
  const trailer = useSelector((state) => state.media.trailersById[trailerKey]);
  //console.log(trailerKey, trailer);

  if (trailer === undefined) {
    return <div className="aspect-video w-full bg-black animate-pulse" />;
  }

  if (!trailer) {
    return backdrop ? (
      <img
        className="aspect-video w-full object-cover"
        src={IMG_CDN_URL + backdrop}
        alt=""
      />
    ) : (
      <div className="aspect-video w-full bg-black" />
    );
  }

  return (
    <div className="w-full h-full -mt-10">
      {trailer ? (
        <iframe
          className="aspect-video w-full"
          src={`https://www.youtube.com/embed/${trailer?.key}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&loop=1&playlist=${trailer?.key}&playsinline=1`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <img
          className="aspect-video w-full object-cover"
          src={IMG_CDN_URL + backdrop}
          alt=""
        />
      )}
    </div>
  );
};

export default VideoBackground;
