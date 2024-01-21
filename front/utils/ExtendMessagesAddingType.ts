// utils
import { isJsonString } from "./isJsonString";

// interfaces
import { Messages, MessagesFromDatabase } from "@/interfaces/interfaces";

export function ExtendMessagesAddingType(messages: MessagesFromDatabase[]) {
  const extendedMessages: Messages[] = [];

  messages.forEach((ms) => {
    if (isJsonString(ms.value)) {
      extendedMessages.push({ ...ms, type: "shared_event" });
    } else {
      extendedMessages.push({ ...ms, type: "message" });
    }
  });

  return extendedMessages;
}
