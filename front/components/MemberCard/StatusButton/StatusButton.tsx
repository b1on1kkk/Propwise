import { icons } from "lucide-react";

// interfaces
import type { TStatusButton } from "@/interfaces/interfaces";

export default function StatusButton({
  icon_name,
  className,
  onClick,
  picture_size
}: TStatusButton) {
  const Icon = icons[icon_name as keyof typeof icons];

  return (
    <button className={className} onClick={onClick}>
      <span>
        <Icon width={picture_size} height={picture_size} />
      </span>
    </button>
  );
}
