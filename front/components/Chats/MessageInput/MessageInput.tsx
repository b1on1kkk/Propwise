// components
import { Send } from "lucide-react";

// interfaces
import { TMessageInput } from "@/interfaces/interfaces";

export default function MessageInput({
  value,
  SubmitHandler,
  onChange
}: TMessageInput) {
  return (
    <div className="px-3 py-3 bg-gray-50 dark:bg-slate-800">
      <div className="flex pl-5 pr-2 py-2 bg-gray-200 rounded-full dark:dark:bg-slate-700">
        <form className="flex-1 flex" onSubmit={SubmitHandler}>
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 bg-inherit focus:outline-none placeholder:dark:text-dark_text dark:text-dark_text"
            onChange={onChange}
            value={value}
          />
          <button
            type="submit"
            className={`p-[10px] rounded-full transition-colors duration-200 ${
              value
                ? "bg-[#009965] dark:bg-dark_text"
                : "bg-gray-400 dark:bg-slate-500"
            } flex`}
          >
            <Send width={16} height={16} color="white" />
          </button>
        </form>
      </div>
    </div>
  );
}
