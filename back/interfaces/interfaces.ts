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

export interface TSendPrivateMessages {
  message_id: number;
  name: string;
  lastname: string;
  chat_id: number;
  sender_id: number;
  sender_socket: string;
  to_send_id: number;
  value: string;
  timestamp: string;
  status: number;
}

export interface TPinMessage {
  chat_id: number;
  to_change_status: string;
  socket_to_send: string;
  user_id: number;
}

export interface TDeleteChat {
  sender_socket: string;
  chat_id: number;
  user1_id: number;
  user2_id: number;
}

export interface TUpdateStatusMessages {
  indexes_to_update: number[];
  chat_id: number;
  user1_id: number;
  user2_id: number;
}

export interface TUpdateNotificationStatus {
  user_id: number;
  socket_id: string;
}

export interface TGetPrivateMessage {
  message_id: number;
  name: string;
  lastname: string;
  sender_id: number;
  value: string;
  timestamp: string;
  status: number;
}

export interface TSendNotificationsFrom {
  notif_id: number;
  message: string;
  notif_type: "system" | "friend_request";
  status: number;
  timestamp: string;
}
