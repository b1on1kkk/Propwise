import type {
  TNotificationsFromDatabase,
  TFriendsWithoutChat,
  TChat
} from "./interfaces/interfaces";

export interface ServerToClientEvents {
  getOnlineUsersId: (data: { user_id: number; socket_id: string }[]) => void;
  sendNotificationsFrom: (data: {
    notif_id: number;
    message: string;
    notif_type: "system" | "friend_request";
    status: number;
    timestamp: string;
  }) => void;
  getMembersFromSocket: (data: { content: any }) => void;
  updatedNotifications: (data: {
    notifications: TNotificationsFromDatabase[];
  }) => void;
  updateFriends: (data: {
    friends: TFriendsWithoutChat[];
    chats: TChat[];
  }) => void;
  getPrivateMessage: (data: {
    name: string;
    lastname: string;
    sender_id: number;
    value: string;
    timestamp: string;
  }) => void;
}

export interface ClientToServerEvents {
  userConnected: (data: { new_connected_user_id: number }) => void;
  sendNotificationsTo: (data: {
    user_id: number;
    notif_type: "system" | "friend_request";
    message: string;
    status: number;
    timestamp: string;
  }) => void;
  updateMembers: (data: { user1_id: number; user2_id: number }) => void;
  updateNotificationStatus: (data: {
    user_id: number;
    socket_id: string;
  }) => void;
  createChat: (data: {
    user1_id: number;
    user2_id: number;
    to_send_socket_id: string;
    chat_status: "pinned" | "all";
  }) => void;
  sendPrivateMessage: (data: {
    name: string;
    lastname: string;
    chat_id: number;
    sender_id: number;
    sender_socket: string;
    to_send_id: number;
    value: string;
    timestamp: string;
  }) => void;
}
