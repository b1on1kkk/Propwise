import type { TNewEventInitialState } from "@/interfaces/interfaces";

export const NewEventInitialState: TNewEventInitialState = {
  eventName: "",
  timeFrom: "",
  timeTo: "",
  shortDescription: ""
};

export enum AddingNewEventTypes {
  EVENT_NAME = "EVENT_NAME",
  TIME_FROM = "TIME_FROM",
  TIME_TO = "TIME_TO",
  SHORT_DESCRIPTION = "SHORT_DESCRIPTION",
  CLEAR = "CLEAR"
}

interface AddingEventAction {
  type: AddingNewEventTypes;
  payload: string;
}

interface AddingEventState {
  eventName: string;
  timeFrom: string;
  timeTo: string;
  shortDescription: string;
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
    case AddingNewEventTypes.CLEAR:
      return { ...NewEventInitialState };
    default:
      return state;
  }
}
