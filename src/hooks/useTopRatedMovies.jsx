import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { setTopRatedMovies } from "../store/slices/movieSlice";
const useTopRatedMovies = () => {
  const dispatch = useDispatch();
  const getTopRatedMovies = async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=2",
        API_OPTIONS,
      );

      const json = await data.json();
      //console.log(json.results);
      const movies = json.results.map((movie) => ({
        ...movie,
        media_type: "movie",
      }));
      dispatch(setTopRatedMovies(movies));
    } catch (error) {
      console.log("Error fetching top rated movies: ", error);
    }
  };

  useEffect(() => {
    getTopRatedMovies();
  }, []);
};

export default useTopRatedMovies;
