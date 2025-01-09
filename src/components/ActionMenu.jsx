"use client";
import { Bell, ChevronDown, Ellipsis, Menu, Search } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Menus from "./Menus";
import { useAuth } from "@/context/AuthContext";
import Notifications from "./Notifications";
import SearchResult from "./SearchResult";

const ActionMenu = ({ isFocused, setIsFocused }) => {
  const [isDark, setIsDark] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    const root = document.documentElement;
    const storedPreference = localStorage.getItem("theme");
    const isDarkPreferred =
      storedPreference === "dark" ||
      (!storedPreference &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);

    setIsDark(isDarkPreferred);
    root.classList.toggle("dark", isDarkPreferred);
  }, []);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    }
  }, []);

  const handleMenu = async () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className="flex items-center gap-2 md:gap-4">
      <button
        className="block md:hidden"
        onClick={() => {
          setIsFocused(true);
          document.body.style.overflow = "hidden";
        }}
      >
        <Search className="w-5 h-5 text-gray-900 dark:text-gray-300" />
      </button>

      {isFocused && isMobile && (
        <SearchResult mobile={true} setIsFocused={setIsFocused} />
      )}

      <Notifications />

      <button className="md:hidden" onClick={handleMenu}>
        <Menu className="w-8 h-8 ml-2 text-gray-900 dark:text-gray-300" />
      </button>

      <div className="hidden md:block">
        {currentUser?.photoURL ? (
          <button className="relative" onClick={handleMenu}>
            <Image
              src={currentUser.photoURL}
              width={45}
              height={45}
              alt="user"
              className="rounded-full"
            />
            <span className="absolute -bottom-[2px] right-0 h-4 w-4 rounded-full flex items-center justify-center border border-white bg-gray-200">
              <ChevronDown className="w-4 h-4 text-gray-900" />
            </span>
          </button>
        ) : (
          <button
            className="bg-gray-600 relative h-12 w-12 rounded-full flex items-center justify-center text-xl font-semibold text-gray-200"
            onClick={handleMenu}
          >
            {currentUser?.displayName?.charAt(0).toUpperCase()}
            <span className="absolute -bottom-[2px] right-0 h-4 w-4 rounded-full flex items-center justify-center border border-white bg-gray-200">
              <ChevronDown className="w-4 h-4 text-gray-900" />
            </span>
          </button>
        )}
      </div>

      {showMenu && (
        <Menus
          user={currentUser}
          setShowMenu={setShowMenu}
          isDark={isDark}
          setIsDark={setIsDark}
        />
      )}
    </div>
  );
};

export default ActionMenu;
