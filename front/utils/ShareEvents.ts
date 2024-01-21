import { Events, TChat, User } from "@/interfaces/interfaces";
import {
  ClientToServerEvents,
  ServerToClientEvents
} from "@/socket_io_typings";
import { format } from "date-fns";
import { Socket } from "socket.io-client";

export function ShareEvents(
  event: Events,
  isSelectedChats: TChat[],
  user: User,
  socket: Socket<ServerToClientEvents, ClientToServerEvents> | null
) {
  for (let i = 0; i < isSelectedChats.length; i++) {
    const configureMessage = {
      message_id: 0,
      name: user.name,
      lastname: user.lastname,
      chat_id: isSelectedChats[i].chat_id,
      sender_id: user.id,
      sender_socket: socket!.id!,
      to_send_id: isSelectedChats[i].id,
      value: JSON.stringify({ ...event }),
      timestamp: format(new Date(), "HH:mm"),
      status: 0
    };

    socket!.emit("sendPrivateMessage", configureMessage);
  }
}
