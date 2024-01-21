// components
import { Check, CheckCheck, Calendar } from "lucide-react";

// hooks
import { useLocalStorageLastChosenChat } from "@/hooks/useLocalStorageLastChosenChat";

// interfaces
import type { TMessageCard, Events } from "@/interfaces/interfaces";

export default function LoggedInUserSharedMessageEventCard({
  message
}: TMessageCard) {
  const sharedValue: Events = JSON.parse(message.value);

  const { storedValue } = useLocalStorageLastChosenChat(
    "last_chosen_chat",
    null
  );

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
          <div className="flex-1 flex flex-col gap-2">
            <div>Hey, {storedValue?.name}! Watch this event!</div>
            <div className="flex dark:bg-gray-600 rounded-lg p-2 items-center gap-2">
              <div className="p-2 bg-gray-700 rounded-lg">
                <Calendar />
              </div>
              <div className="flex flex-col">
                <div className="text-base">
                  {sharedValue.week_day} {sharedValue.day} {sharedValue.month}
                </div>
                <div className="text-sm font-semibold">
                  {sharedValue.time_from} - {sharedValue.time_to}
                </div>
                {sharedValue.link && (
                  <div>
                    <a
                      href={sharedValue.link}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1"
                    >
                      <span className="dark:text-indigo-400 underline underline-offset-2 text-white">
                        Learn...
                      </span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
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
