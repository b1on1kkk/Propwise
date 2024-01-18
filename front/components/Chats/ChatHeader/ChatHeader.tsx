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
    <header className="p-5 border-b-1">
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
