import { db } from "@/lib/firebaseConfig";
import { updateLikesInDB } from "@/lib/updateLikes";
import { onValue, ref } from "firebase/database";
import { Heart, MessageCircle, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa6";
import CommentModal from "./CommentModal";

const PostAction = ({ postId, currentUser }) => {
  const [isOpened, setIsOpened] = useState(false);
  const [likes, setLikes] = useState({});
  const [likedStatus, setLikedStatus] = useState(null);
  const [totalLikes, setTotalLikes] = useState(0);

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
    <div className="flex px-3 items-center justify-between mt-3 pt-2 border-t border-gray-300 dark:border-gray-500 gap-3">
      <button
        className="flex items-center gap-1 text-sm cursor-pointer hover:text-gray-500 dark:hover:text-gray-400"
        onClick={handleLike}
      >
        {likedStatus && likedStatus === true ? (
          <FaHeart className="w-5 h-5 text-red-500" />
        ) : (
          <Heart className="w-5 h-5" />
        )}{" "}
        {totalLikes} Likes
      </button>

      <button
        className="flex items-center gap-1 text-sm cursor-pointer hover:text-gray-500 dark:hover:text-gray-400"
        onClick={openModal}
      >
        <MessageCircle className="w-5 h-5" /> 3 Comments
      </button>
      <span className="flex items-center gap-1 text-sm cursor-pointer hover:text-gray-500 dark:hover:text-gray-400">
        <Send className="w-5 h-5" /> Share
      </span>

      {isOpened && <CommentModal closeModal={closeModal} />}
    </div>
  );
};

export default PostAction;
