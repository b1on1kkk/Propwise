// interfaces
import type { TFriends, TNotifications } from "@/interfaces/interfaces";

export function CheckIfUsersAlreadyFriends(
  friends: TFriends[],
  notification: TNotifications
) {
  for (let i = 0; i < friends.length; i++) {
    if (friends[i].id === notification.context.user.id) return true;
  }

  return false;
}
