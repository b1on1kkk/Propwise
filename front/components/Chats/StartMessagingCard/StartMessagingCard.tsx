// context
import { useGlobalModalStatus } from "@/context/CreateNewTaskModalContext";

// utils
import { CheckUserOnline } from "@/utils/CheckUserOnline";

// interfaces
import type { TStartMessagingCard } from "@/interfaces/interfaces";

export default function StartMessagingCard({
  friend,
  createChatOnClick
}: TStartMessagingCard) {
  const { onlineUsers } = useGlobalModalStatus();

  return (
    <div className="flex px-5 py-2 items-center gap-5">
      <div className="w-11 h-11 rounded-full bg-gray-400 relative">
        {CheckUserOnline(onlineUsers, friend.id) && (
          <span className="flex absolute h-2 w-2 bottom-0 right-0 mr-0.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#009965] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#009965]" />
          </span>
        )}
      </div>

      <div className="flex flex-col flex-1">
        <div className="flex w-full items-center">
          <div className="flex-1 font-bold">
            {friend.name} {friend.lastname}
          </div>
        </div>
        <div className="flex items-center">
          <div className="flex-1 text-sm">{friend.role}</div>
        </div>
      </div>

      <button
        className="text-sm px-3 py-2 bg-[#009965] text-white rounded-lg font-semibold cursor-pointer shadow active:translate-y-0.5 hover:bg-green-700"
        onClick={createChatOnClick}
      >
        Chatting!
      </button>
    </div>
  );
}
