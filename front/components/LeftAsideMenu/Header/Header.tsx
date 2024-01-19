import { Gem } from "lucide-react";

// context
import { useGlobalModalStatus } from "@/context/CreateNewTaskModalContext";

import ChatHeaderButton from "@/components/ChatHeaderButton/ChatHeaderButton";

export default function Header() {
  const { storedLocalStorageValue, setLocalStorageValue } =
    useGlobalModalStatus();

  return (
    <header className="flex border-b-1 p-3 items-center">
      <div className={`${storedLocalStorageValue.status && "flex-1 flex"}`}>
        <div className="p-2 bg-[#009965] rounded-lg">
          <Gem width={20} height={20} color="white" />
        </div>
      </div>

      {!storedLocalStorageValue.status && (
        <h1 className="ml-3 text-lg font-semibold flex-1">Propwise</h1>
      )}
      <div>
        <ChatHeaderButton
          icon_name={
            storedLocalStorageValue.status
              ? "ArrowRightCircle"
              : "ArrowLeftCircle"
          }
          className="px-1.5 py-1 min-w-0 bg-white border-1 rounded-lg shadow"
          width={18}
          height={18}
          tooltip_title={storedLocalStorageValue.status ? "expand" : "hide"}
          placement="bottom"
          delay={0}
          onClick={() =>
            setLocalStorageValue({
              ...storedLocalStorageValue,
              status: !storedLocalStorageValue.status
            })
          }
        />
      </div>
    </header>
  );
}
