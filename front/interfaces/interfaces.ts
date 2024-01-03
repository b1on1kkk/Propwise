export interface Events {
  eventName: string;
  month: string;
  week_day: string;
  day: string;
  time_from: string;
  time_to: string;
  description: string;
}

export interface NewDays {
  id: number;
  day: Date;
  month: string;
  week_day: string;
  createEvent: boolean;
}

export interface TNewEventInitialState {
  eventName: string;
  timeFrom: string;
  timeTo: string;
  shortDescription: string;
}
