import { db } from "@/lib/firebaseConfig";
import { get, ref } from "firebase/database";

export const fetchAuthor = async (authorId) => {
  try {
    const authorRef = ref(db, `users/${authorId}`);
    const snapshot = await get(authorRef);
    if (snapshot.exists()) {
      return snapshot.val();
    }
  } catch (error) {
    console.log("Error fetching author: ", error);
  }
};
