import Image from "next/image";
import SkeletonComment from "./SkeletonComment";
import { useEffect, useState } from "react";
import { fetchComments } from "@/services/fetchComments";
import { getTimeAgo } from "@/lib/getTimeAgo";

const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchComments(postId, setComments);
    setLoading(false);
  }, [postId]);

  return (
    <div className="flex-1 h-full bg-white dark:bg-gray-800 px-4 py-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
      <div className="">
        {/* Example Comments */}
        {loading ? (
          <>
            <SkeletonComment />
            <SkeletonComment />
            <SkeletonComment />
          </>
        ) : comments.length > 0 ? (
          comments.map((comment, ind) => (
            <div className="p-2 rounded-md flex items-start gap-2" key={ind}>
              <Image
                src={comment?.authorPhotoURL || "/avatar.png"}
                height={30}
                width={30}
                alt="User Image"
                className="rounded-full"
              />
              <div>
                <div className="text-sm mb-1 py-1 px-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-gray-300 flex flex-col items-start gap-1">
                  <h3 className="text-sm font-semibold">
                    {comment.authorName}
                  </h3>
                  <p className="text-sm pl-1">{comment.text}</p>
                </div>
                <span className="text-gray-600 dark:text-gray-400 text-xs px-2">
                  {getTimeAgo(comment.timeStamp)}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="p-3 h-full flex items-center justify-center">
            <p className="text-gray-600 text-sm">No comments yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;
