import { ArrowLeft, Earth, X } from "lucide-react";
import Image from "next/image";
import UploadForm from "./UploadForm";

const EventModal = ({ closeModal, currentUser }) => {
  if (!currentUser) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-100 bg-opacity-90">
      {/* Modal Content */}
      <div className="bg-white w-screen h-screen md:w-[500px] md:h-[400px] rounded-none md:rounded-lg p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        {/* Modal Top Header */}
        <div>
          <div className="flex items-center justify-between pb-2 border-b border-gray-300">
            <button
              onClick={closeModal}
              className="text-sm font-semibold flex items-center gap-1 md:hidden"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            <h2 className="md:text-xl -ml-6 md:-mr-6 text-sm font-semibold flex-1 text-center">
              Create Event
            </h2>
            <button
              onClick={closeModal}
              className="p-2 rounded-full hover:bg-gray-300 bg-gray-200 hidden md:block"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        {/* Modal Body */}
        <div>
          <div className="py-2 flex items-center gap-2">
            <Image
              src={currentUser?.photoURL || "/avatar.png"}
              height={35}
              width={35}
              alt="User"
              className="rounded-full md:h-[40px] md:w-[40px]"
            />
            <div className="flex flex-col gap-0 items-start">
              <p className="text-sm font-semibold fle">
                {currentUser?.displayName}
              </p>
              <span className="bg-gray-300 text-black text-xs rounded-sm py-[2px] px-2 flex items-center gap-1">
                <Earth className="w-3 h-3" /> public
              </span>
            </div>
          </div>
          <UploadForm />
        </div>
      </div>
    </div>
  );
};

export default EventModal;
