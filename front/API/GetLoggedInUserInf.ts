import axios from "axios";

export async function GetLoggedInUserInf() {
  try {
    const res = await axios.get("http://localhost:2000/logged_user");
    return res.data;
  } catch (error) {
    console.log(error);
  }
}
