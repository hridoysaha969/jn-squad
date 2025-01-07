import { cn } from "@/lib/utils";
import {
  CheckCheck,
  Facebook,
  Linkedin,
  LinkIcon,
  Twitter,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const ShareDrawer = ({ closeDrawer, postId, postTitle, postDescription }) => {
  const [copied, setCopied] = useState(false);
  const [startY, setStartY] = useState(null);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const postUrl = `https://jnsquad.vercel.app/post/${postId}`;
  const shareText = `${postTitle} - ${postDescription}`;

  const handleTouchStart = (e) => {
    setStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    const currentY = e.touches[0].clientY;
    if (window.outerWidth > 767) return;

    if (startY !== null && currentY - startY > 100) {
      setOpen(true);
      setTimeout(() => closeDrawer(), 300);
    }
  };

  const handleCopy = async () => {
    try {
      // Copy the text to the clipboard
      await navigator.clipboard.writeText(postUrl);
      setCopied(true);

      // Reset the copied state after 3 seconds
      setTimeout(() => setCopied(false), 3000);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to copy!",
        description:
          "There is an error while copying the URL. Please try again.",
      });
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full inset-0 z-50 flex items-end md:items-center justify-center bg-gray-100 dark:bg-gray-900 dark:bg-opacity-90 bg-opacity-80">
      {/* Modal Content */}
      <div
        className={cn(
          "bg-white relative dark:bg-gray-800 w-screen md:w-[500px] h-auto rounded-none md:rounded-lg p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 shadow-md transition-transform",
          {
            "translate-y-full": open,
            "translate-y-0": !open,
          }
        )}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        {/* Modal Top Header */}
        <div>
          <div className="mt-2 flex items-center justify-start md:justify-center font-semibold pb-2 border-b border-gray-300 dark:border-gray-500">
            <button
              className="p-2 absolute top-2 right-2 rounded-full dark:bg-gray-600 dark:hover:bg-gray-700 dark:text-white hover:bg-gray-300 bg-gray-200 hidden md:block z-50"
              onClick={closeDrawer}
            >
              <X className="w-5 h-5" />
            </button>
            <span className="md:hidden absolute w-8 h-1 -translate-x-1/2 bg-gray-300 rounded-lg top-3 left-1/2 dark:bg-gray-600"></span>
            Share to
          </div>
        </div>
        {/* Modal Body */}
        <div className="py-3 pt-5">
          <div className="py-2 flex items-center justify-around md:px-8 px-4">
            <Link
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                postUrl
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-500 h-10 w-10 rounded-full flex items-center justify-center"
            >
              <Facebook className="w-5 h-5 text-white" />
            </Link>
            <Link
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                postUrl
              )}&text=${encodeURIComponent(shareText)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-sky-400 h-10 w-10 rounded-full flex items-center justify-center"
            >
              <Twitter className="w-5 h-5 text-white" />
            </Link>
            <Link
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                postUrl
              )}&title=${encodeURIComponent(
                postTitle
              )}&summary=${encodeURIComponent(postDescription)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-800 h-10 w-10 rounded-full flex items-center justify-center"
            >
              <Linkedin className="w-5 h-5 text-white" />
            </Link>
            <button
              className={cn(
                "dark:bg-gray-600 bg-gray-300 h-10 w-10 rounded-full flex items-center justify-center",
                {
                  "bg-blue-400 dark:bg-blue-400": copied,
                }
              )}
              onClick={handleCopy}
            >
              {copied ? (
                <CheckCheck className="w-5 h-5 text-gray-800 dark:text-gray-300" />
              ) : (
                <LinkIcon className="w-5 h-5 text-gray-800 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareDrawer;
