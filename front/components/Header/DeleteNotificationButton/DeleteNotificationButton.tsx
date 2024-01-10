import { X } from "lucide-react";

export default function DeleteNotificationButton({
  timestamp,
  onClick
}: {
  timestamp: string;
  onClick: () => void;
}) {
  return (
    <div className="justify-between flex">
      <div className="text-[11px] font-semibold text-[#56616b]">
        {timestamp}
      </div>
      <button onClick={onClick}>
        <X width={15} height={15} />
      </button>
    </div>
  );
}
