// interfaces
import type { TMessageCard } from "@/interfaces/interfaces";

export default function FriendMessageCard({ message }: TMessageCard) {
  return (
    <div className="flex gap-3">
      <div className="w-11 h-11 bg-gray-400 rounded-full" />

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold dark:text-dark_text">
            {message.name} {message.lastname}
          </span>
          <span className="text-xs text-[#56616b]">{message.timestamp}</span>
        </div>

        <div className="px-3 py-2 bg-gray-100 rounded-lg max-w-[400px] dark:bg-slate-600">
          {message.value}
        </div>
      </div>
    </div>
  );
}
