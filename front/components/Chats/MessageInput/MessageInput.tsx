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
    <div className="px-3 py-3 bg-gray-50">
      <div className="flex pl-5 pr-2 py-2 bg-gray-200 rounded-full">
        <form className="flex-1 flex" onSubmit={SubmitHandler}>
          <input
            type="text"
            placeholder="Type a message"
            className="flex-1 bg-inherit focus:outline-none"
            onChange={onChange}
            value={value}
          />
          <button
            type="submit"
            className={`p-[10px] rounded-full transition-colors duration-200 ${
              value ? "bg-[#009965]" : "bg-gray-400"
            } flex`}
          >
            <Send width={16} height={16} color="white" />
          </button>
        </form>
      </div>
    </div>
  );
}
