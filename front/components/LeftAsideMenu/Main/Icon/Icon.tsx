import { icons } from "lucide-react";

export default function Icon({
  icon_name,
  hover_status
}: {
  icon_name: string;
  hover_status: boolean;
}) {
  const Icon = icons[icon_name as keyof typeof icons];

  return (
    <Icon width={15} height={15} color={hover_status ? "green" : "#56616b"} />
  );
}
