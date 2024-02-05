import React, { useState, useCallback } from "react";
import { debounce } from "lodash";

interface SearchBarProps {
  handleSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ handleSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearchDebounced = useCallback(
    debounce((value: string) => {
      handleSearch(value);
    }, 300),
    []
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setQuery(value);
    handleSearchDebounced(value);
  };

  // Cleanup the debounced function when the component unmounts
  React.useEffect(() => {
    return () => {
      handleSearchDebounced.cancel();
    };
  }, [handleSearchDebounced]);

  return (
    <div className="flex justify-center items-center m-8">
      <input
        className="border border-gray-300 p-4 px-20 rounded-md w-full md:w-3/5 text-center text-lg"
        type="text"
        placeholder="Search Wikipedia"
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBar;
