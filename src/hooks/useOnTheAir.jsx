import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { setOnTheAir } from "../store/slices/movieSlice";
const useOnTheAir = () => {
  const dispatch = useDispatch();
  const getOnTheAir = async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=4",
        API_OPTIONS,
      );

      const json = await data.json();
      //console.log(json.results);
      dispatch(setOnTheAir(json.results));
    } catch (error) {
      console.log("Error fetching top rated movies: ", error);
    }
  };

  useEffect(() => {
    getOnTheAir();
  }, []);
};

export default useOnTheAir;
