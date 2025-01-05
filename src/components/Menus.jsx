import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import {
  ArrowLeftIcon,
  BookOpen,
  Home,
  LogOut,
  Moon,
  Newspaper,
  Settings,
  ShieldQuestion,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Sponsored from "./Sponsored";

const Menus = ({ user, setShowMenu, isDark, setIsDark }) => {
  // const [isDark, setIsDark] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("");
  const { logOut } = useAuth();
  const router = useRouter();

  const handleChange = (e) => {
    const root = document.documentElement;
    const selectedTheme = e.target.value;
    const isDarkMood = selectedTheme === "dark";

    setIsDark(isDarkMood);
    root.classList.toggle("dark", !isDark);
    localStorage.setItem("theme", selectedTheme);
  };
  const handleLogOut = async () => {
    await logOut();
    router.push("/sign-in");
  };

  return (
    <div className="md:absolute md:mt-2 fixed top-0 right-0 w-full h-full md:w-1/2 lg:w-1/4 md:h-fit md:right-3 md:top-[100%] bg-white dark:bg-gray-900 shadow-md py-3 px-4 rounded-md z-50">
      <button
        className="md:hidden py-3 mb-4 flex items-center gap-1 text-[20px] font-semibold"
        onClick={() => setShowMenu((prevState) => !prevState)}
      >
        <ArrowLeftIcon className="w-4 h-4" />
        Back
      </button>

      <Link
        href={`/profile/${user?.uid}`}
        className="p-3 dark:bg-gray-700 capitalize shadow-md flex items-center gap-4 rounded-md mb-4 font-semibold"
        onClick={() => setShowMenu((prevState) => !prevState)}
      >
        {user?.photoURL ? (
          <Image
            src={user?.photoURL}
            width={45}
            height={45}
            alt="user"
            loading="lazy"
            className="rounded-full"
          />
        ) : (
          <button className="bg-gray-600 h-12 w-12 rounded-full flex items-center justify-center text-xl font-semibold text-gray-200">
            {user?.displayName.charAt(0).toUpperCase()}
          </button>
        )}
        {user?.displayName}
      </Link>

      <div className="my-3 shadow-md pb-3 px-2 sm:hidden">
        <h2 className="text-xs border-b border-gray-400 pb-2 font-semibold text-gray-600 dark:text-gray-300 uppercase mb-2">
          <span>Sponsored</span>
        </h2>
        <Sponsored />
      </div>

      <ul
        className={cn(
          "grid grid-cols-2 md:grid-cols-1 gap-4 transition-all ease-in-out pb-4",
          {
            "h-0": selectedMenu !== "",
            "pb-0": selectedMenu !== "",
            "overflow-hidden": selectedMenu !== "",
          }
        )}
      >
        <li
          className="text-gray-700 text-sm dark:text-gray-300 dark:bg-gray-700 bg-white shadow-md md:shadow-none md:bg-white dark:md:bg-transparent cursor-pointer flex flex-col md:flex-row gap-2 md:items-center py-2 px-4 md:p-0 rounded-md select-none font-semibold"
          onClick={() => setShowMenu((prevState) => !prevState)}
        >
          <Link
            href="/"
            className="flex md:items-center gap-2 flex-col md:flex-row"
          >
            <Newspaper className="w-5 h-5 text-violet-500" /> Event Feed
          </Link>
        </li>
        <li className="text-gray-700 text-sm dark:text-gray-300 dark:bg-gray-700 bg-white shadow-md md:shadow-none md:bg-white dark:md:bg-transparent cursor-pointer flex flex-col md:flex-row gap-2 md:items-center py-2 px-4 md:p-0 rounded-md select-none font-semibold md:hidden">
          <ShieldQuestion className="w-5 h-5 text-violet-500" /> About Batch 16
        </li>
        <li className="text-gray-700 text-sm dark:text-gray-300 dark:bg-gray-700 bg-white shadow-md md:shadow-none md:bg-white dark:md:bg-transparent cursor-pointer flex flex-col md:flex-row gap-2 md:items-center py-2 px-4 md:p-0 rounded-md select-none font-semibold md:hidden">
          <BookOpen className="w-5 h-5 text-violet-500" /> About BJNHS
        </li>

        <li className="text-gray-700 text-sm dark:text-gray-300 dark:bg-gray-700 bg-white shadow-md md:shadow-none md:bg-white dark:md:bg-transparent cursor-pointer flex flex-col md:flex-row gap-2 md:items-center py-2 px-4 md:p-0 rounded-md select-none font-semibold">
          <Settings className="w-5 h-5 text-violet-500" /> Settings
        </li>
        <li
          className="text-gray-700 text-sm dark:text-gray-300 dark:bg-gray-700 bg-white shadow-md md:shadow-none md:bg-white dark:md:bg-transparent cursor-pointer flex flex-col md:flex-row gap-2 md:items-center py-2 px-4 md:p-0 rounded-md select-none font-semibold"
          onClick={() => setSelectedMenu("darkMood")}
        >
          <Moon className="w-5 h-5 text-violet-500" /> Dark Mood
        </li>
        <li
          className="text-gray-700 text-sm dark:text-gray-300 dark:bg-gray-700 bg-white shadow-md md:shadow-none md:bg-white dark:md:bg-transparent cursor-pointer flex flex-row gap-2 md:items-center py-4 px-4 md:p-0 rounded-md select-none font-semibold col-span-2 md:col-span-1 mt-4 md:mt-0"
          onClick={handleLogOut}
        >
          <LogOut className="w-5 h-5 text-violet-500" /> Logout
        </li>
      </ul>

      {selectedMenu === "darkMood" && (
        <div className="h-full">
          <button
            className="hidden py-3 mb-1 md:flex items-center gap-1 text-sm font-semibold"
            onClick={() => setSelectedMenu("")}
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back
          </button>
          <div className="flex gap-3 justify-start items-start">
            <div className=" dark:bg-gray-700 dark:text-gray-300 bg-gray-300 text-gray-800 h-8 w-8 flex items-center justify-center rounded-full">
              <Moon className="w-4 h-4" />
            </div>{" "}
            <div className="w-[80%]">
              <h2>Dark Mood</h2>{" "}
              <p className="text-sm text-gray-400">
                Adjust the appearance of JN Squad to reduce glare and give your
                eyes a break.
              </p>
              <div className="mt-6 py-2 px-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                <label className="flex items-center select-none justify-between ms-2 text-sm font-semibold text-gray-900 dark:text-gray-300">
                  Off
                  <input
                    checked={!isDark}
                    type="radio"
                    value="light"
                    name="theme"
                    className="w-4 h-4 outline-none text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="mt-2 mb-4 py-2 px-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                <label className="flex items-center select-none justify-between ms-2 text-sm font-semibold text-gray-900 dark:text-gray-300">
                  On
                  <input
                    checked={isDark}
                    type="radio"
                    value="dark"
                    name="theme"
                    className="w-4 h- outline-none text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menus;
