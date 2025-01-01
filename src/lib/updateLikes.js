import { ref, update } from "firebase/database";
import { db } from "./firebaseConfig";

export const updateLikesInDB = async (postId, userId, likeStatus) => {
  try {
    const updates = {};
    if (likeStatus === null) {
      updates[`/posts/${postId}/likes/${userId}`] = null;
    } else {
      updates[`/posts/${postId}/likes/${userId}`] = likeStatus;
    }

    await update(ref(db), updates);
    console.log("Like updated successfully");
  } catch (error) {
    console.log("error updating likes", error);
  }
};
