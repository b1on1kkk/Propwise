import axios from "axios";

export async function GetLoggedInUserInf() {
  const res = await axios.get("http://localhost:2000/logged_user");
  return res.data;
}
