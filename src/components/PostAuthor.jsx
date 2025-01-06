"use client";
import { fetchAuthor } from "@/services/fetchAuthor";
import Image from "next/image";
import { useEffect, useState } from "react";

const PostAuthor = ({ post }) => {
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (post?.authorId) {
      fetchAuthor(post.authorId).then((author) => setAuthor(author));
    }
    setLoading(false);
  }, [post]);

  const customizeDisplayName = (displayName) => {
    if (displayName.length > 18) {
      return displayName.slice(0, 18) + "...";
    }
    return displayName;
  };

  return (
    <div className="mb-4 bg-gray-200 dark:bg-gray-800 p-2 rounded-md flex items-center gap-2">
      <Image
        src="/avatar.png"
        height={40}
        width={40}
        alt="Author"
        className="rounded-full"
      />
      <div>
        <h3 className="text-sm font-semibold">
          {!loading && author && customizeDisplayName(author.displayName)}
        </h3>
        <span className="text-xs py-[2px] px-2 border border-blue-400 text-blue-400 rounded-md">
          Author
        </span>
      </div>
    </div>
  );
};

export default PostAuthor;
