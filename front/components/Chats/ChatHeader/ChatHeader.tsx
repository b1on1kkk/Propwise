// components
import HeaderUserInf from "../HeaderUserInf/HeaderUserInf";
import ChatHeaderButton from "@/components/ChatHeaderButton/ChatHeaderButton";

// context
import { useInboxContext } from "@/context/InboxContext";

// interfaces
import { TChatHeader } from "@/interfaces/interfaces";

export default function ChatHeader({
  isOnlineStatus,
  moreAboutUserStatus,
  searchOnClick,
  moreAboutUserOnClick
}: TChatHeader) {
  const { storedValue } = useInboxContext();

  return (
    <header className="p-5 border-b-1 dark:border-dark_border">
      <div className="flex items-center">
        <HeaderUserInf
          name={storedValue!.name}
          lastname={storedValue!.lastname}
          online_status={isOnlineStatus ? "online" : "last seen recently"}
        >
          <div className="h-11 w-11 bg-gray-400 rounded-full" />
        </HeaderUserInf>

        <div className="flex gap-2">
          <div>
            <ChatHeaderButton
              className="p-2 min-w-0 bg-gray-200 shadow border-1 dark:bg-dark_bg dark:border-dark_border dark:text-dark_text hover:dark:bg-dark_text"
              icon_name="Search"
              width={17}
              height={17}
              tooltip_title="Find message"
              placement="top"
              onClick={searchOnClick}
            />
          </div>
          <div>
            <ChatHeaderButton
              className="p-2 min-w-0 bg-gray-200 shadow border-1 dark:bg-dark_bg dark:border-dark_border dark:text-dark_text hover:dark:bg-dark_text border-none"
              icon_name="PanelRight"
              width={17}
              height={17}
              tooltip_title="More about user"
              placement="top"
              onClick={moreAboutUserOnClick}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
