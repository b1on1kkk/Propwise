import { MessageCircleX } from "lucide-react";

export default function EmptyNotifications() {
  return (
    <div className="flex h-full w-full text-[#56616b] flex-col items-center justify-center gap-2">
      <div>
        <MessageCircleX width={50} height={50} />
      </div>
      <div className="font-semibold">There are no notifications yet!</div>
    </div>
  );
}
