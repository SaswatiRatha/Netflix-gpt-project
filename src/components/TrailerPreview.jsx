import ActionItems from "./ActionItems";
import MoviePoster from "./MoviePoster";

const TrailerPreview = ({
  title,
  posterPath,
  trailer,
  isActive,
  index,
  totalMovies,
  movie,
}) => {
  const previewPosition =
    index === 0
      ? "left-0"
      : index === totalMovies - 1
        ? "right-0"
        : "left-1/2 -translate-x-1/2";

  const shouldShowTrailer = isActive && Boolean(trailer);

  return (
    <div
      className={`absolute top-1/2 ${previewPosition}
        w-104 max-w-[90vw] overflow-hidden rounded-3xl border border-gray-500 bg-zinc-900 shadow-[0_20px_60px_rgba(0,0,0,0.8)]
        transition-all duration-300 ease-out
        ${
          isActive
            ? "pointer-events-auto mt-4 scale-100 translate-y-[-50%] opacity-100 ring-2 ring-gray/90"
            : "pointer-events-none scale-90 translate-y-[-40%] opacity-0"
        }`}
    >
      <div className="aspect-video bg-black">
        {shouldShowTrailer ? (
          <>
            <iframe
              key={trailer.key}
              className="h-full w-full pointer-events-none"
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&playsinline=1&controls=0&disablekb=1&modestbranding=1&rel=0&iv_load_policy=3&fs=0&showinfo=0`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <p className="absolute -mt-14 h-13 w-full bg-linear-30 from-black px-2 pt-2 text-3xl font-bold text-white">
              {title}
            </p>
          </>
        ) : (
          isActive && (
            <>
              <MoviePoster posterPath={posterPath} />
              <p className="absolute -mt-8 h-18 w-full bg-linear-30 from-black px-2 pt-2 text-2xl font-bold text-white">
                {title}
              </p>
            </>
          )
        )}
      </div>
      <ActionItems movie={movie} />
    </div>
  );
};

export default TrailerPreview;
