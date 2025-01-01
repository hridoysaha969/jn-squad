import { Send, X } from "lucide-react";
import Image from "next/image";
import { MdSend } from "react-icons/md";

const CommentModal = ({ closeModal, currentUser }) => {
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
          <div className="flex-1 h-full bg-white dark:bg-gray-800 px-4 py-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            <div className="space-y-3">
              {/* Example Comments */}
              <div className="p-2 rounded-md flex items-start gap-2">
                <Image
                  src="/avatar.png"
                  height={30}
                  width={30}
                  alt="User Image"
                  className="rounded-full"
                />
                <div className="text-sm py-1 px-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-gray-300 flex flex-col items-start gap-1">
                  <h3 className="text-sm font-semibold">Sami Chowdhury</h3>
                  <p className="text-sm">
                    This is an example comment from another user.
                  </p>
                </div>
              </div>
              <div className="p-2 rounded-md flex items-start gap-2">
                <Image
                  src="/avatar.png"
                  height={30}
                  width={30}
                  alt="User Image"
                  className="rounded-full"
                />
                <div className="text-sm py-1 px-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-gray-300 flex flex-col items-start gap-1">
                  <h3 className="text-sm font-semibold">Sami Chowdhury</h3>
                  <p className="text-sm">
                    This is an example comment from another user.
                  </p>
                </div>
              </div>
              <div className="p-2 rounded-md flex items-start gap-2">
                <Image
                  src="/avatar.png"
                  height={30}
                  width={30}
                  alt="User Image"
                  className="rounded-full"
                />
                <div className="text-sm py-1 px-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-gray-300 flex flex-col items-start gap-1">
                  <h3 className="text-sm font-semibold">Sami Chowdhury</h3>
                  <p className="text-sm">
                    This is an example comment from another user. This is an
                    example comment from another user.
                  </p>
                </div>
              </div>
              <div className="p-2 rounded-md flex items-start gap-2">
                <Image
                  src="/avatar.png"
                  height={30}
                  width={30}
                  alt="User Image"
                  className="rounded-full"
                />
                <div className="text-sm py-1 px-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-gray-300 flex flex-col items-start gap-1">
                  <h3 className="text-sm font-semibold">Sami Chowdhury</h3>
                  <p className="text-sm">
                    This is an example comment from another user. This is an
                    example comment from another user.
                  </p>
                </div>
              </div>
              <div className="p-2 rounded-md flex items-start gap-2">
                <Image
                  src="/avatar.png"
                  height={30}
                  width={30}
                  alt="User Image"
                  className="rounded-full"
                />
                <div className="text-sm py-1 px-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-gray-300 flex flex-col items-start gap-1">
                  <h3 className="text-sm font-semibold">Sami Chowdhury</h3>
                  <p className="text-sm">
                    This is an example comment from another user. This is an
                    example comment from another user.
                  </p>
                </div>
              </div>

              {/* Add more comment blocks here */}
            </div>
          </div>

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
              />
              <button
                className="text-blue-500 rounded-md absolute right-2 bottom-4 disabled:text-gray-400 disabled:cursor-not-allowed"
                disabled={true}
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
