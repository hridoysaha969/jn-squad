import { db } from "@/lib/firebaseConfig";
import { onValue, ref } from "firebase/database";

export const fetchComments = async (postId, setComments) => {
  const commentRef = ref(db, `posts/${postId}/comments`);

  onValue(commentRef, (snapshot) => {
    if (snapshot.exists()) {
      const comments = snapshot.val();
      const commentsArray = Object.entries(comments).map(([id, data]) => ({
        id,
        ...data,
      }));

      commentsArray.sort((a, b) => b.timeStamp - a.timeStamp);
      setComments(commentsArray);
    } else {
      setComments([]);
    }
  });
};
