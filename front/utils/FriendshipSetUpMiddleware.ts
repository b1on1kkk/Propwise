import { Members, TNotifications } from "@/interfaces/interfaces";

// utils
import { SetFriendshipStatus } from "./SetFriendshipStatus";
import { SendingNotificationSocket } from "./SendingNotificationSocket";

// socket
import { Socket } from "socket.io-client";
import type {
  ClientToServerEvents,
  ServerToClientEvents
} from "@/socket_io_typings";

export function FriendshipSetUpMiddleware(
  socket: Socket<ServerToClientEvents, ClientToServerEvents> | null,
  loggedin_userid: number,
  notification: TNotifications,
  friendship_status: "pending" | "accepted" | "declined",
  system_notif_type: "system" | "friend_request",
  system_notif_text: string,
  setMembers: (c: Members[]) => void
) {
  SetFriendshipStatus(
    notification.context.user.id,
    loggedin_userid,
    socket,
    friendship_status,
    setMembers
  );

  SendingNotificationSocket(
    socket,
    notification.context.user.id,
    system_notif_type,
    system_notif_text,
    notification.context.user
  );
}
