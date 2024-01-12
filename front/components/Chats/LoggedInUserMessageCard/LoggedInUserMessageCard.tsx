interface TLoggedInUserMessageCard {
  name: string;
  lastname: string;
  timestamp: string;
  value: string;
}

export default function LoggedInUserMessageCard({
  name,
  lastname,
  timestamp,
  value
}: TLoggedInUserMessageCard) {
  return (
    <div className="flex gap-3 justify-end">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 justify-end">
          <span className="text-xs text-[#56616b]">{timestamp}</span>
          <span className="text-sm font-semibold">
            {name} {lastname}
          </span>
        </div>

        <div className="px-3 py-2 bg-[#009965] rounded-lg text-white max-w-[400px]">
          {value}
        </div>
      </div>

      <div className="w-11 h-11 bg-gray-400 rounded-full" />
    </div>
  );
}
