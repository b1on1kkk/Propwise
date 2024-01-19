import axios from "axios";

import { TChat, User } from "@/interfaces/interfaces";
import { useQuery } from "@tanstack/react-query";

interface TMessagesQueryKey {
  queryKey: {
    key: string;
    params: {
      user_id: number;
    };
  }[];
  signal: AbortSignal;
  meta: Record<string, unknown> | undefined;
}

export function GetChats(user: User[]) {
  return useQuery({
    queryKey: [
      {
        key: "chats",
        params: {
          user_id: user.length > 0 ? user[0].id : 0
        }
      }
    ],
    queryFn: async (keys: TMessagesQueryKey) => {
      if (user.length > 0) {
        const res = await axios.get(
          `http://localhost:2000/chats?user_id=${keys.queryKey[0].params.user_id}`
        );
        return res.data as TChat[];
      }

      return [];
    }
  });
}
