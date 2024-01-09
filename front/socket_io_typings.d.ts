export interface ServerToClientEvents {
  getOnlineUsersId: (data: { user_id: number; socket_id: string }[]) => void;
  sendNotificationsFrom: (data: {
    message: string;
    notif_type: "system" | "friend_request";
  }) => void;
}

export interface ClientToServerEvents {
  userConnected: (data: { new_connected_user_id: number }) => void;
  sendNotificationsTo: (data: {
    user_id: number;
    notif_type: "system" | "friend_request";
    message: string;
  }) => void;
}
