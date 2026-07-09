import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setMovieTrailer } from "../store/slices/mediaSlice";

const useMovieTrailer = (movieId, type = "movie") => {
  const dispatch = useDispatch();
  const trailerKey = `${type}:${movieId}`;
  const trailer = useSelector((state) => state.media.trailersById[trailerKey]);
  //console.log(trailerKey);

  const getMovieTrailer = async () => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/${type}/${movieId}/videos`,
        API_OPTIONS,
      );

      const json = await data.json();
      //console.log(json.results);

      const nextTrailer =
        json.results.find((video) => video.type === "Trailer") ??
        json.results[0] ??
        null;

      dispatch(setMovieTrailer({ movieId: trailerKey, trailer: nextTrailer }));
    } catch (error) {
      console.log("Error getting trailer: ", error);
    }
  };

  useEffect(() => {
    if (!movieId || trailer !== undefined) return;
    getMovieTrailer();
  }, [movieId, trailer, type]);
};

export default useMovieTrailer;
