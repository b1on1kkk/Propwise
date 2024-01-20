import { Link } from "lucide-react";

import CreateEventInputWrapper from "../CreateEventInputWrapper/CreateEventInputWrapper";

export interface TCreateEventInputLink {
  text: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

export default function CreateEventInputLink({
  text,
  onChange,
  value
}: TCreateEventInputLink) {
  return (
    <CreateEventInputWrapper>
      <div className="dark:text-dark_text">
        <Link width={20} height={20} />
      </div>
      <input
        type="text"
        placeholder={text}
        className="w-full focus:outline-none text-indigo-500 font-semibold placeholder:font-normal dark:bg-inherit"
        onChange={onChange}
        value={value}
      />
    </CreateEventInputWrapper>
  );
}
