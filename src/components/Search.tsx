import arrow from "@/assets/images/icon-arrow.svg";
import React, { useEffect, useState } from "react";

interface SearchProps {
  onSearch: (searchValue: string) => void;
  initialValue: string;
}

const Search: React.FC<SearchProps> = ({ onSearch, initialValue }) => {
  const [searchValue, setSearchValue] = useState<string>(initialValue);

  const handleSearch = () => {
    onSearch(searchValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  useEffect(() => {
    setSearchValue(initialValue);
  }, [initialValue]);

  return (
    <div className="relative lg:top-24 sm:top-24 md:top-24 w-full">
      <input
        type="search"
        className="w-full rounded-xl p-4 placeholder:font-rubik placeholder:text-label text-label focus:outline-none placeholder:text-secondary pr-12 box-border no-clear-button"
        placeholder="Search for any IP address or domain"
        style={{ height: "55px" }}
        value={searchValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <button
        className="absolute bg-black top-1/2 transform -translate-y-1/2 right-0 rounded-tr-xl rounded-br-xl cursor-pointer box-border"
        onClick={handleSearch}
        style={{ height: "55px", paddingLeft: "25px", paddingRight: "25px" }}
      >
        <img src={arrow} alt="Search" />
      </button>
    </div>
  );
};

export default Search;
