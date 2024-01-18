import type {
  TNewEventInitialState,
  AddingEventAction,
  AddingEventState
} from "@/interfaces/interfaces";

export const NewEventInitialState: TNewEventInitialState = {
  eventName: "",
  timeFrom: "",
  timeTo: "",
  shortDescription: "",
  link: ""
};

export enum AddingNewEventTypes {
  EVENT_NAME = "EVENT_NAME",
  TIME_FROM = "TIME_FROM",
  TIME_TO = "TIME_TO",
  SHORT_DESCRIPTION = "SHORT_DESCRIPTION",
  LINK = "LINK",
  CLEAR = "CLEAR"
}

export function AddingEventReducer(
  state: AddingEventState,
  action: AddingEventAction
) {
  const { type, payload } = action;
  switch (type) {
    case AddingNewEventTypes.EVENT_NAME:
      return {
        ...state,
        eventName: payload
      };
    case AddingNewEventTypes.SHORT_DESCRIPTION:
      return {
        ...state,
        shortDescription: payload
      };
    case AddingNewEventTypes.TIME_FROM:
      return {
        ...state,
        timeFrom: payload
      };
    case AddingNewEventTypes.TIME_TO:
      return {
        ...state,
        timeTo: payload
      };
    case AddingNewEventTypes.LINK:
      return {
        ...state,
        link: payload
      };
    case AddingNewEventTypes.CLEAR:
      return { ...NewEventInitialState };
    default:
      return state;
  }
}
