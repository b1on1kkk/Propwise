"use client";

import { useReducer } from "react";

// components
import CreateEventInputWrapper from "../CreateEvent/CreateEventInputWrapper/CreateEventInputWrapper";
import CreateEventTimeInput from "../CreateEvent/CreateEventTimeInput/CreateEventTimeInput";
import { X, Calendar, ArrowRight } from "lucide-react";
import ModalWrapper from "../ModalWrapper/ModalWrapper";
import CreateEventInputLink from "../CreateEvent/CreateEventInputLink/CreateEventInputLink";

// utils
import { format } from "date-fns";
import { useOutsideClick } from "@/hooks/useOutsideClick ";
import { useGlobalModalStatus } from "@/context/CreateNewTaskModalContext";
import { CheckForEmptyFields } from "@/utils/CheckForEmptyFields";
import { GetEvents } from "@/API/GetUsersEvents";

// reducers
import {
  AddingEventReducer,
  NewEventInitialState,
  AddingNewEventTypes
} from "./NewEventReducer/NewEventReducer";

// API
import { InsertEvent } from "@/API/InsertEvent";

// interfaces
import type { Events } from "@/interfaces/interfaces";

export default function AddingEventModal() {
  const {
    createModalStatus,
    setCreateModalStatus,
    chosenDay,
    setEvents,
    user
  } = useGlobalModalStatus();

  const handleClickOutside = () => {
    if (createModalStatus) setCreateModalStatus(!createModalStatus);
  };

  const [state, dispatch] = useReducer(AddingEventReducer, {
    ...NewEventInitialState
  });

  const emptyFields = CheckForEmptyFields(state);

  function CreateEvent() {
    if (emptyFields) {
      const user_id = user[0].id;

      InsertEvent(user_id, state, chosenDay).then(() => {
        GetEvents(user_id, chosenDay!.month).then((events: Events[]) =>
          setEvents(events)
        );
      });

      setCreateModalStatus(!createModalStatus);
      dispatch({ type: AddingNewEventTypes.CLEAR, payload: "" });
    }
  }

  return (
    <ModalWrapper status={createModalStatus}>
      <div
        className="w-[450px] h-[500px] bg-white rounded-lg shadow-2xl"
        ref={useOutsideClick(handleClickOutside)}
      >
        <header className="px-5 py-3 border-b-2 flex">
          <span className="font-semibold flex-1 text-lg">Create event</span>
          <button onClick={() => setCreateModalStatus(!createModalStatus)}>
            <X color="#56616b" />
          </button>
        </header>

        <main className="p-5 border-b-1 flex flex-col gap-3">
          <CreateEventInputWrapper>
            <input
              type="text"
              placeholder="Enter title*"
              className="w-full focus:outline-none"
              onChange={(e) =>
                dispatch({
                  type: AddingNewEventTypes.EVENT_NAME,
                  payload: e.target.value
                })
              }
              value={state.eventName}
            />
          </CreateEventInputWrapper>

          <CreateEventInputWrapper>
            <div>
              <Calendar width={20} height={20} />
            </div>
            <div>
              {chosenDay && (
                <span>
                  {chosenDay?.week_day}, {chosenDay?.month},{" "}
                  {format(chosenDay?.day, "d")}
                </span>
              )}
            </div>
          </CreateEventInputWrapper>

          <div className="flex gap-2 items-center">
            <CreateEventTimeInput
              text="From*"
              onChange={(e) =>
                dispatch({
                  type: AddingNewEventTypes.TIME_FROM,
                  payload: e.target.value
                })
              }
              value={state.timeFrom}
            />

            <ArrowRight width={20} height={20} color="#56616b" />

            <CreateEventTimeInput
              text="To*"
              onChange={(e) =>
                dispatch({
                  type: AddingNewEventTypes.TIME_TO,
                  payload: e.target.value
                })
              }
              value={state.timeTo}
            />
          </div>

          <CreateEventInputLink
            text="Enter link"
            onChange={(e) =>
              dispatch({
                type: AddingNewEventTypes.LINK,
                payload: e.target.value
              })
            }
            value={state.link}
          />

          <div className="mt-3">
            <CreateEventInputWrapper>
              <div className="h-[90px] w-full">
                <textarea
                  className="resize-none w-full h-full focus:outline-none"
                  placeholder="Add a descriptions*"
                  onChange={(e) =>
                    dispatch({
                      type: AddingNewEventTypes.SHORT_DESCRIPTION,
                      payload: e.target.value
                    })
                  }
                  value={state.shortDescription}
                />
              </div>
            </CreateEventInputWrapper>
          </div>
        </main>

        <footer className="px-5 py-3 flex text-sm font-semibold gap-2">
          <button
            className="flex-1 py-3 border-1 shadow rounded-lg hover:bg-gray-100 transition-all duration-200 ease-in"
            onClick={() => {
              setCreateModalStatus(!createModalStatus);
              dispatch({ type: AddingNewEventTypes.CLEAR, payload: "" });
            }}
          >
            Cancel
          </button>
          <button
            className={`flex-1 py-3 border-1 shadow rounded-lg ${
              emptyFields
                ? "bg-[#009965] hover:bg-green-700 border-green-700"
                : "bg-gray-400"
            } text-white transition-all duration-200 ease-in`}
            type="submit"
            onClick={CreateEvent}
          >
            Create event
          </button>
        </footer>
      </div>
    </ModalWrapper>
  );
}
