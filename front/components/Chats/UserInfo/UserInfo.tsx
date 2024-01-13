// components
import HeaderUserInf from "../HeaderUserInf/HeaderUserInf";
import { X, CircleUserRound, UserRoundX } from "lucide-react";

// context
import { useInboxContext } from "@/context/InboxContext";

// interfaces
import type { TUserInfo } from "@/interfaces/interfaces";

export default function UserInfo({ isOnlineStatus, onClick }: TUserInfo) {
  const { storedValue } = useInboxContext();

  return (
    <div className="border-l-1 w-[350px] p-5 flex flex-col">
      <header>
        <div className="flex items-center">
          <span className="flex-1 text-xl font-semibold text-[#56616b]">
            User Info
          </span>
          <button
            className="p-1 hover:bg-gray-200 rounded-lg transition-all duration-200"
            onClick={onClick}
          >
            <X width={20} height={20} />
          </button>
        </div>

        <div className="mt-10">
          <HeaderUserInf
            name={storedValue!.name}
            lastname={storedValue!.lastname}
            online_status={isOnlineStatus ? "online" : "last seen recently"}
          >
            <div className="w-20 h-20 bg-gray-400 rounded-full" />
          </HeaderUserInf>
        </div>
      </header>

      <main className="mt-5 flex gap-8 flex-1">
        <div className="mt-2">
          <CircleUserRound width={20} height={20} />
        </div>

        <div className="flex flex-col gap-3">
          <div>
            <div>{storedValue!.email}</div>
            <div className="text-sm text-[#56616b]">email</div>
          </div>
          <div>
            <div>just test text here</div>
            <div className="text-sm text-[#56616b]">Bio</div>
          </div>
          <div>
            <div className="text-indigo-500">@{storedValue!.name}</div>
            <div className="text-sm text-[#56616b]">Username</div>
          </div>
        </div>
      </main>

      <footer className="flex justify-center">
        <button className="flex items-center gap-2 bg-red-500 rounded-lg px-4 py-2 text-white cursor-pointer hover:bg-red-600 transition-all duration-200 shadow">
          <UserRoundX width={19} height={19} />
          <span className="text-sm">Delete user and chat</span>
        </button>
      </footer>
    </div>
  );
}
