"use client";
import { useUnseenCount } from "@suprsend/react-inbox";
import { useEvent, useNotifications } from "@suprsend/react-inbox";
import NotificationsComponent from "./NotificationsComponent";

export default function HeadlessSDKComponent() {
  const { unSeenCount, markAllSeen } = useUnseenCount();
  const notifications = useNotifications();
  // console.log(notifications.notifications);

  useEvent("new_notification", (notificationData) => {
    alert("You have new notifications!");
  });

  console.log("cnt=" + unSeenCount);
  return (
    <>
      <NotificationsComponent
        unSeenCount={unSeenCount}
        items={notifications.notifications}
      />
    </>
  );
}
