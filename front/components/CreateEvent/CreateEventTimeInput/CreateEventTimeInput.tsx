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
        <div>
          <Clock width={20} height={20} />
        </div>
        <input
          type="time"
          placeholder={text}
          className="w-full focus:outline-none "
          onChange={onChange}
          value={value}
        />
      </CreateEventInputWrapper>
    </div>
  );
}
