"use client";

import { icons } from "lucide-react";

export default function ChatHeaderButton({
  icon_name,
  chosen,
  onClick
}: {
  icon_name: string;
  chosen: boolean;
  onClick: () => void;
}) {
  const Icon = icons[icon_name as keyof typeof icons];

  return (
    <button
      className={`p-2 border-1 rounded-lg cursor-pointer ${
        chosen ? "hover:bg-green-200" : "hover:bg-gray-200"
      } active:translate-y-0.5 shadow ${chosen && "border-green-200"}`}
      onClick={onClick}
    >
      <Icon width={17} height={17} color={`${chosen ? "green" : "#56616b"}`} />
    </button>
  );
}
