const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[20%] px-24 absolute bg-linear-to-r from-black text-white">
      <h1 className="text-5xl font-bold">{title}</h1>
      <p className="py-6 text-md w-2/4">{overview}</p>
      <button className="bg-white text-black px-4 py-2 w-24 text-xl rounded-sm transition-all duration-150 hover:bg-gray-200">
        <span className="inline-block text-black rotate-90">&#x25B2;</span> Play
      </button>
      <button className="bg-gray-600 opacity-80 ml-4 text-white px-4 py-2 w-40 text-xl font-bold rounded-sm transition-all duration-150 hover:bg-gray-700">
        &#9432; More info
      </button>
    </div>
  );
};

export default VideoTitle;
