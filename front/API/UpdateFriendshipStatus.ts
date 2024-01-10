import axios from "axios";

export async function UpdateFriendshipStatus(
  user1_id: number,
  user2_id: number,
  status: "pending" | "accepted" | "declined",
  callback: () => void
) {
  try {
    if (status === "accepted") {
      await axios.put("http://localhost:2000/update_friendship", {
        user1_id,
        user2_id,
        status
      });
    } else if (status === "declined") {
      await axios.delete("http://localhost:2000/delete_friendship", {
        data: {
          user1_id,
          user2_id
        }
      });
    }

    callback();
  } catch (error) {
    console.log(error);
  }
}
