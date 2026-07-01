import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { setMovieTrailer } from "../store/slices/movieSlice";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  const getMovieTrailer = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos`,
      API_OPTIONS,
    );

    const json = await data.json();
    //console.log(json.results);

    const trailors = json.results.filter((video) => video.type === "Trailer");
    const trailer = trailors[0];
    //console.log(getTrailor);
    dispatch(setMovieTrailer(trailer));
  };

  useEffect(() => {
    if (!movieId) return;
    getMovieTrailer();
  }, [movieId]);
};

export default useMovieTrailer;
