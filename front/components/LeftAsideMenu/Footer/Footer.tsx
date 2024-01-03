import { useAsideMenuContext } from "../../../context/LeftAsideMenuHeaderContext";
import { useGlobalModalStatus } from "@/context/CreateNewTaskModalContext";

export default function Footer() {
  const { hideAsideMenu } = useAsideMenuContext();
  const { loggedUser } = useGlobalModalStatus();

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
            <div className="flex flex-col gap-1">
              {loggedUser !== null ? (
                <>
                  <span className="font-semibold">
                    {loggedUser[0].name} {loggedUser[0].lastname}
                  </span>
                  <span className="text-xs">{loggedUser[0].role}</span>
                </>
              ) : (
                <>
                  <span className="w-20 bg-gray-300 h-3 rounded-sm animate-pulse" />
                  <span className="w-10 bg-gray-300 h-2 rounded-sm animate-pulse" />
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
