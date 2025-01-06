import { MessageCircle } from "lucide-react";
import { FaHeart } from "react-icons/fa6";

const PostOverview = ({ likes, comments }) => {
  const getNumber = (nodes) => {
    const countsObj = nodes || {};
    const counts = Object.keys(countsObj).length;
    return counts;
  };
  return (
    <div className="mt-6 flex items-center justify-start gap-4">
      <div className="flex flex-col gap-1 items-center select-none">
        <span className="flex items-center gap-1">
          <FaHeart className="w-5 h-5  text-red-500" /> {getNumber(likes)}
        </span>
        <span className="text-sm font-semibold">Hearts</span>
      </div>
      <div className="flex flex-col gap-1 items-center select-none">
        <span className="flex items-center gap-1">
          <MessageCircle className="w-5 h-5 text-red-500" />{" "}
          {getNumber(comments)}
        </span>
        <span className="text-sm font-semibold">Talks</span>
      </div>
    </div>
  );
};

export default PostOverview;
