import { Search } from "lucide-react";

interface THeaderSearch {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function HeaderSearch({ onChange, value }: THeaderSearch) {
  return (
    <div className="flex items-center bg-gray-100 border-1 px-3 rounded-lg gap-2 dark:bg-dark_bg dark:border-dark_border">
      <Search
        width={18}
        height={18}
        className="opacity-70 dark:text-dark_text"
      />
      <input
        type="text"
        placeholder="Search"
        className="focus:outline-none bg-inherit w-60 placeholder:font-semibold dark:text-dark_text placeholder:dark:text-dark_text"
        onChange={onChange}
        value={value}
      />
    </div>
  );
}
