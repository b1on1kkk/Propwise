// socket
import { Socket } from "socket.io-client";
import type {
  ServerToClientEvents,
  ClientToServerEvents
} from "@/socket_io_typings";

// interfaces
import type { TNotificationsFromDatabase } from "@/interfaces/interfaces";

export function CheckNotifications(
  NotReadedStatus: boolean,
  socket: Socket<ServerToClientEvents, ClientToServerEvents> | null,
  user_id: number,
  cb_setter: (data: TNotificationsFromDatabase[]) => void
) {
  if (NotReadedStatus) {
    socket!.emit("updateNotificationStatus", {
      user_id: user_id,
      socket_id: socket!.id!
    });

    socket!.on("updatedNotifications", (data) => {
      cb_setter(data.notifications);
    });
  }
}
