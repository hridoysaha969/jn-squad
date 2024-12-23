import { cn } from "@/lib/utils";
import {
  ArrowLeftIcon,
  BookOpen,
  Home,
  LogOut,
  Moon,
  Settings,
  ShieldQuestion,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Menus = ({ user, setShowMenu }) => {
  const [selectedMenu, setSelectedMenu] = useState("");
  return (
    <div className="md:absolute md:mt-2 fixed top-0 right-0 w-full h-full md:w-1/4 md:h-fit md:right-3 md:top-[100%] bg-white dark:bg-gray-900 shadow-md py-3 px-4 rounded-md z-50">
      <button
        className="md:hidden py-3 mb-4 flex items-center gap-1 text-[20px] font-semibold"
        onClick={() => setShowMenu((prevState) => !prevState)}
      >
        <ArrowLeftIcon className="w-4 h-4" />
        Back
      </button>

      <div className="p-3 dark:bg-gray-700 shadow-md flex items-center gap-4 rounded-md mb-4 font-semibold">
        {user ? (
          <Link href="/">
            <Image
              src="/logo.png"
              width={45}
              height={45}
              alt="user"
              className="rounded-full"
            />
          </Link>
        ) : (
          <button className="bg-gray-600 h-12 w-12 rounded-full flex items-center justify-center text-xl font-semibold text-gray-200">
            JN
          </button>
        )}
        Hridoy Saha
      </div>

      <ul
        className={cn(
          "grid grid-cols-2 md:grid-cols-1 gap-4 transition-all ease-in-out",
          {
            "h-0": selectedMenu !== "",
            "overflow-hidden": selectedMenu !== "",
          }
        )}
      >
        <li className="text-gray-700 text-sm dark:text-gray-300 bg-gray-700 md:bg-white flex flex-col md:flex-row gap-2 md:items-center py-2 px-4 md:p-0 rounded-md select-none font-semibold md:hidden">
          <Home className="w-5 h-5 text-violet-500" /> Home
        </li>
        <li className="text-gray-700 text-sm dark:text-gray-300 bg-gray-700 md:bg-white flex flex-col md:flex-row gap-2 md:items-center py-2 px-4 md:p-0 rounded-md select-none font-semibold md:hidden">
          <ShieldQuestion className="w-5 h-5 text-violet-500" /> About Batch 16
        </li>
        <li className="text-gray-700 text-sm dark:text-gray-300 bg-gray-700 md:bg-white flex flex-col md:flex-row gap-2 md:items-center py-2 px-4 md:p-0 rounded-md select-none font-semibold md:hidden">
          <BookOpen className="w-5 h-5 text-violet-500" /> About BJNHS
        </li>

        <li className="text-gray-700 text-sm dark:text-gray-300 bg-gray-700 md:bg-white flex flex-col md:flex-row gap-2 md:items-center py-2 px-4 md:p-0 rounded-md select-none font-semibold">
          <Settings className="w-5 h-5 text-violet-500" /> Settings
        </li>
        <li
          className="text-gray-700 text-sm dark:text-gray-300 bg-gray-700 md:bg-white flex flex-col md:flex-row gap-2 md:items-center py-2 px-4 md:p-0 rounded-md select-none font-semibold"
          onClick={() => setSelectedMenu("darkMood")}
        >
          <Moon className="w-5 h-5 text-violet-500" /> Dark Mood
        </li>
        <li className="text-gray-700 text-sm dark:text-gray-300 bg-gray-700 md:bg-white flex flex-row gap-2 md:items-center py-4 px-4 md:p-0 rounded-md select-none font-semibold col-span-2 md:col-span-1 mt-4 md:mt-0">
          <LogOut className="w-5 h-5 text-violet-500" /> Logout
        </li>
      </ul>

      {selectedMenu === "darkMood" && (
        <div>
          <div className="flex gap-3 justify-start items-start">
            <div className=" bg-gray-600 h-8 w-8 flex items-center justify-center rounded-full">
              <Moon className="w-4 h-4" />
            </div>{" "}
            <div className="w-[80%]">
              <h2>Dark Mood</h2>{" "}
              <p className="text-sm text-gray-400">
                Adjust the appearance of Facebook to reduce glare and give your
                eyes a break.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menus;
