import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CreateEvent = ({ currentUser }) => {
  return (
    <div className="bg-white shadow-md dark:bg-gray-800 rounded-md py-3 px-4 flex gap-3 items-center">
      {currentUser?.photoURL ? (
        <Link href={`/profile/${currentUser?.uid}`}>
          <Image
            src={currentUser?.photoURL}
            width={35}
            height={35}
            alt="user"
            className="rounded-full"
          />
        </Link>
      ) : (
        <Link
          href={`/profile/${currentUser?.uid}`}
          className="dark:bg-gray-700 bg-gray-300 relative h-12 w-12 rounded-full flex items-center justify-center text-xl font-semibold dark:text-gray-200 text-gray-700"
        >
          {currentUser?.displayName?.charAt(0).toUpperCase()}
        </Link>
      )}
      <button className="flex-1 capitalize bg-violet-600 flex items-center justify-center gap-1 py-2 px-4 rounded-full text-white">
        <Plus className="w-5 h-5" /> create event
      </button>
    </div>
  );
};

export default CreateEvent;
