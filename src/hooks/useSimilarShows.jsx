import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { setSimilarShows } from "../store/slices/movieSlice";

const useSimilarShows = (movieId, type = "movie") => {
  const dispatch = useDispatch();

  const getSimilar = async () => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/${type}/${movieId}/recommendations?language=en-US&page=1`,
        API_OPTIONS,
      );

      const json = await data.json();
      console.log("similar shows: ", json.results);

      dispatch(setSimilarShows(json.results));
    } catch (error) {
      console.log("Error getting similar shows: ", error);
    }
  };

  useEffect(() => {
    if (!movieId) return;
    getSimilar();
  }, [movieId]);
};

export default useSimilarShows;
