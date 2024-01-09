import axios from "axios";

export async function InsertDataToCreateFriendship(
  user1_id: number,
  user2_id: number
) {
  try {
    await axios.post("http://localhost:2000/create_friendship", {
      user1_id,
      user2_id,
      status: "pending"
    });
  } catch (error) {
    console.log(error);
  }
}
