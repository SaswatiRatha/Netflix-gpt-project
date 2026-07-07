import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { setPopularTv } from "../store/slices/movieSlice";
const usePopularTV = () => {
  const dispatch = useDispatch();
  const getPopularTV = async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",
        API_OPTIONS,
      );

      const json = await data.json();
      //console.log(json.results);
      dispatch(setPopularTv(json.results));
    } catch (error) {
      console.log("Error fetching popular TV: ", error);
    }
  };

  useEffect(() => {
    getPopularTV();
  }, []);
};

export default usePopularTV;
