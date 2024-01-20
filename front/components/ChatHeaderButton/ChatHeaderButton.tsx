"use client";

import { Button, Tooltip } from "@nextui-org/react";
import Icon from "../Icon/Icon";
import { useState } from "react";

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
  const [hovered, setHovered] = useState<boolean>(false);

  return (
    <Tooltip
      content={tooltip_title}
      color="default"
      placement={placement}
      delay={delay}
      closeDelay={delay}
      className="dark:text-dark_text"
    >
      <Button
        onClick={onClick}
        size="sm"
        className={className}
        onMouseEnter={() => setHovered(!hovered)}
        onMouseLeave={() => setHovered(!hovered)}
      >
        <Icon
          icon_name={icon_name}
          className={`text-[#56616b] dark:text-dark_text ${
            hovered && `dark:text-white`
          } transition-all duration-200`}
          width={width}
          height={height}
        />
      </Button>
    </Tooltip>
  );
}
