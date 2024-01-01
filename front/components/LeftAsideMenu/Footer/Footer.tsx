import { useAsideMenuContext } from "../../../context/LeftAsideMenuHeaderContext";

export default function Footer() {
  const { hideAsideMenu } = useAsideMenuContext();

  return (
    <footer className="border-t-1 items-center">
      <div className="px-3 py-2">
        <div
          className={`flex gap-3 items-center ${
            hideAsideMenu ? "justify-center" : ""
          }`}
        >
          <div className="w-10 h-10 bg-gray-400 rounded-lg" />

          {!hideAsideMenu && (
            <div className="flex flex-col">
              <span className="font-semibold">Bryan Cranston</span>
              <span className=" text-xs">Admin</span>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
