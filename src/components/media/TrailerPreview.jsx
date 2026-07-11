import { IMG_CDN_URL } from "../../utils/constants";
import ActionItems from "../common/ActionItems";

const TrailerPreview = ({
  title,
  trailer,
  isActive,
  previewPosition,
  movie,
}) => {
  const previewClass =
    previewPosition === "left"
      ? "left-0 origin-left"
      : previewPosition === "right"
        ? "right-0 origin-right"
        : "left-1/2 -translate-x-1/2 origin-center";

  const shouldShowTrailer = isActive && Boolean(trailer);

  return (
    <div
      className={`absolute top-1/2 ${previewClass}
        w-[90vw] max-w-104 overflow-hidden rounded-3xl border border-gray-500 bg-zinc-900 shadow-[0_20px_60px_rgba(0,0,0,0.8)]
        transition-all duration-300 ease-out
        ${
          isActive
            ? "pointer-events-auto mt-4 scale-100 translate-y-[-50%] opacity-100 ring-2 ring-gray/90"
            : "pointer-events-none scale-90 translate-y-[-40%] opacity-0"
        }`}
    >
      <div className="relative aspect-video overflow-hidden bg-black">
        {shouldShowTrailer ? (
          <>
            <iframe
              className="absolute top-[-20%] left-0 h-[150%] inset-0 w-full pointer-events-none"
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&playsinline=1&controls=0&disablekb=1&modestbranding=1&rel=0&iv_load_policy=3&fs=0&showinfo=0`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <h2 className="absolute bottom-4 left-4 right-4 text-xl font-bold text-white drop-shadow-lg sm:text-2xl">
              {title}
            </h2>
          </>
        ) : (
          isActive && (
            <>
              <img
                className="aspect-video w-full object-cover"
                src={IMG_CDN_URL + movie.backdrop_path}
                alt=""
              />
              <h2 className="absolute bottom-4 left-4 right-4 text-xl font-bold text-white drop-shadow-lg sm:text-2xl">
                {title}
              </h2>
            </>
          )
        )}
      </div>
      <ActionItems movie={movie} />
    </div>
  );
};

export default TrailerPreview;
