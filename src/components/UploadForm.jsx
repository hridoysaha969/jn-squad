"use client";
import { Images } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

const UploadForm = () => {
  const [postText, setPostText] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const textAreaRef = useRef(null);

  const handleInput = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };
  const handlePostImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPostImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handlePostSubmit = (e) => {
    if (postText.trim() === "" && postImage === null) {
      textAreaRef.current.focus();
      return;
    }

    console.log(postText);
    console.log(postImage);
  };

  return (
    <div className="w-full mx-auto bg-white mt-2">
      <div className="flex items-center mb-4">
        <textarea
          ref={textAreaRef}
          className="w-full text-gray-600 p-2 rounded outline-none resize-none overflow-hidden text-sm placeholder:text-lg"
          placeholder="What's on your mind?"
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          onInput={handleInput}
        />
      </div>
      <div className="my-4">
        <label
          htmlFor="photo-upload"
          className="flex items-center justify-between space-x-2 text-gray-600 text-sm font-semibold cursor-pointer border border-gray-300 rounded-md p-3"
        >
          <span>Upload a photo</span>
          <Images className="w-5 h-5 text-green-500 mr-2" />
        </label>
        <input
          id="photo-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handlePostImageChange}
        />
      </div>
      {imagePreview && (
        <div className="my-3 border border-gray-300 w-fit">
          <Image
            src={imagePreview}
            alt="Preview img"
            width={100}
            height={100}
            className="w-[100px] h-auto object-cover rounded"
          />
        </div>
      )}
      <button
        className="py-2 px-4 bg-violet-500 hover:bg-violet-600 rounded-md text-white w-full disabled:bg-gray-400 disabled:cursor-not-allowed"
        onClick={handlePostSubmit}
        disabled={postText.trim() === "" || postImage === null}
      >
        Post
      </button>
    </div>
  );
};

export default UploadForm;
