import axios from "axios";

import type { Members } from "@/interfaces/interfaces";

export async function GetFriends(user1_id: number) {
  try {
    const res = await axios.get(
      `http://localhost:2000/get_friends?user1_id=${user1_id}`
    );
    return res.data as Members[];
  } catch (error) {
    console.log(error);
    return [];
  }
}
