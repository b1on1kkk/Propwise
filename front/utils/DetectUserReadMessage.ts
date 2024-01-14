// socket
import { Socket } from "socket.io-client";
import type {
  ClientToServerEvents,
  ServerToClientEvents
} from "@/socket_io_typings";

// interfaces
import type { Messages, TChat } from "@/interfaces/interfaces";

export function DetectUserReadMessage(
  user_id: number,
  messages: Messages[],
  storedValue: TChat,
  socket: Socket<ServerToClientEvents, ClientToServerEvents>,
  cb: (messages: Messages[]) => void
) {
  const indexesToChangeStatus: number[] = [];

  // first of all need to find indexes which should be checked
  messages.forEach((message) => {
    // as in messengers user can read our messages and we can his
    if (message.sender_id !== user_id && message.status === 0)
      indexesToChangeStatus.push(message.message_id);
  });

  // send some data to get answer
  socket.emit("updateStatusMessages", {
    indexes_to_update: indexesToChangeStatus,
    chat_id: storedValue.chat_id,
    user1_id: storedValue.user1_id,
    user2_id: storedValue.user2_id
  });

  // get answer and rewrite messanges
  socket.on("getUpdatedMessages", (data) => {
    cb(data.messages);
  });
}
