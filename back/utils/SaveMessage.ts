import { db } from "../global/db";

import type { TSendPrivateMessages } from "../interfaces/interfaces";

export function SaveMessage(message: TSendPrivateMessages) {
  const reconfiguration = {
    chat_id: message.chat_id,
    sender_id: message.sender_id,
    value: message.value,
    timestamp: message.timestamp,
    status: message.status
  };

  db.query("INSERT INTO messages SET ?", [reconfiguration], (error: Error) => {
    if (error) return error;
  });
}
