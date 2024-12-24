"use client";

import { cn } from "@/lib/utils";
import {
  BookOpen,
  ChevronDown,
  Contact,
  Home,
  Plus,
  Shield,
  ShieldQuestion,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Post from "./Post";

export default function ResponsiveLayout() {
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <div className="flex flex-col min-h-screen select-none">
      {/* Main Container */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar (Responsive Drawer with Scroll) */}
        <aside
          className={cn(
            "fixed inset-y-0 w-1/4 left-0 z-40 transform transition-transform md:static md:translate-x-0",
            isLeftSidebarOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="flex flex-col h-full overflow-y-auto sidebar-scrollbar p-4">
            <ul className="space-y-4">
              <li className="text-gray-700 text-sm dark:text-gray-300 flex gap-2 items-center">
                <Home className="w-4 h-4 md:h-6 md:w-6 text-violet-500" /> Home
              </li>
              <li className="text-gray-700 text-sm dark:text-gray-300 flex gap-2 items-center">
                <ShieldQuestion className="w-4 h-4 md:h-6 md:w-6 text-violet-500" />{" "}
                About Batch 16
              </li>
              <li className="text-gray-700 text-sm dark:text-gray-300 flex gap-2 items-center">
                <BookOpen className="w-4 h-4 md:h-6 md:w-6 text-violet-500" />{" "}
                About BJNHS
              </li>
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <section className="flex-1 md:p-6 px-2 py-3 w-1/2">
          <div className="h-full">
            <div className="bg-white shadow-md dark:bg-gray-800 rounded-md py-3 px-4 flex gap-3 items-center">
              {user ? (
                <Image src="/logo.png" width={35} height={35} alt="user" />
              ) : (
                <span className="dark:bg-gray-700 bg-gray-300 relative h-12 w-12 rounded-full flex items-center justify-center text-xl font-semibold dark:text-gray-200 text-gray-700">
                  JN
                </span>
              )}
              <button className="flex-1 capitalize bg-violet-600 flex items-center justify-center gap-1 py-2 px-4 rounded-full text-white">
                <Plus className="w-5 h-5" /> create event
              </button>
            </div>

            <div className="flex flex-col gap-2 md:gap-4 mt-4">
              <Post />
              <Post />
              <Post />
            </div>
            <p className="text-gray-500 text-sm dark:text-gray-400 mt-4 text-center">
              No more content
            </p>
          </div>
        </section>

        {/* Right Sidebar (Responsive Drawer with Scroll) */}
        <aside className="fixed inset-y-0 w-1/4 right-0 z-40 transform transition-transform lg:static lg:translate-x-0 hidden lg:block">
          <div className="flex flex-col h-full overflow-y-auto sidebar-scrollbar p-4">
            <h2 className="text-sm border-b border-gray-400 pb-2 font-semibold text-gray-600 dark:text-gray-300 uppercase mb-2">
              <span>Recent Posts</span>
            </h2>
            {user ? (
              <ul className="space-y-4">
                <li className="text-gray-700"></li>
              </ul>
            ) : (
              <div className="p-3 flex flex-col items-center">
                <Image
                  src="/empty.svg"
                  width={50}
                  height={50}
                  alt="Empty"
                  className="aspect-square w-full opacity-60"
                />
                <p className="text-gray-500 text-sm">No recent post</p>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
