import axios from "axios";

import type { User } from "@/interfaces/interfaces";

export async function GetLoggedInUserInf() {
  try {
    const res = await axios.get("http://localhost:2000/logged_user");
    return res.data as User[];
  } catch (error) {
    console.log(error);
  }
}
