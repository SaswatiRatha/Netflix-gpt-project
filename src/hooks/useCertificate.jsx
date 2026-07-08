import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { setCertificate } from "../store/slices/movieSlice";

const useCertificate = (movieId, type = "movie") => {
  const dispatch = useDispatch();
  const getCertificate = async () => {
    const url =
      type === "movie"
        ? `https://api.themoviedb.org/3/movie/${movieId}/release_dates`
        : `https://api.themoviedb.org/3/tv/${movieId}/content_ratings`;
    try {
      const data = await fetch(url, API_OPTIONS);

      const json = await data.json();
      //console.log(json.results);
      const certificateData = json.results.find(
        (cert) => cert.iso_3166_1 === "IN",
      );
      const certificate =
        type === "movie"
          ? certificateData?.release_dates.find(
              (release) => release.certification,
            )?.certification || "NR"
          : certificateData?.rating || "NR";
      //console.log(certificate);
      dispatch(setCertificate(certificate));
    } catch (error) {
      console.log("Error fetching certificate: ", error);
    }
  };
  useEffect(() => {
    if (!movieId) return;
    getCertificate();
  }, [movieId]);
};
export default useCertificate;
