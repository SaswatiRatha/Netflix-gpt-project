import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setEpisodes } from "../store/slices/modalSlice";

const useEpisodes = (seriesId, type) => {
  const dispatch = useDispatch();
  const selectedSeason = useSelector((state) => state.modal.selectedSeason);

  const getEpisodes = async () => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/tv/${seriesId}/season/${selectedSeason}?language=en-US`,
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
  }, [seriesId, type, selectedSeason]);
};

export default useEpisodes;
