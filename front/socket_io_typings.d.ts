import type {
  TNotificationsFromDatabase,
  TFriendsWithoutChat,
  TChat,
  MessagesFromDatabase
} from "./interfaces/interfaces";

import type {
  TsendNotificationsTo,
  TCreateChat,
  TSendPrivateMessages,
  TPinMessage,
  TDeleteChat,
  TUpdateStatusMessages,
  TUpdateNotificationStatus,
  TGetPrivateMessage,
  TSendNotificationsFrom,
  TGetUpdateReadMessageInChatSide,
  TUpdateReadMessageInChatSide,
  TUpdateChatsAfterSendingMessages,
  TGetUpdatedDataAfterSendingMessage
} from "../back/interfaces/interfaces";

export interface ServerToClientEvents {
  getOnlineUsersId: (data: { user_id: number; socket_id: string }[]) => void;

  sendNotificationsFrom: (data: TSendNotificationsFrom) => void;

  getMembersFromSocket: (data: { content: any }) => void;

  updatedNotifications: (data: {
    notifications: TNotificationsFromDatabase[];
  }) => void;

  updateFriends: (data: { chats: TChat[] }) => void;

  getPrivateMessage: (data: TGetPrivateMessage) => void;

  updateChats: (data: { chats: TChat[] }) => void;

  getUpdatedMessages: (data: { messages: MessagesFromDatabase[] }) => void;

  getUpdatedDataAfterSendingMessage: (
    data: TGetUpdatedDataAfterSendingMessage
  ) => void;

  getUpdateReadMessageInChatSide: (
    data: TGetUpdateReadMessageInChatSide
  ) => void;
}

export interface ClientToServerEvents {
  userConnected: (data: { new_connected_user_id: number }) => void;

  sendNotificationsTo: (data: TsendNotificationsTo) => void;

  updateMembers: (data: { user1_id: number; user2_id: number }) => void;

  updateNotificationStatus: (data: TUpdateNotificationStatus) => void;

  createChat: (data: TCreateChat) => void;

  sendPrivateMessage: (data: TSendPrivateMessages) => void;

  pinMessage: (data: TPinMessage) => void;

  deleteChat: (data: TDeleteChat) => void;

  updateStatusMessages: (data: TUpdateStatusMessages) => void;

  updateChatsAfterSendingMessages: (
    data: TUpdateChatsAfterSendingMessages
  ) => void;

  updateReadMessageInChatSide: (data: TUpdateReadMessageInChatSide) => void;
}
