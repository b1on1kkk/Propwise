// interfaces
import { TChat, TFriends } from "@/interfaces/interfaces";

// such of inefficient sorting that checks is friends id is exist in chat array
// if exist - do nothing, just push data to new chat variable
// if not - push user to friends variable
export function CheckFriendsIfChatAlreadyExist(
  friends: TFriends[],
  chats: TChat[]
): [TFriends[], TChat[]] {
  if (chats.length === 0) return [friends, chats];

  const newFriends: TFriends[] = [];
  const newChat: TChat[] = [];

  for (let i = 0; i < friends.length; i++) {
    let flag = false;
    for (let j = 0; j < chats.length; j++) {
      if (
        friends[i].id === chats[j].user1_id ||
        friends[i].id === chats[j].user2_id
      ) {
        newChat.push(chats[j]);
        flag = true;
      }
    }

    if (!flag) newFriends.push(friends[i]);
  }

  return [newFriends, newChat];
}
