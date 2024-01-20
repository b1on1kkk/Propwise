import { icons } from "lucide-react";

import { useTheme } from "next-themes";

export default function Icon({
  icon_name,
  hover_status
}: {
  icon_name: string;
  hover_status: boolean;
}) {
  const Icon = icons[icon_name as keyof typeof icons];

  const { theme } = useTheme();

  return (
    <span
      className={`${
        hover_status
          ? `${theme === "dark" ? "text-white" : "text-green-700"}`
          : `${theme === "dark" ? "text-[#9EC8B9]" : "text-[#56616b]"}`
      } transition-all duration-200`}
    >
      <Icon width={15} height={15} />
    </span>
  );
}
