import axios from "axios";

// interfaces
import { Members } from "@/interfaces/interfaces";

export async function GetAllMembers(except: number) {
  const res = await axios.get(
    `http://localhost:2000/members?user_id=${except}`
  );

  return res.data as Promise<Members[]>;
}
