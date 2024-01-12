// components
import ChatHeaderButton from "../ChatHeaderButton/ChatHeaderButton";
import { Search } from "lucide-react";

// interfaces
import type { TAsideChatsHeader } from "@/interfaces/interfaces";

export default function AsideChatsHeader({
  searchValue,
  showFriends,
  moreButtonOnClick,
  newChatButtonOnClick,
  searchOnChange
}: TAsideChatsHeader) {
  return (
    <div className="flex flex-col gap-5 p-5">
      <div className="flex">
        <span className="text-xl font-semibold flex-1 text-[#56616b]">
          Messages
        </span>
        <div className="flex gap-2">
          <ChatHeaderButton
            icon_name="MoreVertical"
            onClick={moreButtonOnClick}
            chosen={false}
          />

          <ChatHeaderButton
            icon_name="MessageSquarePlus"
            onClick={newChatButtonOnClick}
            chosen={showFriends}
          />
        </div>
      </div>

      <div className="p-3 bg-gray-100 rounded-lg flex items-center">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search..."
            className="bg-inherit w-full focus:outline-none"
            value={searchValue}
            onChange={searchOnChange}
          />
        </div>

        <div>
          <Search width={19} height={19} />
        </div>
      </div>
    </div>
  );
}
