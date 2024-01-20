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
        <span className="text-xl font-semibold flex-1 text-[#56616b] dark:text-dark_text">
          Messages
        </span>
        <div className="flex gap-2">
          <ChatHeaderButton
            icon_name="MoreVertical"
            width={17}
            height={17}
            tooltip_title="Learn more"
            placement="left"
            className="p-2 min-w-0 bg-gray-200 shadow border-1 dark:bg-dark_bg dark:border-dark_border dark:text-dark_text hover:dark:bg-dark_text"
            onClick={moreButtonOnClick}
          />

          <ChatHeaderButton
            icon_name="MessageSquarePlus"
            width={17}
            height={17}
            tooltip_title="Add new chat"
            placement="right"
            className="p-2 min-w-0 bg-gray-200 shadow border-1 dark:bg-dark_bg dark:border-dark_border dark:text-dark_text hover:dark:bg-dark_text"
            onClick={newChatButtonOnClick}
          />
        </div>
      </div>

      <div className="py-2.5 px-3 bg-gray-100 rounded-lg border-1 flex items-center dark:bg-dark_bg dark:border-dark_border">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search"
            className="bg-inherit w-full focus:outline-none placeholder:dark:text-dark_text dark:text-dark_text placeholder:font-semibold"
            value={searchValue}
            onChange={searchOnChange}
          />
        </div>

        <div>
          <Search
            width={19}
            height={19}
            className="opacity-70 dark:text-dark_text"
          />
        </div>
      </div>
    </div>
  );
}
