interface TCalendarHeaderButton {
  left_icon?: React.ReactNode;
  title?: string;
  onClick: () => void;
  right_icon?: React.ReactNode;
  bg_color: string;
  text_color: string;
}

export default function CalendarHeaderButton({
  left_icon,
  title,
  onClick,
  right_icon,
  bg_color,
  text_color
}: TCalendarHeaderButton) {
  return (
    <button
      className={`flex items-center gap-1.5 px-3 py-2 border-1 ${bg_color} rounded-lg ${text_color} select-none shadow active:translate-y-0.5 transition-all duration-75 cursor-pointer`}
      onClick={onClick}
    >
      {left_icon && <div>{left_icon}</div>}
      {title && <div className="font-semibold text-sm">{title}</div>}
      {right_icon && <div>{right_icon}</div>}
    </button>
  );
}
