import { Frown } from "lucide-react";

export default function EmptyChatListWarning() {
  return (
    <div className="h-full flex flex-col items-center justify-center w-full text-[#56616b] gap-3">
      <div>
        <Frown width={60} height={60} />
      </div>
      <div>
        <div className="font-semibold">There are no chats yet!</div>
      </div>
    </div>
  );
}
