const SearchBar = () => {
  return (
    <div className="grid grid-cols-12 gap-2">
      <input
        className="bg-white col-span-8 px-4 py-2 rounded-md"
        type="text"
        placeholder="What do you want to watch today?"
      />
      <button className="text-white inline-block rotate-280 text-3xl">⌕</button>
    </div>
  );
};

export default SearchBar;
