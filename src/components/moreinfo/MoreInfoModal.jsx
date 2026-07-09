import { useDispatch, useSelector } from "react-redux";
import VideoBackground from "../media/VideoBackground";
import { closeModal } from "../../store/slices/modalSlice";
import useMovieCast from "../../hooks/useMovieCasts";
import useMovieGenre from "../../hooks/useMovieGenre";
import useSimilarShows from "../../hooks/useSimilarShows";
import { createPortal } from "react-dom";
import useLockBodyScroll from "../../hooks/useLockBodyScroll";
import useCertificate from "../../hooks/useCertificate";
import useSeriesDetails from "../../hooks/useSeriesDetails";
import EpisodeCard from "./EpisodeCard";
import useEpisodes from "../../hooks/useEpisodes";
import SeasonDropdown from "./SeasonDropdown";
import MediaDetails from "./MediaDetails";
import SimilarMediaCards from "./SimilarMediaCards";

const MoreInfoModal = () => {
  const {
    selectedMedia,

    similarShows,
    seasons,
    episodes,
  } = useSelector((state) => state.modal);

  console.log(selectedMedia);

  const dispatch = useDispatch();
  useLockBodyScroll();
  useMovieCast(selectedMedia.id, selectedMedia.media_type);
  useMovieGenre(selectedMedia.id, selectedMedia.media_type);
  useSimilarShows(selectedMedia.id, selectedMedia.media_type);
  useCertificate(selectedMedia.id, selectedMedia.media_type);
  useSeriesDetails(selectedMedia.id, selectedMedia.media_type);
  useEpisodes(selectedMedia.id, selectedMedia.media_type);

  if (!similarShows || !selectedMedia) return;

  if (selectedMedia.media_type === "tv") {
    if (!episodes || !seasons) return;
  }

  //console.log(selectedMedia);
  return createPortal(
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 p-4 sm:p-6">
      <div className="relative mx-auto mt-5 w-full max-w-[95vw] rounded-xl bg-black shadow-2xl sm:w-[70vw] sm:max-w-5xl">
        <button
          onClick={() => dispatch(closeModal())}
          className="absolute top-4 right-4 bg-gray-600 rounded-full px-4 py-2 text-white transition-all duration-300 hover:bg-gray-700"
        >
          X
        </button>
        <div className="w-full rounded-lg overflow-hidden">
          <VideoBackground
            movieId={selectedMedia.id}
            type={selectedMedia.media_type}
          />
        </div>

        <MediaDetails />

        {selectedMedia.media_type === "tv" && (
          <div className="mx-4 my-2 p-4 ">
            <div className="flex justify-between items-center">
              <h1 className="font-bold text-2xl">Episodes</h1>
              {seasons > 1 && <SeasonDropdown />}
            </div>
            <div className="mt-3 space-y-2">
              {episodes.map((episode, index) => (
                <EpisodeCard
                  key={episode.id || index}
                  number={index + 1}
                  episode={episode}
                />
              ))}
            </div>
          </div>
        )}
        <SimilarMediaCards />
      </div>
    </div>,
    document.getElementById("modal-root"),
  );
};

export default MoreInfoModal;
