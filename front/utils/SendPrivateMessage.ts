// socket
import { Socket } from "socket.io-client";
import {
  ClientToServerEvents,
  ServerToClientEvents
} from "@/socket_io_typings";

// utils
import { format } from "date-fns";

// interfaces
import type { TChat, User } from "@/interfaces/interfaces";

export function SendPrivateMessage(
  socket: Socket<ServerToClientEvents, ClientToServerEvents> | null,
  messageInput: string,
  user: User[],
  storedValue: TChat | null
) {
  const configureMessage = {
    message_id: 0,
    name: user[0].name,
    lastname: user[0].lastname,
    chat_id: storedValue!.chat_id,
    sender_id: user[0].id,
    sender_socket: socket!.id!,
    to_send_id: storedValue!.id,
    value: messageInput,
    timestamp: format(new Date(), "HH:mm"),
    status: 0
  };

  socket!.emit("sendPrivateMessage", configureMessage);

  socket!.emit("updateChatsAfterSendingMessages", {
    chat_id: storedValue!.chat_id,
    value: messageInput,
    timestamp: format(new Date(), "HH:mm"),
    user1_id: user[0].id,
    user2_id: storedValue!.id,
    status: 0
  });
}
