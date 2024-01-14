import { Socket } from "socket.io-client";
import type {
  ClientToServerEvents,
  ServerToClientEvents
} from "@/socket_io_typings";

import type { TChat } from "@/interfaces/interfaces";

export function PinMessages(
  chat: TChat,
  socket: Socket<ServerToClientEvents, ClientToServerEvents> | null,
  loggedin_user_id: number,
  cb: (newChats: TChat[]) => void
) {
  socket!.emit("pinMessage", {
    chat_id: chat.chat_id,
    to_change_status: chat.chat_status === "all" ? "pinned" : "all",
    socket_to_send: socket!.id!,
    user_id: loggedin_user_id
  });

  socket!.on("updateChats", (data) => {
    cb(data.chats);
  });
}
