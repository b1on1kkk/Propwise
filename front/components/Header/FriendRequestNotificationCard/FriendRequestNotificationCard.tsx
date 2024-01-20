// components
import StatusButton from "@/components/MemberCard/StatusButton/StatusButton";
import DeleteNotificationButton from "../DeleteNotificationButton/DeleteNotificationButton";
import { CheckCircle2 } from "lucide-react";

// utils
import { CheckIfUsersAlreadyFriends } from "@/utils/CheckIfUsersAlreadyFriends";

// interfaces
import type { TFriendRequestNotificationCard } from "@/interfaces/interfaces";

export default function FriendRequestNotificationCard({
  friends,
  notification,
  CreateFriendship,
  DeclinedFriendship,
  DeleteNotification
}: TFriendRequestNotificationCard) {
  return (
    <div className="border-1 shadow p-2 rounded-lg flex flex-col dark:border-dark_border gap-1">
      <DeleteNotificationButton
        onClick={DeleteNotification}
        timestamp={notification.timestamp}
      />

      <div className="flex gap-2 items-center">
        <div className="w-10 h-10 rounded-full bg-gray-400" />
        <div className="flex flex-col text-[#56616b] flex-1">
          <span className="text-sm font-semibold dark:text-dark_text">
            {notification.context.user.name}
          </span>
          <span className="text-xs dark:text-dark_text w-[130px] text-ellipsis overflow-hidden">
            {notification.context.content}
          </span>
        </div>

        {!CheckIfUsersAlreadyFriends(friends, notification) ? (
          <div className="flex gap-1">
            <StatusButton
              icon_name="UserRoundPlus"
              className="py-1.5 px-1.5 border-1 rounded-lg shadow bg-[#009965] text-white active:translate-y-0.5 cursor-pointer flex items-center justify-center dark:border-dark_border"
              onClick={CreateFriendship}
              picture_size={15}
            />
            <StatusButton
              icon_name="UserRoundX"
              className="py-1.5 px-1.5 border-1 rounded-lg shadow bg-red-500 text-white active:translate-y-0.5 cursor-pointer flex items-center justify-center dark:border-dark_border"
              onClick={DeclinedFriendship}
              picture_size={15}
            />
          </div>
        ) : (
          <div>
            <CheckCircle2 width={20} height={20} color="#009965" />
          </div>
        )}
      </div>
    </div>
  );
}
