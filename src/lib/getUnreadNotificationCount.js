const getUnreadNotificationCount = (notifications) => {
  return notifications.filter((notification) => !notification.read).length;
};
