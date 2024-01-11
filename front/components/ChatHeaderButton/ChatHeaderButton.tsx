"use client";

import { icons } from "lucide-react";

export default function ChatHeaderButton({
  icon_name,
  onClick
}: {
  icon_name: string;
  onClick: () => void;
}) {
  const Icon = icons[icon_name as keyof typeof icons];

  return (
    <button
      className="p-2 border-1 rounded-lg cursor-pointer hover:bg-gray-200 active:translate-y-0.5 shadow"
      onClick={onClick}
    >
      <Icon width={17} height={17} />
    </button>
  );
}
