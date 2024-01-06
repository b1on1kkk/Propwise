import axios from "axios";

export async function GetEvents(user_id: number, month: string) {
  try {
    const res = await axios.get(
      `http://localhost:2000/events?user_id=${user_id}&month=${month}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
}
