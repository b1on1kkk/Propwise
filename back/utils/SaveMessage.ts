import { db } from "../global/db";

import type { SendPrivateMessages } from "../interfaces/interfaces";

export function SaveMessage(message: SendPrivateMessages) {
  const reconfiguration = {
    chat_id: message.chat_id,
    sender_id: message.sender_id,
    value: message.value,
    timestamp: message.timestamp
  };

  db.query("INSERT INTO messages SET ?", [reconfiguration], (error: Error) => {
    if (error) return error;
  });
}
