import { icons } from "lucide-react";

export default function Icon({
  icon_name,
  onClick
}: {
  icon_name: string;
  onClick?: () => void;
}) {
  const Icon = icons[icon_name as keyof typeof icons];

  return (
    <span
      className="text-[#56616b] hover:text-[#009965] transition-all duration-200 ease-in flex items-center"
      onClick={onClick}
    >
      <Icon width={20} height={20} />
    </span>
  );
}
