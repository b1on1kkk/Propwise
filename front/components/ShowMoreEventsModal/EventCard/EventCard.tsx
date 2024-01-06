import Link from "next/link";

// components
import { BookText, Calendar, Clock } from "lucide-react";
import BlockInf from "../BlockInf/BlockInf";

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
  link
}: TEventCard) {
  return (
    <div className="border-1 rounded-lg shadow flex p-3 text-[#56616b] flex-col gap-1">
      <div className="text-xl font-semibold text-center">
        {link ? (
          <Link href={link}>
            <span className="text-indigo-500">{name}</span>
          </Link>
        ) : (
          <>{name}</>
        )}
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
