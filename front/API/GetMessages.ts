import axios from "axios";

import type { Messages } from "@/interfaces/interfaces";
import { useQuery } from "@tanstack/react-query";

interface TMessagesQueryKey {
  queryKey: {
    key: string;
    params: {
      chat_id: number;
    };
  }[];
  signal: AbortSignal;
  meta: Record<string, unknown> | undefined;
}

export function GetMessages(
  chat_id: number,
  cb: (messages: Messages[]) => void
) {
  return useQuery({
    queryKey: [{ key: "messages", params: { chat_id: chat_id } }],
    queryFn: async (key: TMessagesQueryKey) => {
      const res = await axios.get(
        `http://localhost:2000/messages?chat_id=${key.queryKey[0].params.chat_id}`
      );

      cb(res.data);

      return 0;
    }
  });
}
