import { useRef } from "react";
import useSearchMedia from "../../hooks/useSearchMedia";

const MobileSearchInput = () => {
  const inputRef = useRef(null);
  const { searchWord, handleInputChange } = useSearchMedia();

  return (
    <div className="relative z-30 mx-4 pt-20 sm:hidden">
      <input
        ref={inputRef}
        autoFocus
        value={searchWord}
        onChange={handleInputChange}
        placeholder="What do you want to watch?"
        className="w-full rounded border border-gray-500 bg-black/80 p-3 text-base text-white outline-none"
      />
    </div>
  );
};

export default MobileSearchInput;
