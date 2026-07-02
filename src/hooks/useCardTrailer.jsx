import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setCardTrailer } from "../store/slices/movieSlice";

const useCardTrailer = (movieId) => {
  const dispatch = useDispatch();
  const trailer = useSelector((state) => state.movie.cardTrailer[movieId]);
  const getMovieTrailer = async () => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos`,
        API_OPTIONS,
      );

      const json = await data.json();
      console.log(json.results);

      const trailors = json.results.filter((video) => video.type === "Trailer");
      const trailer = trailors[0];
      console.log("card trailer", trailer);
      dispatch(setCardTrailer({ movieId, trailer: trailer || null }));
    } catch (error) {
      console.log("Error getting trailer: ", error);
    }
  };

  useEffect(() => {
    if (!movieId) return;
    if (trailer) return;
    getMovieTrailer();
  }, [movieId, trailer]);
};

export default useCardTrailer;
