import { db } from "@/lib/firebaseConfig";
import { push, ref, update } from "firebase/database";
import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { MdSend } from "react-icons/md";
import SkeletonComment from "./SkeletonComment";
import Comments from "./Comments";

const CommentModal = ({ closeModal, currentUser, postId }) => {
  const [comment, setComment] = useState("");

  const handleSubmitComment = async () => {
    if (comment.trim().length === 0) return;
    if (!currentUser) return;

    try {
      const commentId = push(ref(db, `posts/${postId}/comments`)).key;

      const newComment = {
        authorId: currentUser.uid,
        authorName: currentUser.displayName,
        authorPhotoURL: currentUser.photoURL || "",
        text: comment,
        timeStamp: Date.now(),
      };

      const updates = {};
      updates[`posts/${postId}/comments/${commentId}`] = newComment;

      await update(ref(db), updates);

      console.log("comment added successfully");
    } catch (error) {
      console.log("Failed to add comment", error);
    }

    setComment("");
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-100 dark:bg-black dark:bg-opacity-70 bg-opacity-80 flex md:items-center items-end justify-center">
      <div className="w-full md:max-w-lg md:h-[80%] h-[90%] bg-white rounded-lg shadow-lg lg:max-w-xl">
        <div className="relative w-full h-full flex flex-col">
          {/* Author Name and Close Button */}
          <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-800 border-b border-gray-400 rounded-t-md">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-300">
              {"Hridoy's"} post
            </h2>
            <button
              onClick={closeModal}
              className="p-2 rounded-full dark:bg-gray-600 dark:hover:bg-gray-700 dark:text-white hover:bg-gray-300 bg-gray-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Comments */}
          <Comments postId={postId} />

          {/* Textarea and Buttons */}
          <div className="sticky bottom-0 z-10 px-4 py-2 bg-white dark:bg-gray-800">
            <div className="relative flex items-start gap-2">
              <Image
                src="/avatar.png"
                height={35}
                width={35}
                alt="User Image"
                className="rounded-full"
              />
              <textarea
                className="w-full h-16 px-2 py-1 mb-2 rounded-lg resize-none outline-none bg-gray-200 dark:bg-gray-700 placeholder:text-gray-600 dark:placeholder-gray-400 placeholder:text-sm"
                placeholder="Write your comment here..."
                onChange={(e) => setComment(e.target.value)}
                value={comment}
              />
              <button
                className="text-blue-500 rounded-md absolute right-2 bottom-4 disabled:text-gray-400 disabled:cursor-not-allowed"
                disabled={comment.trim().length === 0}
                onClick={handleSubmitComment}
              >
                <MdSend className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
