import type { OnlineSocketUsers } from "@/interfaces/interfaces";

export function CheckUserOnline(
  onlineUsers: OnlineSocketUsers[],
  user_id_to_find: number
) {
  if (
    onlineUsers.findIndex(
      (onlineUser) => onlineUser.user_id === user_id_to_find
    ) !== -1
  )
    return true;

  return false;
}
