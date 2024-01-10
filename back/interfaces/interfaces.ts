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
