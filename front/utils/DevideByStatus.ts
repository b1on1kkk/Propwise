import { TChat } from "@/interfaces/interfaces";

export function DevideByStatus(chatArray: TChat[]): [TChat[], TChat[]] {
  const pinned: TChat[] = [];
  const basic: TChat[] = [];

  chatArray.forEach((chat) => {
    if (chat.chat_status === "pinned") pinned.push(chat);
    else basic.push(chat);
  });

  return [pinned, basic];
}
