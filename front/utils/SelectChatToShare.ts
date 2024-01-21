import { TChat } from "@/interfaces/interfaces";

export function ChatIncludeInArray(chat_id: number, isSelectedChats: TChat[]) {
  for (let i = 0; i < isSelectedChats.length; i++) {
    if (isSelectedChats[i].chat_id === chat_id) return true;
  }
  return false;
}

export function SelectChatToShare(
  chat: TChat,
  isSelectedChats: TChat[],
  cb: (c: TChat[]) => void
) {
  if (ChatIncludeInArray(chat.chat_id, isSelectedChats)) {
    cb([...isSelectedChats.filter((chats) => chats.chat_id !== chat.chat_id)]);

    return;
  }

  cb([...isSelectedChats, chat]);
}
