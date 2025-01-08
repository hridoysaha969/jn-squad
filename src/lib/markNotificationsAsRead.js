import { ref, update } from "firebase/database";
import { db } from "./firebaseConfig";

export const markNotificationsAsRead = async (userId, notifications) => {
  const updates = {};

  notifications.forEach((notification) => {
    if (!notification.read) {
      updates[`notifications/${userId}/${notification.id}/read`] = true;
    }
  });

  try {
    await update(ref(db), updates);
    console.log("All notifications marked as read!");
  } catch (error) {
    console.error("Error marking notifications as read:", error);
  }
};
