import { useCallback, useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setCardTrailer } from "../store/slices/movieSlice";

const useCardTrailer = (movieId, type = "movie") => {
  const dispatch = useDispatch();
  const trailerKey = `${type}:${movieId}`;
  const trailer = useSelector((state) => state.movie.trailersById[trailerKey]);

  const getMovieTrailer = useCallback(async () => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/${type}/${movieId}/videos`,
        API_OPTIONS,
      );

      const json = await data.json();
      const trailers = json.results.filter((video) => video.type === "Trailer");
      const nextTrailer = trailers[0] || null;
      dispatch(setCardTrailer({ movieId: trailerKey, trailer: nextTrailer }));
    } catch (error) {
      console.log("Error getting trailer: ", error);
    }
  }, [dispatch, movieId, trailerKey, type]);

  useEffect(() => {
    if (!movieId || trailer !== undefined) return;
    getMovieTrailer();
  }, [getMovieTrailer, movieId, trailer]);
};

export default useCardTrailer;
