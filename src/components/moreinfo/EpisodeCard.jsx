import { IMG_CDN_URL } from "../../utils/constants";

const EpisodeCard = ({ number, episode }) => {
  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <>
      <div className="flex flex-col items-start gap-3 py-4 sm:flex-row sm:gap-4">
        <div className="hidden w-8 pt-8 text-center text-2xl font-semibold text-gray-400 sm:block">
          {number}
        </div>
        <img
          className="h-40 w-full shrink-0 rounded-md object-cover sm:h-28 sm:w-48"
          src={IMG_CDN_URL + episode.still_path}
          alt="episodecard"
        />
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-semibold text-lg text-white">
              <span className="mr-2 text-gray-400 sm:hidden">{number}.</span>
              {episode.name}
            </h2>
            <span className="shrink-0 text-sm text-gray-400">
              {formatRuntime(episode.runtime)}
            </span>
          </div>
          <p className="text-sm leading-6 text-gray-300 line-clamp-3">
            {episode.overview}
          </p>
        </div>
      </div>
      <div className="border-b border-gray-700"></div>
    </>
  );
};

export default EpisodeCard;
