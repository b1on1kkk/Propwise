import axios from "axios";

import type { Messages } from "@/interfaces/interfaces";

export async function GetMessages(chat_id: number) {
  try {
    const res = await axios.get(
      `http://localhost:2000/messages?chat_id=${chat_id}`
    );

    return res.data as Messages[];
  } catch (error) {
    console.log(error);
  }

  return [];
}
