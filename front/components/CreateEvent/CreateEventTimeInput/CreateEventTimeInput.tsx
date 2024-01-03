import CreateEventInputWrapper from "../CreateEventInputWrapper/CreateEventInputWrapper";
import { Clock } from "lucide-react";

export default function CreateEventTimeInput({
  text,
  onChange,
  value
}: {
  text: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}) {
  return (
    <div className="flex-1">
      <CreateEventInputWrapper>
        <div>
          <Clock width={20} height={20} />
        </div>
        <input
          type="text"
          placeholder={text}
          className="w-full focus:outline-none"
          onChange={onChange}
          value={value}
        />
      </CreateEventInputWrapper>
    </div>
  );
}
