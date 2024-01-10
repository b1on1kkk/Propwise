import axios from "axios";

import { Socket } from "socket.io-client";
import {
  ClientToServerEvents,
  ServerToClientEvents
} from "@/socket_io_typings";

import type { Members } from "@/interfaces/interfaces";

export async function AttestToBeFriends(
  user1_id: number,
  user2_id: number,
  socket: Socket<ServerToClientEvents, ClientToServerEvents> | null,
  setMembers: (c: Members[]) => void
) {
  try {
    await axios.put("http://localhost:2000/update_friendship", {
      user1_id,
      user2_id,
      status: "accepted"
    });

    socket!.emit("updateMembers", {
      user1_id: user1_id,
      user2_id: user2_id
    });

    socket!.on("getMembersFromSocket", (data) => {
      setMembers(data.content);
    });
  } catch (error) {
    console.log(error);
  }
}
