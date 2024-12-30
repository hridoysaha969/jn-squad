"use client";
import { useAuth } from "@/context/AuthContext";
import { Images } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { db, storage } from "@/lib/firebaseConfig";
import { push, ref, update } from "firebase/database";

const UploadForm = ({ closeModal }) => {
  const [postTitle, setPostTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const textAreaRef = useRef(null);
  const { currentUser } = useAuth();

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
  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) {
      return;
    }
    console.log("User authenticated");

    if (
      postText.trim() === "" ||
      postImage === null ||
      postTitle.trim() === ""
    ) {
      textAreaRef.current.focus();
      return;
    }
    console.log("User provided all the data");

    // try {
    //   let imgUrl = "";
    //   if (postImage) {
    //     const fileRef = storageRef(
    //       storage,
    //       `posts/${currentUser.uid}/${Date.now()}_${postImage.name}`
    //     );
    //     const snapshot = await uploadBytes(fileRef, postImage);
    //     imgUrl = await getDownloadURL(snapshot.ref);
    //   }
    //   console.log("Image uploaded & url :", imgUrl);

    //   const newPostRef = ref(db, "posts");
    //   const postKey = push(newPostRef).key;

    //   console.log("post created & ref is :", postKey);

    //   const postData = {
    //     authorId: currentUser.uid,
    //     title: postTitle,
    //     description: postText,
    //     image: imgUrl,
    //     timeStamp: Date.now(),
    //     likes: {},
    //     comments: {},
    //     approved: false,
    //   };

    //   const updates = {};
    //   updates[`/posts/${postKey}`] = postData;
    //   updates[`/users/${currentUser.uid}/posts/${postKey}`] = true;

    //   await update(ref(db), updates);
    //   console.log("Post uploaded");

    //   alert("Event posted successfully!");
    //   setPostTitle("");
    //   setPostText("");
    //   setPostImage(null);
    //   setImagePreview(null);
    //   closeModal();
    // } catch (error) {
    //   console.error("Error posting event:", error);
    //   alert("Failed to post the event. Try again.");
    // }
  };

  return (
    <div className="w-full mx-auto bg-white dark:bg-transparent mt-2">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Event title"
          className="w-full dark:bg-transparent dark:border-gray-400 dark:text-gray-300 text-gray-600 p-2 rounded border outline-none resize-none overflow-hidden text-sm !placeholder:text-[18px]"
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
      </div>
      <div className="flex items-center mb-4">
        <textarea
          ref={textAreaRef}
          className="w-full dark:bg-transparent dark:text-gray-300 text-gray-600 p-2 rounded outline-none resize-none overflow-hidden text-sm placeholder:text-lg"
          placeholder="What's on your mind?"
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          onInput={handleInput}
        />
      </div>
      <div className="my-4">
        <label
          htmlFor="photo-upload"
          className="flex items-center justify-between space-x-2 dark:text-gray-300 text-gray-600 text-sm font-semibold cursor-pointer border border-gray-300 rounded-md p-3"
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
        disabled={
          postText.trim() === "" ||
          postImage === null ||
          postTitle.trim() === ""
        }
      >
        Post
      </button>
    </div>
  );
};

export default UploadForm;