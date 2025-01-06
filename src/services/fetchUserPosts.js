const { db } = require("@/lib/firebaseConfig");
const { ref, get } = require("firebase/database");

export const fetchUserPosts = async (userId) => {
  try {
    const userPostRef = ref(db, `users/${userId}/posts`);
    const snapshot = await get(userPostRef);

    let userPosts = [];
    if (snapshot.exists()) {
      const postIds = Object.keys(snapshot.val());

      for (const postId of postIds) {
        const postSnapshot = await get(ref(db, `posts/${postId}`));
        if (postSnapshot.exists()) {
          userPosts.push({ id: postId, ...postSnapshot.val() });
        }
      }
      userPosts = userPosts.sort((a, b) => b.timeStamp - a.timeStamp);
    }

    return userPosts;
  } catch (error) {
    console.log("Error fetching user's posts: ", error);
  }
};
