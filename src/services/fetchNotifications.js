import { db } from "@/lib/firebaseConfig";
import { onValue, ref } from "firebase/database";

export const fetchUserNotifications = async (userId, setNotifications) => {
  const userNotificationsRef = ref(db, `notifications/${userId}`);

  onValue(userNotificationsRef, (snapshot) => {
    const notifications = snapshot.val();
    const notificationsList = notifications
      ? Object.entries(notifications).map(([id, data]) => ({ id, ...data }))
      : [];

    setNotifications(notificationsList);
  });
};
