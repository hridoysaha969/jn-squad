"use client";
import { BookOpen, Home, ShieldQuestion } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import CreateEvent from "./CreateEvent";
import EventFeed from "./EventFeed";
import { fetchApprovedPosts } from "@/services/fetchApprovedPosts";
import RightSideBar from "./RightSideBar";

export default function ResponsiveLayout() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    setLoading(true);
    fetchApprovedPosts().then((posts) => {
      const sortedPosts = posts.sort((a, b) => b.timeStamp - a.timeStamp);
      setPosts(sortedPosts);
    });
    setLoading(false);
  }, []);

  if (!currentUser) return null;

  return (
    <div className="flex flex-col min-h-screen select-none">
      {/* Main Container */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar (Responsive Drawer with Scroll) */}
        <aside className="fixed inset-y-0 w-1/4 left-0 z-40 transform transition-transform md:static md:translate-x-0 hidden md:block">
          <div className="flex flex-col h-full overflow-y-auto sidebar-scrollbar p-4">
            <ul className="space-y-4">
              <li className="text-gray-700 text-sm dark:text-gray-300 flex gap-2 items-center">
                <Link href="/" className="flex gap-2 items-center">
                  <Home className="w-4 h-4 md:h-6 md:w-6 text-violet-500" />{" "}
                  Home
                </Link>
              </li>
              <li className="text-gray-700 text-sm dark:text-gray-300 flex gap-2 items-center">
                <Link href="/batch-16" className="flex gap-2 items-center">
                  <ShieldQuestion className="w-4 h-4 md:h-6 md:w-6 text-violet-500" />{" "}
                  About Batch 16
                </Link>
              </li>
              <li className="text-gray-700 text-sm dark:text-gray-300 flex gap-2 items-center">
                <Link href="/bjnhs" className="flex gap-2 items-center">
                  <BookOpen className="w-4 h-4 md:h-6 md:w-6 text-violet-500" />{" "}
                  About BJNHS
                </Link>
              </li>
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <section className="flex-1 md:p-6 px-2 py-3 w-1/2">
          <div className="h-full">
            <CreateEvent currentUser={currentUser} />

            <EventFeed posts={posts} loading={loading} />
            <p className="text-gray-500 text-sm dark:text-gray-400 mt-4 text-center">
              No more content
            </p>
          </div>
        </section>

        {/* Right Sidebar (Responsive Drawer with Scroll) */}
        <RightSideBar />
      </div>
    </div>
  );
}
