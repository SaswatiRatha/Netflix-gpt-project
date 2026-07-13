import { useRef } from "react";
import useSearchMedia from "../../hooks/useSearchMedia";
import { useNavigate } from "react-router-dom";

const MobileSearchInput = () => {
  const inputRef = useRef(null);
  const { searchWord, handleInputChange } = useSearchMedia();
  const navigate = useNavigate();

  return (
    <div className="relative z-30 mx-4 pt-1 sm:hidden">
      <input
        ref={inputRef}
        autoFocus
        value={searchWord}
        onChange={handleInputChange}
        placeholder="What do you want to watch?"
        className="relative w-full rounded border border-gray-500 bg-black/80 p-3 text-base text-white outline-none"
      />
      <button
        onClick={() => navigate("/browse")}
        className="absolute right-5 top-6 -translate-y-1/2 col-span-1 items-center justify-center text-white inline-block text-2xl hover:scale-110 transition-transform duration-200 md:col-span-1"
      >
        x
      </button>
    </div>
  );
};

export default MobileSearchInput;
