"use client";
import { useEffect, useState } from "react";
import SkeletonPost from "./SkeletonPost";
import { useAuth } from "@/context/AuthContext";
import { fetchUserPosts } from "@/services/fetchUserPosts";
import Post from "./Post";

const UserPosts = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    setLoading(true);
    if (currentUser) {
      fetchUserPosts(currentUser.uid).then((post) => setUserPosts(post));
    }
    setLoading(false);
  }, [currentUser]);

  if (!currentUser) return null;

  return (
    <div className="flex flex-col gap-2 md:gap-4 md:mt-4 mt-2">
      {loading ? (
        <>
          <SkeletonPost />
          <SkeletonPost />
          <SkeletonPost />
        </>
      ) : userPosts.length > 0 ? (
        userPosts.map((post) => <Post key={post.id} post={post} />)
      ) : (
        <p className="text-gray-500 dark:text-gray-300 text-center">
          No posts to show
        </p>
      )}
    </div>
  );
};

export default UserPosts;
