import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { setTopRatedTV } from "../store/slices/movieSlice";
const useTopRatedTv = () => {
  const dispatch = useDispatch();
  const getTopRatedTv = async () => {
    try {
      const data = await fetch(
        "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1",
        API_OPTIONS,
      );

      const json = await data.json();
      //console.log(json.results);
      const tv = json.results.map((tv) => ({
        ...tv,
        media_type: "tv",
      }));
      dispatch(setTopRatedTV(tv));
    } catch (error) {
      console.log("Error fetching top rated movies: ", error);
    }
  };

  useEffect(() => {
    getTopRatedTv();
  }, []);
};

export default useTopRatedTv;
