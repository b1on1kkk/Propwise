import type {
  TNotificationsFromDatabase,
  TFriendsWithoutChat,
  TChat
} from "./interfaces/interfaces";

import {
  TsendNotificationsTo,
  TCreateChat,
  TSendPrivateMessages,
  TPinMessage,
  TDeleteChat
} from "../back/interfaces/interfaces";

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

  updateChats: (data: { chats: TChat[] }) => void;
}

export interface ClientToServerEvents {
  userConnected: (data: { new_connected_user_id: number }) => void;

  sendNotificationsTo: (data: TsendNotificationsTo) => void;

  updateMembers: (data: { user1_id: number; user2_id: number }) => void;

  updateNotificationStatus: (data: {
    user_id: number;
    socket_id: string;
  }) => void;

  createChat: (data: TCreateChat) => void;

  sendPrivateMessage: (data: TSendPrivateMessages) => void;

  pinMessage: (data: TPinMessage) => void;

  deleteChat: (data: TDeleteChat) => void;
}
