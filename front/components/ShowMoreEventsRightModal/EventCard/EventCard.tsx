// components
import { BookText, Calendar, Clock, AlertCircle, Asterisk } from "lucide-react";
import BlockInf from "./BlockInf/BlockInf";
import { ExternalLink } from "lucide-react";
import { Button, Tooltip } from "@nextui-org/react";

// constants
import { STATUS_BORDER_COLOR } from "@/constants/FilterCheckboxes";

// interfaces
import type { TEventCard } from "@/interfaces/interfaces";

export default function EventCard({ event, onShareClick }: TEventCard) {
  return (
    <div
      className={`border-2 rounded-lg shadow flex p-3 text-[#56616b] flex-col gap-1 ${
        STATUS_BORDER_COLOR[event.status]
      }`}
    >
      <div className="text-xl font-semibold text-center flex items-center mb-3">
        <div>
          {event.status === "imp" || event.status === "impbnurg" ? (
            <Tooltip color="danger" content="Important!" closeDelay={0}>
              <AlertCircle color="#C20E4D" />
            </Tooltip>
          ) : event.status === "nimpburg" ? (
            <Tooltip
              color="success"
              content="Not important but urgent"
              closeDelay={0}
            >
              <Asterisk color="#F9C97C" />
            </Tooltip>
          ) : (
            <Tooltip color="default" content="Not important" closeDelay={0}>
              <Asterisk color="#71717A" />
            </Tooltip>
          )}
        </div>
        {event.link ? (
          <a
            href={event.link}
            target="_blank"
            rel="noreferrer"
            className="flex-1"
          >
            <span className="text-indigo-500">{event.event_name}</span>
          </a>
        ) : (
          <span className="dark:text-dark_text flex-1">{event.event_name}</span>
        )}

        <Tooltip content="Share" className="dark:text-dark_text">
          <Button
            className="min-w-0 p-2 bg-white border-1 shadow h-15 rounded-lg text-[#56616b] dark:bg-dark_bg dark:border-dark_border dark:text-dark_text hover:dark:bg-dark_text hover:dark:text-white"
            onClick={onShareClick}
          >
            <ExternalLink width={13} height={13} />
          </Button>
        </Tooltip>
      </div>
      <BlockInf
        icon={<Calendar width={20} height={20} />}
        text={`${event.week_day} ${event.month} ${event.day}`}
      />

      <BlockInf
        icon={<Clock width={20} height={20} />}
        text={`${event.time_from} - ${event.time_to}`}
      />

      <BlockInf
        icon={<BookText width={20} height={20} />}
        text={`${event.description}`}
      />
    </div>
  );
}
