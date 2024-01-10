// socket
import { Socket } from "socket.io-client";
import {
  ClientToServerEvents,
  ServerToClientEvents
} from "@/socket_io_typings";

// utils
import { format } from "date-fns";

export function SendingNotificationSocket(
  socket: Socket<ServerToClientEvents, ClientToServerEvents> | null,
  user_id: number,
  notif_type: "system" | "friend_request",
  content: string,
  user: any
) {
  socket!.emit("sendNotificationsTo", {
    user_id,
    notif_type,
    message: JSON.stringify({
      content,
      user
    }),
    status: 0,
    timestamp: format(new Date(), "dd.MM.yyyy HH:mm")
  });
}
