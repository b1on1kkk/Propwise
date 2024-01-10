import DeleteNotificationButton from "../DeleteNotificationButton/DeleteNotificationButton";

import { TNotifications } from "@/interfaces/interfaces";

export default function SystemNotificationCard({
  notificaton,
  DeleteNotification
}: {
  notificaton: TNotifications;
  DeleteNotification: () => void;
}) {
  return (
    <div className="border-1 shadow rounded-lg p-2 flex flex-col gap-1">
      <DeleteNotificationButton
        timestamp={notificaton.timestamp}
        onClick={DeleteNotification}
      />
      <div className="flex items-center">
        <span className="text-sm">{notificaton.context.content}</span>
      </div>
    </div>
  );
}
