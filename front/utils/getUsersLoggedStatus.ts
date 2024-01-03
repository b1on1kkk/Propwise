import axios from "axios";

export async function getUsersLoggedStatus() {
  const res = await axios.get("http://localhost:2000/session_status");
  return res.data;
}
