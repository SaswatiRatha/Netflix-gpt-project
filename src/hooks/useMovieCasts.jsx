import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { setMovieCasts } from "../store/slices/movieSlice";

const useMovieCast = (movieId, type = "movie") => {
  const dispatch = useDispatch();
  const getCasts = async () => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/${type}/${movieId}/credits?language=en-US`,
        API_OPTIONS,
      );
      const json = await data.json();
      console.log(json);

      const cast = json.cast.filter(
        (item) => item.known_for_department === "Acting",
      );
      const castNames = cast.map((cast) => cast.name);
      //console.log(castNames);
      dispatch(setMovieCasts(castNames));
    } catch (error) {
      console.log("Error fetching cast: ", error);
      return [];
    }
  };

  useEffect(() => {
    if (!movieId) return;
    //console.log("movieId", movieId);

    getCasts();
  }, [movieId]);
};

export default useMovieCast;
