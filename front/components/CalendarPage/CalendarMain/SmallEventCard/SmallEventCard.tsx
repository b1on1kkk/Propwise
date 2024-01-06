import Link from "next/link";

// components
import { GraduationCap } from "lucide-react";

// interfaces
import type { TSmallEventCard } from "@/interfaces/interfaces";

export default function SmallEventCard({
  link,
  name,
  description
}: TSmallEventCard) {
  return (
    <div className="flex flex-col border-1 shadow p-2 rounded-lg gap-1 border-green-600">
      <div className="flex gap-3 items-center">
        <div>
          <GraduationCap width={20} height={20} color="rgb(22 163 74)" />
        </div>

        {link ? (
          <Link href={link}>
            <div className="text-indigo-500">{name}</div>
          </Link>
        ) : (
          <div className="text-black">{name}</div>
        )}
      </div>

      <div className="text-sm">{description}</div>
    </div>
  );
}
