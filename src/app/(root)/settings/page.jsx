"use client";
import DetailsForm from "@/components/DetailsForm";
import { CircleHelp, CircleUser, GlobeLock, StickyNote } from "lucide-react";
import Image from "next/image";

const Settings = () => {
  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-2 md:px-4 flex flex-col md:flex-row items-start justify-between gap-4">
        <div className="w-full bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md md:w-1/4">
          <h3 className="text-sm uppercase font-semibold text-gray-600 dark:text-gray-300 mb-4">
            General
          </h3>
          <ul className="pl-2">
            <li className="text-sm capitalize gap-4 mb-4 flex items-center cursor-pointer">
              <CircleUser className="w-4 h-4" /> Account
            </li>
            <li className="text-sm capitalize gap-4 mb-4 flex items-center cursor-pointer">
              <GlobeLock className="w-4 h-4" /> Security
            </li>
          </ul>

          <h3 className="text-sm uppercase font-semibold text-gray-600 dark:text-gray-300 mb-4">
            Other
          </h3>
          <ul className="pl-2">
            <li className="text-sm capitalize gap-4 mb-4 flex items-center cursor-pointer">
              <StickyNote className="w-4 h-4" /> Terms & conditions
            </li>
            <li className="text-sm capitalize gap-4 mb-4 flex items-center cursor-pointer">
              <CircleHelp className="w-4 h-4" /> Help & Support
            </li>
          </ul>
        </div>

        <div className="w-full md:w-3/4 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
          <Image
            src="/avatar.png"
            height={100}
            width={100}
            alt="User image"
            className="rounded-full"
          />

          <div className="p-4 shadow-md border border-gray-200 dark:border-gray-400 rounded-lg mt-4">
            <h3 className="text-lg capitalize text-gray-700 dark:text-gray-300">
              Personal Details
            </h3>

            <DetailsForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Settings;
