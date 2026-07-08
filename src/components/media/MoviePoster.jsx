import { IMG_CDN_URL } from "../../utils/constants";

const MoviePoster = ({ posterPath }) => {
  return (
    <img
      className="h-full w-full rounded-md object-cover shadow-lg transition-all duration-200 hover:cursor-pointer hover:shadow-2xl hover:shadow-black/70"
      src={IMG_CDN_URL + posterPath}
      alt="moviecard"
    />
  );
};

export default MoviePoster;
