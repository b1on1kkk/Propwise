import Link from "next/link";

// components
import { ClipboardList } from "lucide-react";

// constants
import { STATUS_BORDER_COLOR } from "@/constants/FilterCheckboxes";

// interfaces
import type { Events } from "@/interfaces/interfaces";

export default function SmallEventCard({ event }: { event: Events }) {
  return (
    <div
      className={`flex flex-col border-2 shadow p-2 rounded-lg gap-1 ${
        STATUS_BORDER_COLOR[event.status]
      }`}
    >
      <div className="flex gap-3 items-center">
        <div>
          <ClipboardList width={20} height={20} color="rgb(22 163 74)" />
        </div>

        {event.link ? (
          <Link href={event.link}>
            <div className="text-indigo-500">{event.event_name}</div>
          </Link>
        ) : (
          <div className="text-black dark:text-dark_text">
            {event.event_name}
          </div>
        )}
      </div>

      <div className="text-tiny dark:text-dark_text">{event.description}</div>
    </div>
  );
}
