"use client";
import { BookOpen, Home, ShieldQuestion } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import CreateEvent from "./CreateEvent";
import EventFeed from "./EventFeed";
import { fetchApprovedPosts } from "@/services/fetchApprovedPosts";
import Image from "next/image";

export default function ResponsiveLayout() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    setLoading(true);
    fetchApprovedPosts().then((posts) => setPosts(posts));
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
            <CreateEvent currentUser={currentUser} />

            <EventFeed posts={posts} loading={loading} />
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
            {!loading || posts.length > 0 ? (
              <ul className="space-y-4">
                <li className="text-gray-700">Post gotten</li>
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
