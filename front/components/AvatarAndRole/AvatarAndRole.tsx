// utils
import { CheckUserOnline } from "@/utils/CheckUserOnline";

// interfaces
import type { TAvatarAndRole } from "@/interfaces/interfaces";

export default function AvatarAndRole({
  hideAsideMenuStatus,
  user_data,
  user_isloading,
  user_iserror,
  onlineUsers
}: TAvatarAndRole) {
  return (
    <div
      className={`flex gap-3 items-center relative ${
        hideAsideMenuStatus ? "justify-center" : ""
      }`}
    >
      <>
        {(user_isloading || user_iserror) && (
          <>
            <div className="w-10 h-10 bg-gray-400 rounded-lg animate-pulse" />

            <div
              className={`w-[14px] h-[14px] bg-white rounded-full absolute right-0 bottom-0 top-6 ${
                hideAsideMenuStatus ? "left-12" : "left-8"
              } flex items-center justify-center border-1 border-gray-400`}
            >
              <div className="w-[6px] h-[6px] bg-red-500 rounded-full" />
            </div>

            <div className="flex flex-col">
              <span className="w-20 bg-gray-300 h-3 rounded-sm animate-pulse mb-2" />
              <span className="w-10 bg-gray-300 h-2 rounded-sm animate-pulse" />
            </div>
          </>
        )}
      </>

      <>
        {user_data && !user_isloading && !user_iserror && (
          <>
            <div className="w-10 h-10 bg-gray-400 rounded-lg" />

            <div
              className={`w-[14px] h-[14px] bg-white rounded-full absolute right-0 bottom-0 top-6 ${
                hideAsideMenuStatus ? "left-12" : "left-8"
              } flex items-center justify-center border-1 border-gray-400`}
            >
              {CheckUserOnline(onlineUsers, user_data[0].id) ? (
                <>
                  <div className="w-[6px] h-[6px] bg-[#009965] rounded-full animate-ping absolute" />
                  <div className="w-[6px] h-[6px] bg-[#009965] rounded-full" />
                </>
              ) : (
                <div className="w-[6px] h-[6px] bg-red-500 rounded-full" />
              )}
            </div>

            {!hideAsideMenuStatus && (
              <div className="flex flex-col">
                <span className="font-semibold dark:text-dark_text">
                  {user_data[0].name} {user_data[0].lastname}
                </span>
                <span className="text-xs dark:text-dark_text">
                  {user_data[0].role}
                </span>
              </div>
            )}
          </>
        )}
      </>
    </div>
  );
}
