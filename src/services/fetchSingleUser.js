import { db } from "@/lib/firebaseConfig";
import { get, ref } from "firebase/database";

export const fetchSingleUser = async (userId) => {
  try {
    const userRef = ref(db, `users/${userId}`);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      const userData = await snapshot.val();
      return userData;
    }
  } catch (error) {
    console.log("Error fetching single user data", error.message);
  }
};
