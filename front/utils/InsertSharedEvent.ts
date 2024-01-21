// API
import { InsertEvent } from "@/API/InsertEvent";

// interfaces
import type { Events } from "@/interfaces/interfaces";

// insert shared event to database
export function InsertSharedEvent(event: Events, user_id: number) {
  // prepare data
  const stateValues = {
    eventName: event.event_name,
    timeFrom: event.time_from,
    timeTo: event.time_to,
    shortDescription: event.description,
    link: event.link
  };

  InsertEvent(
    user_id,
    stateValues,
    {
      day: event.day,
      week_day: event.week_day,
      month: event.month
    },
    true
  );
}
