"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import { markNotificationsAsRead } from "@/lib/markNotificationsAsRead";
import { fetchUserNotifications } from "@/services/fetchNotifications";
import { Bell, CheckCircle2, Ellipsis, Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import NotificationItem from "./NotificationItem";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useAuth();

  useEffect(() => {
    setLoading(true);
    fetchUserNotifications(currentUser?.uid, setNotifications);
    setLoading(false);
  }, [currentUser]);

  const getUnreadNotificationCount = (notifications) => {
    const total = notifications.filter(
      (notification) => !notification.read
    ).length;
    if (total > 9) {
      return "9+";
    }
    return total;
  };
  const handleMarkRead = async () => {
    markNotificationsAsRead(currentUser?.uid, notifications);
  };

  return (
    <DropdownMenu className="max-h-[70vh]">
      <DropdownMenuTrigger className="md:bg-gray-200 relative dark:md:bg-gray-700 dark:text-gray-300 outline-none md:h-12 md:w-12 md:rounded-full md:flex md:items-center md:justify-center">
        <Bell className="w-5 h-5 md:w-6 md:h-6 text-gray-900 dark:text-gray-300" />
        {getUnreadNotificationCount(notifications) > 0 && (
          <span className="h-4 w-4 md:w-5 absolute -top-2 -right-2 md:-top-1 md:-right-1 md:h-5 p-[2px] rounded-full flex justify-center items-center bg-red-400 text-white md:text-xs text-[10px]">
            {getUnreadNotificationCount(notifications)}
          </span>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent className="mr-1 sm:mr-4 max-h-[70vh]">
        <div className="w-full flex items-center justify-between pr-2">
          <DropdownMenuLabel>Notifications</DropdownMenuLabel>
          <span className="cursor-pointer" onClick={handleMarkRead}>
            <CheckCircle2 className="w-5 h-5 text-blue-400" />
          </span>
        </div>

        <DropdownMenuSeparator />

        {loading && (
          <DropdownMenuItem className="flex items-center justify-center py-4">
            <Loader2Icon className="w-5 h-5 animate-spin" />
          </DropdownMenuItem>
        )}
        {(!loading && notifications) || notifications.length > 0 ? (
          notifications.map((item, ind) => (
            <NotificationItem key={ind} item={item} />
          ))
        ) : (
          <DropdownMenuItem className="py-2 flex items-center justify-center">
            No notification!
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Notifications;
