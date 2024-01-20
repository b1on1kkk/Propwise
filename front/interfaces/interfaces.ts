import { AddingNewEventTypes } from "@/components/NewEventModal/NewEventReducer/NewEventReducer";

export interface Events {
  event_id: number;
  user_id: number;
  event_name: string;
  month: string;
  week_day: string;
  day: string;
  time_from: string;
  time_to: string;
  description: string;
  link: string;
}

export interface NewDays {
  id: number;
  day: Date;
  month: string;
  week_day: string;
  create_event: boolean;
  mouse_over: boolean;
}

export interface TNewEventInitialState {
  eventName: string;
  timeFrom: string;
  timeTo: string;
  shortDescription: string;
  link: string;
}

export interface User {
  id: number;
  name: string;
  lastname: string;
  email: string;
  avatar: string;
  role: string;
}

export interface TCalendarHeaderButton {
  left_icon?: React.ReactNode;
  title?: string;
  onClick: () => void;
  right_icon?: React.ReactNode;
  bg_color: string;
  text_color: string;
}

export interface TCreateEventTimeInput {
  text: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export interface MenuData {
  id: number;
  icon_name: string;
  text: string;
  status: boolean;
}

export interface TLinksBlock {
  title?: string;
  data: MenuData[];
  onMouseFunction: (
    data: MenuData[],
    chosen: MenuData,
    setter: React.Dispatch<React.SetStateAction<MenuData[]>>
  ) => void;
  setter: React.Dispatch<React.SetStateAction<MenuData[]>>;
  till_end_status?: boolean;
}

export interface TRegistrationInput {
  icon_name: string;
  type: string;
  placeholder: string;
  eye_active: boolean;
  error_text: string;
  registr_new_accout: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  validity_status: boolean;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  showPassword?: boolean;
  setShowPassword?: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface OnlineSocketUsers {
  user_id: number;
  socket_id: string;
}

export interface TAvatarAndRole {
  hideAsideMenuStatus: boolean;
  user_data: User[] | undefined;
  user_isloading: boolean;
  user_iserror: boolean;
  onlineUsers: OnlineSocketUsers[];
}

export interface TCalendarSettings {
  id: number;
  text: string;
}

export interface TEventCard {
  name: string;
  week_day: string;
  month: string;
  day: string;
  time_from: string;
  time_to: string;
  description: string;
  link: string;
}

export interface TShowMoreEventsModal {
  day: NewDays | null;
}

export interface TBlockInf {
  icon: React.ReactNode;
  text: string;
}

export interface AddingEventAction {
  type: AddingNewEventTypes;
  payload: string;
}

export interface AddingEventState {
  eventName: string;
  timeFrom: string;
  timeTo: string;
  shortDescription: string;
  link: string;
}

export interface TSmallEventCard {
  link: string;
  name: string;
  description: string;
}

export interface ExtendedLocalStorageType extends TCalendarSettings {
  status: boolean;
}

export interface Members extends User {
  status: "accepted" | "pending" | "declined" | null;
}

export interface TMemberCard {
  member: Members;
}

export interface TStatusButton {
  icon_name: string;
  className: string;
  onClick: () => void;
  picture_size: number;
}

export interface TNotifications {
  notif_id: number;
  context: {
    content: string;
    user: User;
  };
  notif_type: "system" | "friend_request";
  status: number;
  timestamp: string;
}

export interface TNotificationsFromDatabase {
  notif_id: number;
  context: string;
  notif_type: "system" | "friend_request";
  status: number;
  timestamp: string;
}

export interface TFriendRequestNotificationCard {
  friends: TFriends[];
  notification: TNotifications;
  CreateFriendship: () => void;
  DeclinedFriendship: () => void;
  DeleteNotification: () => void;
}

export interface TNotificationsModal {
  friends: TFriends[];
  notifications: TNotifications[];
  NotReadedStatus: boolean;
  setNotifications: (c: TNotifications[]) => void;
  onClick: () => void;
}

export interface TAsideChatsHeader {
  searchValue: string;
  moreButtonOnClick: () => void;
  newChatButtonOnClick: () => void;
  searchOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface TChats {
  icon_name: string;
  title_text: string;
  chatStatus: "pinned" | "all";
  chatArray: TChat[];
  onDoubleClickToPinMessage: (
    e: React.MouseEvent<HTMLDivElement>,
    chat: TChat
  ) => void;
}

export interface TStartMessagingCard {
  friend: TFriends;
  createChatOnClick: () => void;
}

export interface TFriends extends User {
  status: "pending" | "accepted" | "declined";
}

export interface TChat extends User {
  chat_id: number;
  user1_id: number;
  user2_id: number;
  chat_status: "pinned" | "all";
  sender_id: number;
  value: string;
  timestamp: string;
  status: number;
}

export interface TMessageInput {
  value: string;
  SubmitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface TChatHeader {
  isOnlineStatus: boolean;
  moreAboutUserStatus: boolean;
  searchOnClick: () => void;
  moreAboutUserOnClick: () => void;
}

export interface Messages {
  message_id: number;
  name: string;
  lastname: string;
  sender_id: number;
  value: string;
  timestamp: string;
  status: number;
}

export interface TUserInfo {
  isOnlineStatus: boolean;
  onClick: () => void;
}

export interface TMessageCard {
  message: Messages;
}

export interface TChatCard {
  chat: TChat;
  chatStatus: "pinned" | "all";
  onDoubleClickToPinMessage: (
    e: React.MouseEvent<HTMLDivElement>,
    chat: TChat
  ) => void;
}
