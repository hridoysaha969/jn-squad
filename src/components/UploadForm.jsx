"use client";
import { useAuth } from "@/context/AuthContext";
import { Images } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { db } from "@/lib/firebaseConfig";
import { push, ref, update } from "firebase/database";
import { sendNotifications } from "@/lib/sendNotification";

const UploadForm = ({ closeModal }) => {
  const [postTitle, setPostTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const textAreaRef = useRef(null);
  const { currentUser } = useAuth();
  const { toast } = useToast();

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

    if (
      postText.trim() === "" ||
      postImage === null ||
      postTitle.trim() === ""
    ) {
      textAreaRef.current.focus();
      return;
    }

    try {
      setLoading(true);
      let imgUrl = "";
      if (postImage) {
        const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
        const formData = new FormData();
        formData.append("key", apiKey);
        formData.append("image", postImage);

        const response = await fetch("https://api.imgbb.com/1/upload", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();
        if (result.success) {
          imgUrl = result.data.url;
        } else {
          console.log("Failed to upload image");
        }
      }

      const newPostRef = ref(db, "posts");
      const postKey = push(newPostRef).key;

      const postData = {
        authorId: currentUser.uid,
        title: postTitle,
        description: postText,
        image: imgUrl,
        timeStamp: Date.now(),
        likes: {},
        comments: {},
        approved: false,
      };

      const updates = {};
      updates[`/posts/${postKey}`] = postData;
      updates[`/users/${currentUser.uid}/posts/${postKey}`] = true;

      await update(ref(db), updates);
      await sendNotifications(postKey, currentUser.uid);
      console.log("Post uploaded");

      toast({
        title: "🎉Post Published!",
        description:
          "Your post is published successfully. It is under review, Once it is pproved, post will be visible to your feed.",
      });
      setPostTitle("");
      setPostText("");
      setPostImage(null);
      setImagePreview(null);
      closeModal();
    } catch (error) {
      console.error("Error posting event:", error);
      alert("Failed to post the event. Try again.");
      setLoading(false);
    } finally {
      setLoading(false);
    }
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
          placeholder="Describe your event..."
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
          postTitle.trim() === "" ||
          loading
        }
      >
        Post
      </button>
    </div>
  );
};

export default UploadForm;
