import { icons } from "lucide-react";

export default function Icon({
  icon_name,
  className,
  width = 20,
  height = 20
}: {
  icon_name: string;
  className?: string;
  width?: number;
  height?: number;
}) {
  const Icon = icons[icon_name as keyof typeof icons];

  return (
    <span className={className}>
      <Icon width={width} height={height} />
    </span>
  );
}
