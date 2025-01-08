const { db } = require("@/lib/firebaseConfig");
const { ref, get } = require("firebase/database");

export const fetchUsers = async () => {
  const usersRef = ref(db, "users");
  const snapshot = await get(usersRef);
  if (snapshot.exists()) {
    return snapshot.val();
  }
};
