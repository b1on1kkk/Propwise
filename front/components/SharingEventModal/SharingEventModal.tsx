"use client";

import { useState } from "react";

// utils
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Checkbox,
  cn,
  User
} from "@nextui-org/react";

// context
import { useGlobalModalStatus } from "@/context/CreateNewTaskModalContext";

// utils
import { ShareEvents } from "@/utils/ShareEvents";
import {
  ChatIncludeInArray,
  SelectChatToShare
} from "@/utils/SelectChatToShare";

// interfaces
import type { TChat, TSharingEventModal } from "@/interfaces/interfaces";
import { GetChats } from "@/API/GetChats";

export default function SharingEventModal({
  isOpen,
  onClose,
  chosenEvent,
  detailedModalStatus,
  setDetailedModalStatus
}: TSharingEventModal) {
  const { user, socket } = useGlobalModalStatus();
  const [isSelectedChats, setIsSelectedChats] = useState<TChat[]>([]);

  const chats = GetChats(user);

  return (
    <Modal
      size="xl"
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setDetailedModalStatus(!detailedModalStatus);
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Share With:
            </ModalHeader>
            <ModalBody>
              {chats.data && (
                <>
                  {chats.data.map((chat) => {
                    return (
                      <Checkbox
                        key={chat.chat_id}
                        aria-label={"Alex"}
                        classNames={{
                          base: cn(
                            "inline-flex w-full bg-content",
                            "hover:bg-content2 items-center justify-start",
                            "cursor-pointer rounded-lg p-2 border-2 border-transparent",
                            "data-[selected=true]:border-primary"
                          ),
                          label: "w-full"
                        }}
                        isSelected={ChatIncludeInArray(
                          chat.chat_id,
                          isSelectedChats
                        )}
                        onChange={() =>
                          SelectChatToShare(chat, isSelectedChats, (chats) => {
                            setIsSelectedChats(chats);
                          })
                        }
                      >
                        <div className="w-full flex flex-col">
                          <User
                            name={chat.name}
                            avatarProps={{
                              name: chat.name[0]
                            }}
                          />
                        </div>
                      </Checkbox>
                    );
                  })}
                </>
              )}
            </ModalBody>
            <ModalFooter>
              <Button
                color={`${isSelectedChats.length > 0 ? "primary" : "default"}`}
                onClick={() => {
                  if (isSelectedChats.length > 0 && chosenEvent) {
                    onClose();
                    ShareEvents(chosenEvent, isSelectedChats, user[0], socket);
                  }
                }}
              >
                Share
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
