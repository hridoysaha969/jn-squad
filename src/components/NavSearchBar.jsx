"use client";
import { Search } from "lucide-react";
import SearchResult from "./SearchResult";
import { useState } from "react";

const NavSearchBar = ({ isFocused, setIsFocused }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="py-1 w-1/3 px-4 border-gray-300 border hidden md:flex items-center gap-1 rounded-full md:bg-white dark:bg-gray-600 bg-none relative">
      <input
        type="text"
        placeholder="search..."
        className="hidden md:block w-full outline-none placeholder:text-gray-400 dark:placeholder:text-gray-200 text-gray-600 dark:bg-gray-600 dark:text-gray-200"
        onChange={handleChange}
        value={searchValue}
        onFocus={() => {
          setIsFocused(true);
          document.body.style.overflow = "hidden";
        }}
        onBlur={() => {
          setIsFocused(false);
          document.body.style.overflow = "";
        }}
      />
      <Search className="w-4 h-4 font-bold" />

      {isFocused && <SearchResult />}
    </div>
  );
};

export default NavSearchBar;
