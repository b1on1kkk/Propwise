import axios from "axios";

import type { TFriends } from "@/interfaces/interfaces";

export async function GetFriends(user_id: number) {
  try {
    const res = await axios.get(
      `http://localhost:2000/get_friends?user_id=${user_id}`
    );
    return res.data as TFriends[];
  } catch (error) {
    console.log(error);
    return [];
  }
}
