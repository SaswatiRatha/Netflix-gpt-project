import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { setGenre } from "../store/slices/modalSlice";

const useMovieGenre = (movieId, type = "movie") => {
  const dispatch = useDispatch();
  const getGenre = async () => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/${type}/${movieId}?language=en-US`,
        API_OPTIONS,
      );
      const json = await data.json();
      //console.log(json);

      const genre = json.genres.map((item) => item.name);

      //console.log(genre);
      dispatch(setGenre(genre));
    } catch (error) {
      console.log("Error fetching genre: ", error);
      return [];
    }
  };

  useEffect(() => {
    if (!movieId) return;
    //console.log("movieId", movieId);

    getGenre();
  }, [movieId]);
};

export default useMovieGenre;
