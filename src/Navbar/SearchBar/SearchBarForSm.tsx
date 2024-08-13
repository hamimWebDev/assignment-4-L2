const SearchBarForSm = () => {
  return (
    <div className="flex items-center border border-gray-300 rounded-xl w-full sm:w-[80%] md:w-[60%] lg:w-[50%]">
      <input
        type="text"
        placeholder="Search"
        className="px-2 py-1 sm:px-3 sm:py-2 w-full focus:outline-none text-black bg-gray-100 rounded-l-xl"
      />
      <div className="flex items-center relative border-l-2 border-gray-300">
        <button className="px-2 sm:px-3 bg-green-500 h-8 sm:h-9 md:h-10 flex items-center justify-center rounded-r-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 sm:h-5 md:h-6 w-4 sm:w-5 md:w-6 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SearchBarForSm;
