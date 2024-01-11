import axios from "axios";

import { TChat } from "@/interfaces/interfaces";

export async function GetChats(user_id: number) {
  try {
    const res = await axios.get(
      `http://localhost:2000/chats?user_id=${user_id}`
    );

    return res.data as TChat[];
  } catch (error) {
    console.log(error);
  }

  return [];
}
