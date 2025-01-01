import { getTimeAgo } from "@/lib/getTimeAgo";
import { fetchAuthor } from "@/services/fetchAuthor";
import { Ellipsis, Forward, Heart, MessageCircle, Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import PostAction from "./PostAction";
import { useAuth } from "@/context/AuthContext";

const Post = ({ post }) => {
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

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
  const customizeDescription = (description) => {
    if (description.length > 65) {
      return description.slice(0, 65) + "...";
    }
    return description;
  };

  return (
    <article className="bg-white dark:bg-gray-800 p-2 shadow-md rounded-sm">
      {/* Post Header */}
      <div className="flex justify-between items-center mb-2">
        <div className=" flex items-center gap-2">
          <div className="h-6 w-6 md:h-8 md:w-8 rounded-full bg-gray-300 dark:bg-gray-400 text-gray-900 flex justify-center items-center">
            {!loading && author && (
              <Image
                src={author.photoURL || "/avatar.png"}
                width={25}
                height={25}
                loading="lazy"
                alt={author.displayName}
                className="rounded-full"
              />
            )}
          </div>
          <div className="flex items-center gap-2">
            <p className="text-xs font-semibold dark:text-gray-300">
              {!loading && author && customizeDisplayName(author.displayName)}
            </p>
            <span className="h-1 w-1 bg-gray-900 dark:bg-gray-300 rounded-full"></span>
            <span className="text-xs dark:text-gray-300">
              {getTimeAgo(post?.timeStamp)}
            </span>
          </div>
        </div>
        <button>
          <Ellipsis className="w-6 h-6" />
        </button>
      </div>

      {/* Post Body */}
      <div className="flex flex-row gap-2 mb-1">
        <p className="text-sm w-1/2" style={{ whiteSpace: "pre-line" }}>
          {customizeDescription(post?.description)}{" "}
          <Link
            href={`/post/${post?.id}`}
            className="flex items-center gap-1 text-blue-400"
          >
            View More <Forward className="w-3 h-3" />{" "}
          </Link>
        </p>
        <Image
          src={post?.image}
          height={50}
          width={80}
          alt="Post Image"
          priority
          className="aspect-[4/3] md:aspect-video w-1/2 object-contain rounded-md"
        />
      </div>

      {/* Visitors actions */}
      <PostAction postId={post?.id} currentUser={currentUser} />
    </article>
  );
};

export default Post;
