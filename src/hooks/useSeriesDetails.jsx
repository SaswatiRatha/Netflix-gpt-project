import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { setTvDetails } from "../store/slices/movieSlice";

const useSeriesDetails = (seriesId) => {
  const dispatch = useDispatch();
  const getSeriesDetails = async () => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/tv/${seriesId}?language=en-US`,
        API_OPTIONS,
      );
      const json = await data.json();
      const seasons = json.number_of_seasons;
      dispatch(setTvDetails(seasons));
    } catch (error) {
      console.log("Error fetching season: ", error);
      return [];
    }
  };

  useEffect(() => {
    if (!seriesId) return;
    //console.log("movieId", movieId);

    getSeriesDetails();
  }, [seriesId]);
};

export default useSeriesDetails;
