import { Gem, ArrowLeftCircle, ArrowRightCircle } from "lucide-react";

// context
import { useGlobalModalStatus } from "@/context/CreateNewTaskModalContext";

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
      <button
        className="p-1 border-1 rounded-lg cursor-pointer text-[#b5b5b5] hover:text-[#696969]"
        onClick={() =>
          setLocalStorageValue({
            ...storedLocalStorageValue,
            status: !storedLocalStorageValue.status
          })
        }
      >
        {storedLocalStorageValue.status ? (
          <ArrowRightCircle width={20} height={20} />
        ) : (
          <ArrowLeftCircle width={20} height={20} />
        )}
      </button>
    </header>
  );
}
