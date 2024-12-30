"use client";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import EventModal from "./EventModal";

const CreateEvent = ({ currentUser }) => {
  const [isOpened, setIsOpened] = useState(false);
  const openModal = () => {
    setIsOpened(true);

    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsOpened(false);

    document.body.style.overflow = "";
  };

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
      <button
        className="flex-1 capitalize bg-violet-600 flex items-center justify-center gap-1 py-2 px-4 rounded-full text-white"
        onClick={openModal}
      >
        <Plus className="w-5 h-5" /> create event
      </button>

      {isOpened && (
        <EventModal closeModal={closeModal} currentUser={currentUser} />
      )}
    </div>
  );
};

export default CreateEvent;
