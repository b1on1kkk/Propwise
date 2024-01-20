import Link from "next/link";

// components
import ChatCard from "./ChatCard/ChatCard";
import { Accordion, AccordionItem } from "@nextui-org/react";
import Icon from "../Icon/Icon";

// context
import { useInboxContext } from "@/context/InboxContext";

// utils
import { DevideByStatus } from "@/utils/DevideByStatus";

// interfaces
import type { TChats } from "@/interfaces/interfaces";

export default function Chats({
  icon_name,
  title_text,
  chatStatus,
  chatArray,
  onDoubleClickToPinMessage
}: TChats) {
  const { setValue } = useInboxContext();

  // storage of chats
  const [Pinned, Messages] = DevideByStatus(chatArray);

  return (
    <Accordion
      itemClasses={{ title: "text-sm text-[#56616b]" }}
      className="overflow-auto"
    >
      <AccordionItem
        aria-label={icon_name}
        title={title_text}
        startContent={<Icon icon_name={icon_name} width={15} height={15} />}
        className="dark:text-dark_text"
      >
        {chatStatus === "pinned" ? (
          <>
            {Pinned.length > 0 ? (
              <>
                {Pinned.map((chat, idx) => {
                  return (
                    <Link
                      href={`/inbox/${chat.id}`}
                      key={idx}
                      onClick={() => setValue(chat)}
                    >
                      <ChatCard
                        chat={chat}
                        chatStatus={chatStatus}
                        onDoubleClickToPinMessage={onDoubleClickToPinMessage}
                      />
                    </Link>
                  );
                })}
              </>
            ) : (
              <div className="text-center text-sm">
                There are no chats yet...
              </div>
            )}
          </>
        ) : (
          <>
            {Messages.length > 0 ? (
              <>
                {Messages.map((chat, idx) => {
                  return (
                    <Link
                      href={`/inbox/${chat.id}`}
                      key={idx}
                      onClick={() => setValue(chat)}
                    >
                      <ChatCard
                        chat={chat}
                        chatStatus={chatStatus}
                        onDoubleClickToPinMessage={onDoubleClickToPinMessage}
                      />
                    </Link>
                  );
                })}
              </>
            ) : (
              <div className="text-center text-sm">
                There are no chats yet...
              </div>
            )}
          </>
        )}
      </AccordionItem>
    </Accordion>
  );
}
