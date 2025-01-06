import { db } from "@/lib/firebaseConfig";
import { updateLikesInDB } from "@/lib/updateLikes";
import { onValue, ref } from "firebase/database";
import { Heart, MessageCircle, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa6";
import CommentModal from "./CommentModal";
import { fetchComments } from "@/services/fetchComments";

const PostAction = ({ postId, currentUser, author }) => {
  const [isOpened, setIsOpened] = useState(false);
  const [likes, setLikes] = useState({});
  const [likedStatus, setLikedStatus] = useState(null);
  const [totalLikes, setTotalLikes] = useState(0);
  const [totalComments, setTotalComents] = useState([]);

  useEffect(() => {
    const likesRef = ref(db, `posts/${postId}/likes`);
    const unsubscribe = onValue(likesRef, (snapshot) => {
      const likeData = snapshot.val() || {};
      setLikes(likeData);

      const likeCount = Object.values(likeData).filter(
        (like) => like === true
      ).length;
      setTotalLikes(likeCount);

      if (currentUser) {
        setLikedStatus(likeData[currentUser.uid] || null);
      }
    });

    return () => unsubscribe();
  }, [postId, currentUser]);

  useEffect(() => {
    fetchComments(postId, setTotalComents);
  }, [postId]);

  const handleLike = async () => {
    if (!currentUser) return;

    const newLikeStatus = likedStatus === true ? null : true; // Toogle like
    setLikedStatus(newLikeStatus);

    await updateLikesInDB(postId, currentUser.uid, newLikeStatus);

    // setTotalLikes((prev) => (newLikeStatus === true ? prev + 1 : prev - 1));
  };

  const openModal = () => {
    setIsOpened(true);

    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsOpened(false);

    document.body.style.overflow = "";
  };

  return (
    <div className="flex px-8 items-center justify-start mt-3 py-4 dark:border-gray-500 gap-3">
      <button
        className="flex items-center gap-1 text-sm cursor-pointer hover:text-gray-500 dark:hover:text-gray-400 bg-slate-200 dark:bg-gray-700 py-1 px-2 rounded-full"
        onClick={handleLike}
      >
        {likedStatus && likedStatus === true ? (
          <FaHeart className="w-5 h-5 text-red-500" />
        ) : (
          <Heart className="w-5 h-5" />
        )}{" "}
        {totalLikes}
      </button>

      <button
        className="flex items-center gap-1 text-sm cursor-pointer hover:text-gray-500 dark:hover:text-gray-400 bg-slate-200 dark:bg-gray-700 py-1 px-2 rounded-full"
        onClick={openModal}
      >
        <MessageCircle className="w-5 h-5" /> {totalComments?.length}
      </button>
      <button className="flex items-center gap-1 text-sm cursor-pointer hover:text-gray-500 dark:hover:text-gray-400 bg-slate-200 dark:bg-gray-700 py-1 px-4 rounded-full">
        <Send className="w-5 h-5" />
      </button>

      {isOpened && (
        <CommentModal
          closeModal={closeModal}
          currentUser={currentUser}
          postId={postId}
          author={author}
        />
      )}
    </div>
  );
};

export default PostAction;
