import { Search } from "lucide-react";

const NavSearchBar = () => {
  return (
    <div className="py-1 w-1/3 px-4 border-gray-300 border hidden md:flex items-center gap-1 rounded-full md:bg-white dark:bg-gray-600 bg-none relative">
      <input
        type="text"
        placeholder="search..."
        className="hidden md:block w-full outline-none placeholder:text-gray-400 dark:placeholder:text-gray-200 text-gray-600 dark:bg-gray-600 dark:text-gray-200"
      />
      <Search className="w-4 h-4 font-bold" />
    </div>
  );
};

export default NavSearchBar;
