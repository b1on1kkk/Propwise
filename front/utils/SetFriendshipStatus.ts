import { Socket } from "socket.io-client";
import type {
  ClientToServerEvents,
  ServerToClientEvents
} from "@/socket_io_typings";

import type { Members } from "@/interfaces/interfaces";

// API
import { UpdateFriendshipStatus } from "../API/UpdateFriendshipStatus";

export async function SetFriendshipStatus(
  user1_id: number,
  user2_id: number,
  socket: Socket<ServerToClientEvents, ClientToServerEvents> | null,
  status: "pending" | "accepted" | "declined",
  setMembers: (c: Members[]) => void
) {
  UpdateFriendshipStatus(user1_id, user2_id, status, () => {
    socket!.emit("updateMembers", {
      user1_id: user1_id,
      user2_id: user2_id
    });

    socket!.on("getMembersFromSocket", (data) => {
      setMembers(data.content);
    });
  });
}
