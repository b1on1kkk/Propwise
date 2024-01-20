"use client";

import { useReducer } from "react";

// components
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Tooltip
} from "@nextui-org/react";
import CreateEventInputWrapper from "../CreateEvent/CreateEventInputWrapper/CreateEventInputWrapper";
import { ArrowRight, Calendar } from "lucide-react";
import CreateEventTimeInput from "../CreateEvent/CreateEventTimeInput/CreateEventTimeInput";
import CreateEventInputLink from "../CreateEvent/CreateEventInputLink/CreateEventInputLink";

// API
import { InsertEvent } from "@/API/InsertEvent";

// context
import { useGlobalModalStatus } from "@/context/CreateNewTaskModalContext";
import { useGlobalCalendatContext } from "@/context/CalendarContext";

// utils
import { format } from "date-fns";
import {
  AddingEventReducer,
  AddingNewEventTypes,
  NewEventInitialState
} from "./NewEventReducer/NewEventReducer";
import { CheckForEmptyFields } from "@/utils/CheckForEmptyFields";

export default function NewEventModal({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { chosenDay, user } = useGlobalModalStatus();
  const { refetch } = useGlobalCalendatContext();

  const [state, dispatch] = useReducer(AddingEventReducer, {
    ...NewEventInitialState
  });

  const emptyFields = CheckForEmptyFields(state);

  function CreateEvent() {
    if (emptyFields) {
      const user_id = user[0].id;

      InsertEvent(user_id, state, chosenDay).then(() => refetch());

      onClose();
      dispatch({ type: AddingNewEventTypes.CLEAR, payload: "" });
    }
  }

  return (
    <Modal backdrop="opaque" isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="font-semibold flex-1 text-lg dark:text-dark_text">
              Create event
            </ModalHeader>
            <ModalBody>
              <CreateEventInputWrapper>
                <input
                  type="text"
                  placeholder="Enter title*"
                  className="w-full focus:outline-none dark:bg-inherit dark:text-dark_text placeholder:dark:text-dark_text"
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
                <div className="dark:text-dark_text">
                  <Calendar width={20} height={20} />
                </div>
                <div className="dark:text-dark_text">
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
                      className="resize-none w-full h-full focus:outline-none dark:bg-inherit dark:text-dark_text placeholder:dark:text-dark_text"
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
            </ModalBody>
            <ModalFooter>
              <Button
                className="shadow rounded-lg"
                color="danger"
                onPress={onClose}
              >
                Cancel
              </Button>

              {!emptyFields ? (
                <Tooltip
                  showArrow={true}
                  content="Fill in all necessary fields!"
                  color="warning"
                >
                  <Button
                    className={`py-3 shadow rounded-lg bg-gray-400 text-white`}
                    onClick={CreateEvent}
                  >
                    Create event
                  </Button>
                </Tooltip>
              ) : (
                <Button
                  className={`py-3 shadow rounded-lg text-white bg-[#009965] hover:bg-green-700`}
                  onClick={CreateEvent}
                >
                  Create event
                </Button>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
