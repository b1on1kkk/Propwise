export interface TsendNotificationsTo {
  user_id: number;
  notif_type: "system" | "friend_request";
  message: string;
  status: number;
  timestamp: string;
}

export interface TonlineUsers {
  user_id: number;
  socket_id: string;
}

export interface TCreateChat {
  user1_id: number;
  user2_id: number;
  to_send_socket_id: string;
  chat_status: "pinned" | "all";
}
