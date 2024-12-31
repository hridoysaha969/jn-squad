import { db } from "@/lib/firebaseConfig";
import { equalTo, get, orderByChild, query, ref } from "firebase/database";

export const fetchApprovedPosts = async () => {
  try {
    const postRef = ref(db, "posts");
    const approvedQuery = query(
      postRef,
      orderByChild("approved"),
      equalTo(true)
    );
    const snapshot = await get(approvedQuery);

    const posts = [];
    if (snapshot.exists) {
      snapshot.forEach((childSnapshot) => {
        posts.push({ id: childSnapshot.key, ...childSnapshot.val() });
      });
    }

    console.log(posts);

    return posts;
  } catch (error) {
    console.log("Error fetching approved posts:", error);
  }
};
