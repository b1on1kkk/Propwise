// components
import { BookText, Calendar, Clock } from "lucide-react";
import BlockInf from "./BlockInf/BlockInf";
import { ExternalLink } from "lucide-react";
import { Button, Tooltip } from "@nextui-org/react";

// interfaces
import type { TEventCard } from "@/interfaces/interfaces";

export default function EventCard({
  name,
  week_day,
  month,
  day,
  time_from,
  time_to,
  description,
  link,
  onShareClick
}: TEventCard) {
  return (
    <div className="border-1 rounded-lg shadow flex p-3 text-[#56616b] flex-col gap-1 dark:border-dark_border">
      <div className="text-xl font-semibold text-center flex items-center">
        {link ? (
          <a href={link} target="_blank" rel="noreferrer" className="flex-1">
            <span className="text-indigo-500">{name}</span>
          </a>
        ) : (
          <span className="dark:text-dark_text flex-1">{name}</span>
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
        text={`${week_day} ${month} ${day}`}
      />

      <BlockInf
        icon={<Clock width={20} height={20} />}
        text={`${time_from} - ${time_to}`}
      />

      <BlockInf
        icon={<BookText width={20} height={20} />}
        text={`${description}`}
      />
    </div>
  );
}
