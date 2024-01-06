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
}

export interface NewDays {
  id: number;
  day: Date;
  month: string;
  week_day: string;
  createEvent: boolean;
}

export interface TNewEventInitialState {
  eventName: string;
  timeFrom: string;
  timeTo: string;
  shortDescription: string;
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
  hideAsideMenu: boolean;
  user: User[];
  onlineUsers: OnlineSocketUsers[];
}

export interface TCalendarSettings {
  id: number;
  text: string;
  move_to: string;
}
