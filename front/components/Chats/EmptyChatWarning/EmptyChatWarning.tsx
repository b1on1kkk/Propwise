export default function EmptyChatWarning({
  sendFirstMessageGreeting
}: {
  sendFirstMessageGreeting: () => void;
}) {
  return (
    <div className="h-[200px] w-[260px] rounded-lg bg-gray-400 px-4 py-4 flex flex-col shadow justify-center gap-5">
      <div>
        <div className="text-white font-semibold text-center">
          No messages here yet...
        </div>
        <div className="text-white text-sm text-center">
          Send a message or tap on the greeting below.
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div>
          <button
            className="px-11 py-4 bg-white rounded-lg shadow font-semibold active:translate-y-0.5 text-[#56616b]"
            onClick={sendFirstMessageGreeting}
          >
            HEY!
          </button>
        </div>
      </div>
    </div>
  );
}
