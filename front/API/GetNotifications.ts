import axios from "axios";

// interfaces
import type { TNotificationsFromDatabase } from "@/interfaces/interfaces";

export async function GetNotifications(user_id: number) {
  try {
    const res = await axios.get(
      `http://localhost:2000/notificaitons?user_id=${user_id}`
    );

    return res.data as TNotificationsFromDatabase[];
  } catch (error) {
    console.log(error);
  }

  return [];
}
