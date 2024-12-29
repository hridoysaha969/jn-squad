import Post from "@/components/Post";
import { BadgeX, GraduationCap, Mail, MapPin } from "lucide-react";
import Image from "next/image";

const Profile = () => {
  return (
    <section className="pb-8">
      <div className="max-w-5xl mx-auto px-2 md:px-4 mt-2">
        <div className="w-full aspect-[16/7] relative overflow-hidden">
          <Image
            src="/1.png"
            alt="Cover Image"
            fill
            className="h-full w-full"
          />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-b-md p-4 shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="relative md:w-24 w-20 md:h-24 h-20 rounded-full overflow-hidden">
                <Image
                  src="/1.png"
                  alt="Profile Image"
                  fill
                  className="h-full w-full"
                />
              </div>
              <div className="ml-4 select-none">
                <h1 className="text-2xl font-bold">John Doe</h1>
                <p className="text-gray-600 dark:text-gray-300 text-sm flex items-center gap-1">
                  <span className="font-semibold">0</span>
                  posts
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-4 md:flex-row items-start justify-between">
          <div className="bg-white shadow-md dark:bg-gray-800 rounded-md p-4 w-full md:w-1/2 lg:w-1/3">
            <h1 className="text-xl border-b border-gray-400 pb-1 font-semibold text-gray-600 dark:text-gray-300">
              Information
            </h1>
            <ul className="mt-2">
              <li className="flex items-center gap-1 justify-between">
                <p className="text-gray-600 text-xs dark:text-gray-300 flex items-center gap-1">
                  <Mail className="w-4 h-4" /> hridoysaha@gmail.com{" "}
                  <BadgeX className="w-4 h-4 text-red-500" />
                </p>
                <span className="text-blue-500 cursor-pointer hover:underline select-none flex items-center font-semibold gap-1 text-xs">
                  Verify
                </span>
              </li>
              <li className="mt-2">
                <p className="text-gray-600 text-xs dark:text-gray-300 flex items-center gap-1">
                  <MapPin className="w-4 h-4" /> Address{" "}
                  <span className="font-semibold text-gray-600 dark:text-gray-100">
                    Dhaka, Bangladesh
                  </span>
                </p>
              </li>
              <li className="mt-2">
                <p className="text-gray-600 text-xs dark:text-gray-300 flex items-center gap-1">
                  <GraduationCap className="w-4 h-4" /> Group{" "}
                  <span className="font-semibold text-gray-600 dark:text-gray-100">
                    Science
                  </span>
                </p>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/2 lg:w-2/3">
            <h1 className="bg-white shadow-md dark:bg-gray-800 rounded-md p-4 text-xl  font-semibold text-gray-600 dark:text-gray-300">
              Posts
            </h1>
            <div className="flex flex-col gap-2 md:gap-4 md:mt-4 mt-2">
              <Post />
              <Post />
              <Post />
              <Post />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
