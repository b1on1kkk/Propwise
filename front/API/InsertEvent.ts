import axios from "axios";
import { format } from "date-fns";

// interfaces
import type { NewDays, AddingEventState } from "@/interfaces/interfaces";

export async function InsertEvent(
  user_id: number,
  state: AddingEventState,
  chosenDay: NewDays | null
) {
  try {
    await axios.post("http://localhost:2000/insert_event", {
      user_id: user_id,
      description: state.shortDescription,
      event_name: state.eventName,
      day: format(chosenDay!.day, "d"),
      week_day: chosenDay!.week_day,
      month: chosenDay!.month,
      time_from: state.timeFrom,
      time_to: state.timeTo,
      link: state.link
    });
  } catch (error) {
    console.log(error);
  }
}
