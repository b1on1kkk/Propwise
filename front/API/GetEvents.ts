import axios from "axios";

import { useQuery } from "@tanstack/react-query";

// interfaces
import type { Events, User } from "@/interfaces/interfaces";

interface TEventsQueryKey {
  queryKey: {
    key: string;
    params: {
      user_id: number;
      month: string;
    };
  }[];
  signal: AbortSignal;
  meta: Record<string, unknown> | undefined;
}

export function GetEvents(user: User[], currentMonth: string) {
  return useQuery({
    queryKey: [
      {
        key: "events",
        params: {
          user_id: user.length > 0 ? user[0].id : 0,
          month: currentMonth
        }
      }
    ],
    queryFn: async (keys: TEventsQueryKey) => {
      if (user.length > 0) {
        const res = await axios.get(
          `http://localhost:2000/events?user_id=${keys.queryKey[0].params.user_id}&month=${keys.queryKey[0].params.month}`
        );
        return res.data as Events[];
      }

      return [];
    }
  });
}
