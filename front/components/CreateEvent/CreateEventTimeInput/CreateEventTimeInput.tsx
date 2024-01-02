import CreateEventInputWrapper from "../CreateEventInputWrapper/CreateEventInputWrapper";
import { Clock } from "lucide-react";

export default function CreateEventTimeInput({
  text,
  onChange
}: {
  text: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
        />
      </CreateEventInputWrapper>
    </div>
  );
}
