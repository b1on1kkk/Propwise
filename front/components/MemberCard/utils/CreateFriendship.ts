// API
import { GetAllMembers } from "@/API/GetAllMembers";
import { InsertDataToCreateFriendship } from "@/API/InsertDataToCreateFriendship";

// interfaces
import type { Members } from "@/interfaces/interfaces";

export function CreateFriendship(
  user1_id: number,
  user2_id: number,
  setMembers: (c: Members[]) => void
) {
  InsertDataToCreateFriendship(user1_id, user2_id)
    .then(() => {
      GetAllMembers(user1_id).then((members) => setMembers(members));
    })
    .catch((error) => {
      if (error) console.log("Error occur, we are trying to fix it!");
    });
}
