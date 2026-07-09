import { useState } from "react";
import { useSelector } from "react-redux";

const MediaDetails = () => {
  const [showAllCast, setShowAllCast] = useState(false);
  const {
    selectedMedia,
    casts,
    genre,

    certificate,
  } = useSelector((state) => state.modal);
  const selectedCast = showAllCast ? casts : casts.slice(0, 5);
  if (!selectedMedia || !casts || !genre || !certificate) return;
  return (
    <div className="mx-4 my-2 p-4 gap-4 grid grid-cols-1 sm:grid-cols-3">
      <div className="col-span-2 flex flex-col gap-3">
        <h1 className="font-bold text-2xl">
          {selectedMedia.title || selectedMedia.name}
        </h1>
        <p className="border-2 w-max px-4 py-1">{certificate}</p>
        <span>Rating: {Math.round(selectedMedia.vote_average)}/10</span>
        <p>{selectedMedia.overview}</p>
      </div>
      <div className="col-span-1 flex flex-col gap-3">
        <p className=" text-gray-500">
          Cast:{" "}
          <span className="text-white font-normal">
            {selectedCast.join(", ")}{" "}
            {casts.length > 5 && (
              <span
                className="italic"
                onClick={() => setShowAllCast(!showAllCast)}
              >
                , more
              </span>
            )}
          </span>
        </p>
        <p className=" text-gray-500">
          Genre:{" "}
          <span className="text-white font-normal">{genre.join(", ")} </span>
        </p>
      </div>
    </div>
  );
};

export default MediaDetails;
