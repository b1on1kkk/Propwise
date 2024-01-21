// components
import { Calendar, Plus } from "lucide-react";

// context
import { useGlobalModalStatus } from "@/context/CreateNewTaskModalContext";

// interfaces
import type {
  Events,
  FriendSharedMessageEventCard
} from "@/interfaces/interfaces";

import { Button } from "@nextui-org/react";

export default function FriendSharedMessageEventCard({
  message,
  onAddFriendsEvent
}: FriendSharedMessageEventCard) {
  const sharedValue: Events = JSON.parse(message.value);

  const { user } = useGlobalModalStatus();

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
          <div className="flex-1 flex flex-col gap-2">
            <div>Hey, {user[0].name}! Watch this event!</div>
            <div className="flex dark:bg-gray-700 rounded-lg p-2 items-center gap-2 bg-gray-200">
              <div className="p-2 dark:bg-gray-800 rounded-lg text-[#56616b] bg-gray-300 dark:text-white">
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
                      <span className="text-indigo-400 underline underline-offset-2">
                        Learn...
                      </span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex mt-1">
            <Button
              className="p-2 w-full bg-gray-200 shadow-sm border-1 dark:bg-dark_bg dark:border-dark_border hover:dark:bg-dark_text"
              onClick={() => onAddFriendsEvent(sharedValue)}
            >
              <div>
                <Plus width={15} height={15} />
              </div>
              <div>Add event</div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
