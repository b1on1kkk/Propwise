// components
import ChatHeaderButton from "../ChatHeaderButton/ChatHeaderButton";
import { Search } from "lucide-react";

// interfaces
import type { TAsideChatsHeader } from "@/interfaces/interfaces";

export default function AsideChatsHeader({
  searchValue,
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
            width={17}
            height={17}
            tooltip_title="Learn more"
            placement="left"
            className="p-2 min-w-0 bg-gray-200 shadow border-1"
            onClick={moreButtonOnClick}
          />

          <ChatHeaderButton
            icon_name="MessageSquarePlus"
            width={17}
            height={17}
            tooltip_title="Add new chat"
            placement="right"
            className="p-2 min-w-0 bg-gray-200 shadow border-1"
            onClick={newChatButtonOnClick}
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
