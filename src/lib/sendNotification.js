const { ref, get, update } = require("firebase/database");
const { db } = require("./firebaseConfig");

export const sendNotifications = async (postId, authorId, authorName) => {
  try {
    // Fetch all user IDs
    const usersRef = ref(db, "users");
    const snapshot = await get(usersRef);

    if (snapshot.exists()) {
      const allUsers = snapshot.val();

      const notifications = {};

      // Loop through users and exclude the author
      Object.keys(allUsers).forEach((userId) => {
        if (userId !== authorId) {
          const notificationId = `${Date.now()}_${Math.random()
            .toString(36)
            .substring(2, 9)}`;
          notifications[`notifications/${userId}/${notificationId}`] = {
            message: `just published a new event at JN Squad.`,
            authorName: authorName,
            postId: postId,
            authorId: authorId,
            timeStamp: Date.now(),
            read: false,
          };
        }
      });

      // Update the database with the notifications
      await update(ref(db), notifications);
      console.log("Notifications sent to all users!");
    }
  } catch (error) {
    console.log("Error sending notifications:", error);
  }
};
