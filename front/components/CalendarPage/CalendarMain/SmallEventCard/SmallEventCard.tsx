import Link from "next/link";

// components
import { ClipboardList } from "lucide-react";

// interfaces
import type { TSmallEventCard } from "@/interfaces/interfaces";

export default function SmallEventCard({
  link,
  name,
  description
}: TSmallEventCard) {
  return (
    <div className="flex flex-col border-1 shadow p-2 rounded-lg gap-1 border-green-600 dark:border-dark_text">
      <div className="flex gap-3 items-center">
        <div>
          <ClipboardList width={20} height={20} color="rgb(22 163 74)" />
        </div>

        {link ? (
          <Link href={link}>
            <div className="text-indigo-500">{name}</div>
          </Link>
        ) : (
          <div className="text-black dark:text-dark_text">{name}</div>
        )}
      </div>

      <div className="text-tiny dark:text-dark_text">{description}</div>
    </div>
  );
}
