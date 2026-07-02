const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute inset-x-0 top-0 aspect-video w-screen bg-linear-to-r from-black px-2 pt-[16%] text-white sm:px-8 md:px-12 lg:px-24">
      <div className="max-w-[90vw] sm:max-w-[70vw] lg:max-w-[45vw]">
        <h1 className="text-lg font-bold leading-tight sm:text-3xl md:text-4xl lg:text-5xl">
          {title}
        </h1>
        <p className="max-w-full py-2 text-[10px] leading-snug sm:py-4 sm:text-sm md:text-base lg:text-lg">
          {overview}
        </p>
        <div className="mt-2 flex flex-wrap gap-2 sm:gap-4">
          <button className="w-20 rounded-sm bg-white px-2 py-1 text-[10px] text-black transition-all duration-150 hover:bg-gray-200 sm:w-24 sm:px-4 sm:py-2 sm:text-sm lg:text-lg">
            <span className="mr-1 inline-block rotate-90 text-black">
              &#x25B2;
            </span>{" "}
            Play
          </button>
          <button className="w-24 rounded-sm bg-gray-600 px-2 py-1 text-[10px] font-bold text-white opacity-80 transition-all duration-150 hover:bg-gray-700 sm:w-36 sm:px-4 sm:py-2 sm:text-sm lg:text-lg">
            &#9432; More info
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoTitle;
