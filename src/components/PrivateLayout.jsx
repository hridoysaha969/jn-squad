"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const PrivateLayout = ({ children, admin }) => {
  const [loading, setLoading] = useState(true);
  const { currentUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Ensure currentUser and admin are valid
    if (!currentUser || !admin) {
      router.push("/");
      return;
    }

    // Check if the current user is the admin
    if (currentUser.email === admin) {
      setLoading(false); // Allow rendering children
    } else {
      router.push("/"); // Redirect if not admin
    }
  }, [admin, currentUser, router]);

  // Render children only if loading is false and currentUser is valid
  return !loading && currentUser?.email === admin ? children : null;
};

export default PrivateLayout;
