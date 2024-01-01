import { Gem, ArrowLeftCircle, ArrowRightCircle } from "lucide-react";

// context
import { useAsideMenuContext } from "../../../context/LeftAsideMenuHeaderContext";

export default function Header() {
  const { hideAsideMenu, setHideAsideMenu } = useAsideMenuContext();

  return (
    <header className="flex border-b-1 p-3 items-center">
      <div className={`${hideAsideMenu && "flex-1 flex"}`}>
        <div className="p-2 bg-[#009965] rounded-lg">
          <Gem width={20} height={20} color="white" />
        </div>
      </div>

      {!hideAsideMenu && (
        <h1 className="ml-3 text-lg font-semibold flex-1">Propwise</h1>
      )}
      <button
        className="p-1 border-1 rounded-lg cursor-pointer text-[#b5b5b5] hover:text-[#696969]"
        onClick={() => setHideAsideMenu(!hideAsideMenu)}
      >
        {hideAsideMenu ? (
          <ArrowRightCircle width={20} height={20} />
        ) : (
          <ArrowLeftCircle width={20} height={20} />
        )}
      </button>
    </header>
  );
}
