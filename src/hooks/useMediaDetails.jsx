import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { setMediaDetails } from "../store/slices/modalSlice";

const useMediaDetails = (mediaId, type = "movie") => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!mediaId) return;

    const getDetails = async () => {
      try {
        const ratingsField =
          type === "movie" ? "release_dates" : "content_ratings";
        const res = await fetch(
          `https://api.themoviedb.org/3/${type}/${mediaId}?language=en-US&append_to_response=credits,recommendations,${ratingsField}`,
          API_OPTIONS,
        );
        const json = await res.json();

        const casts = json.credits.cast
          .filter((item) => item.known_for_department === "Acting")
          .map((item) => item.name);
        const genre = json.genres.map((item) => item.name);
        const similarShows = json.recommendations.results;
        const certificateData = json[ratingsField].results.find(
          (cert) => cert.iso_3166_1 === "IN",
        );
        const certificate =
          type === "movie"
            ? certificateData?.release_dates.find(
                (release) => release.certification,
              )?.certification || "NR"
            : certificateData?.rating || "NR";
        const seasons = type === "tv" ? json.number_of_seasons : undefined;

        dispatch(
          setMediaDetails({ casts, genre, similarShows, certificate, seasons }),
        );
      } catch (error) {
        console.log("Error fetching media details: ", error);
      }
    };
    getDetails();
  }, [mediaId, type, dispatch]);
};

export default useMediaDetails;
