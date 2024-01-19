import { Button } from "@nextui-org/react";

import Icon from "@/components/Icon/Icon";

export default function ControllerButton({
  className,
  onClick,
  icon_side,
  icon_name,
  button_text
}: {
  className: string;
  onClick: () => void;
  icon_side: "left" | "right";
  icon_name: string;
  button_text: string;
}) {
  return (
    <Button className={className} onClick={onClick}>
      {icon_side === "left" && (
        <Icon icon_name={icon_name} width={17} height={17} />
      )}
      <span className="font-semibold">{button_text}</span>
      {icon_side === "right" && (
        <Icon icon_name={icon_name} width={17} height={17} />
      )}
    </Button>
  );
}
