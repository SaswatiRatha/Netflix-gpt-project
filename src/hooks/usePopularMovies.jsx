import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { setPopularMovies } from "../store/slices/movieSlice";
const usePopularMovies = () => {
  const dispatch = useDispatch();
  const getPopularMovies = async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=3",
        API_OPTIONS,
      );
      const json = await data.json();
      //console.log(json.results);
      dispatch(setPopularMovies(json.results));
    } catch (error) {
      console.log("Error fetching popular movies: ", error);
    }
  };

  useEffect(() => {
    getPopularMovies();
  }, []);
};

export default usePopularMovies;
