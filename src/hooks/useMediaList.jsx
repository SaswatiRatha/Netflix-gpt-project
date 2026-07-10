import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";

const useMediaList = (endpoint, mediaType, actionCreator, skip = false) => {
  const dispatch = useDispatch();
  console.log(JSON.stringify(actionCreator));

  useEffect(() => {
    if (!endpoint || skip) return;
    const getMedia = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3${endpoint}`,
          API_OPTIONS,
        );
        const json = await res.json();
        const items = json.results.map((item) => ({
          ...item,
          media_type: mediaType,
        }));

        dispatch(actionCreator(items));
      } catch (error) {
        console.log(`Error fetching ${endpoint}: `, error);
      }
    };
    getMedia();
  }, [endpoint, mediaType, actionCreator, dispatch, skip]);
};

export default useMediaList;
