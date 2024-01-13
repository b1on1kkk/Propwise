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
  moreOnClick,
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
              onClick={searchOnClick}
              chosen={false}
            />
          </div>
          <div>
            <ChatHeaderButton
              icon_name="MoreVertical"
              onClick={moreOnClick}
              chosen={false}
            />
          </div>
          <div>
            <ChatHeaderButton
              icon_name="PanelRight"
              onClick={moreAboutUserOnClick}
              chosen={moreAboutUserStatus}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
