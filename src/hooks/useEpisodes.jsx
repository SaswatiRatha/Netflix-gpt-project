import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { setEpisodes } from "../store/slices/movieSlice";

const useEpisodes = (seriesId, type) => {
  const dispatch = useDispatch();
  const getEpisodes = async () => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/tv/${seriesId}/season/1?language=en-US`,
        API_OPTIONS,
      );
      const json = await data.json();
      console.log(json);

      dispatch(setEpisodes(json.episodes));
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };
  useEffect(() => {
    if (!seriesId || type === "movie") return;
    getEpisodes();
  }, [seriesId, type]);
};

export default useEpisodes;
