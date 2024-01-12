interface TFriendMessageCard {
  name: string;
  lastname: string;
  timestamp: string;
  value: string;
}

export default function FriendMessageCard({
  name,
  lastname,
  timestamp,
  value
}: TFriendMessageCard) {
  return (
    <div className="flex gap-3">
      <div className="w-11 h-11 bg-gray-400 rounded-full" />

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">
            {name} {lastname}
          </span>
          <span className="text-xs text-[#56616b]">{timestamp}</span>
        </div>

        <div className="px-3 py-2 bg-gray-100 rounded-lg max-w-[400px]">
          {value}
        </div>
      </div>
    </div>
  );
}
