"use client";

import { Button, Tooltip } from "@nextui-org/react";
import Icon from "../Icon/Icon";

interface TChatHeaderButton {
  icon_name: string;
  width: number;
  height: number;
  tooltip_title?: string;
  placement:
    | "top-start"
    | "top"
    | "top-end"
    | "bottom-start"
    | "bottom"
    | "bottom-end"
    | "left-start"
    | "left"
    | "left-end"
    | "right-start"
    | "right"
    | "right-end";
  className: string;
  delay?: number;
  onClick: () => void;
}

export default function ChatHeaderButton({
  icon_name,
  width,
  height,
  tooltip_title,
  placement,
  className,
  delay,
  onClick
}: TChatHeaderButton) {
  return (
    <Tooltip
      content={tooltip_title}
      color="default"
      placement={placement}
      delay={delay}
      closeDelay={delay}
    >
      <Button onClick={onClick} size="sm" className={className}>
        <Icon
          icon_name={icon_name}
          className="text-[#56616b]"
          width={width}
          height={height}
        />
      </Button>
    </Tooltip>
  );
}
