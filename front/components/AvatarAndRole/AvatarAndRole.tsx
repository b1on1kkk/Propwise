// utils
import { CheckUserOnline } from "@/utils/CheckUserOnline";

// interfaces
import type { TAvatarAndRole } from "@/interfaces/interfaces";

export default function AvatarAndRole({
  hideAsideMenu,
  user,
  onlineUsers
}: TAvatarAndRole) {
  return (
    <div
      className={`flex gap-3 items-center relative ${
        hideAsideMenu ? "justify-center" : ""
      }`}
    >
      <div className="w-10 h-10 bg-gray-400 rounded-lg" />

      <div
        className={`w-[14px] h-[14px] bg-white rounded-full absolute right-0 bottom-0 top-6 ${
          hideAsideMenu ? "left-12" : "left-8"
        } flex items-center justify-center border-1 border-gray-400`}
      >
        {user.length > 0 && (
          <>
            {CheckUserOnline(onlineUsers, user[0].id) ? (
              <>
                <div className="w-[6px] h-[6px] bg-[#009965] rounded-full animate-ping absolute" />
                <div className="w-[6px] h-[6px] bg-[#009965] rounded-full" />
              </>
            ) : (
              <div className="w-[6px] h-[6px] bg-red-500 rounded-full" />
            )}
          </>
        )}
      </div>

      {!hideAsideMenu && (
        <div className="flex flex-col">
          {user.length > 0 ? (
            <>
              <span className="font-semibold">
                {user[0].name} {user[0].lastname}
              </span>
              <span className="text-xs">{user[0].role}</span>
            </>
          ) : (
            <>
              <span className="w-20 bg-gray-300 h-3 rounded-sm animate-pulse mb-2" />
              <span className="w-10 bg-gray-300 h-2 rounded-sm animate-pulse" />
            </>
          )}
        </div>
      )}
    </div>
  );
}
