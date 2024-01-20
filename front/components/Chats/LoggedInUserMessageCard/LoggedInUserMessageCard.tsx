// components
import { Check, CheckCheck } from "lucide-react";

// interfaces
import type { TMessageCard } from "@/interfaces/interfaces";

export default function LoggedInUserMessageCard({ message }: TMessageCard) {
  return (
    <div className="flex gap-3 justify-end">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 justify-end">
          <span className="text-xs text-[#56616b]">{message.timestamp}</span>
          <span className="text-sm font-semibold dark:text-dark_text">
            {message.name} {message.lastname}
          </span>
        </div>

        <div className="px-3 py-2 bg-[#009965] rounded-lg text-white max-w-[400px] flex items-end gap-3 dark:bg-dark_text">
          <div className="flex-1">{message.value}</div>
          {message.status === 1 ? (
            <span>
              <CheckCheck width={13} height={13} color="white" />
            </span>
          ) : (
            <span>
              <Check width={13} height={13} color="white" />
            </span>
          )}
        </div>
      </div>

      <div className="w-11 h-11 bg-gray-400 rounded-full" />
    </div>
  );
}
