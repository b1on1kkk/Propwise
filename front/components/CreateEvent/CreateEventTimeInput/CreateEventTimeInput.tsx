// components
import CreateEventInputWrapper from "../CreateEventInputWrapper/CreateEventInputWrapper";
import { Clock } from "lucide-react";

// interfaces
import type { TCreateEventTimeInput } from "@/interfaces/interfaces";

export default function CreateEventTimeInput({
  text,
  onChange,
  value
}: TCreateEventTimeInput) {
  return (
    <div className="flex-1">
      <CreateEventInputWrapper>
        <div className="dark:text-dark_text">
          <Clock width={20} height={20} />
        </div>
        <input
          type="time"
          placeholder={text}
          className="w-full focus:outline-none dark:bg-inherit dark:text-dark_text placeholder:dark:text-dark_text"
          onChange={onChange}
          value={value}
        />
      </CreateEventInputWrapper>
    </div>
  );
}
