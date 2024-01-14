// inefficient, linear search (better use binary search)

export function FindUser(
  to_find_user_id: number,
  onlineUsers: { user_id: number; socket_id: string }[]
) {
  for (let i = 0; i < onlineUsers.length; i++) {
    if (onlineUsers[i].user_id === to_find_user_id) {
      return onlineUsers[i].socket_id;
    }
  }

  return null;
}
