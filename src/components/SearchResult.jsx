import { cn } from "@/lib/utils";
import { Loader2Icon, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const SearchResult = ({ mobile, setIsFocused }) => {
  const [searchResult, setSearchResult] = useState([]);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTyping = () => {
    setLoading(true);

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    setTypingTimeout(timeout);
  };
  return (
    <div
      className={cn(
        "bg-white shadow-md mt-2 p-3 dark:bg-gray-700 absolute top-full left-0 w-full h-[70vh] z-50",
        {
          "fixed top-0 left-0 w-full h-screen overflow-hidden": mobile,
        }
      )}
    >
      {mobile && (
        <div className="py-1 w-full mb-2 px-4 border-gray-300 border flex items-center gap-1 rounded-full md:bg-white dark:bg-gray-600 bg-none relative">
          <input
            type="text"
            placeholder="search..."
            className="block w-full outline-none placeholder:text-gray-400 dark:placeholder:text-gray-200 text-gray-600 dark:bg-gray-600 dark:text-gray-200"
            onChange={handleTyping}
            // onChange={handleChange}
            // value={searchValue}
            // onFocus={() => setIsFocused(true)}
            // onBlur={() => setIsFocused(false)}
          />
          <button
            className="h-5 w-5 bg-gray-300 dark:bg-gray-800 rounded-full flex items-center justify-center"
            onClick={() => {
              setIsFocused(false);
              document.body.style.overflow = "";
            }}
          >
            <X className="w-4 h-4 font-bold" />
          </button>
        </div>
      )}
      <h3 className="text-sm font-semibold">Search Result</h3>

      <div className="flex flex-col gap-1 items-start mt-3">
        {loading && (
          <div className="flex items-center justify-center gap-2 py-3">
            Loading{" "}
            <Loader2Icon className="w-4 h-4 text-blue-400 animate-spin" />
          </div>
        )}
        {searchResult && searchResult?.length > 0 ? (
          <Link href="/post/" className="text-sm py-2 px-3 hover:bg-gray-200">
            A Glimpse into My High School: Balakhal J.N. High School
          </Link>
        ) : (
          !loading && (
            <div className="text-sm w-full flex items-center justify-center py-3">
              No event found.
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default SearchResult;
