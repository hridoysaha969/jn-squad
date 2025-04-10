"use client";
import { useAuth } from "@/context/AuthContext";
import { fetchSingleUser } from "@/services/fetchSingleUser";
import Image from "next/image";
import { useEffect, useState } from "react";

const ProfileHeader = () => {
  const [userData, setUserData] = useState({});
  const { currentUser } = useAuth();

  useEffect(() => {
    const getData = async () => {
      const userData = await fetchSingleUser(currentUser?.uid);
      setUserData(userData);
    };
    getData();
  }, [currentUser]);

  if (!currentUser) return null;

  const postCount = () => {
    if (!userData?.posts) return;
    const count = Object.keys(userData?.posts).length || 0;
    return count;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-b-md p-4 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="relative md:w-24 w-20 md:h-24 h-20 rounded-full overflow-hidden">
            <Image
              src={currentUser?.photoURL || "/avatar.png"}
              alt="Profile Image"
              fill
              className="h-full w-full"
            />
          </div>
          <div className="ml-4 select-none">
            <h1 className="text-2xl font-bold capitalize">
              {currentUser?.displayName}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-sm flex items-center gap-1">
              <span className="font-semibold">{postCount() || 0}</span>
              posts
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
