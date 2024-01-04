"use client";

import { useEffect, useState } from "react";

// context
import { useAsideMenuContext } from "../../../context/LeftAsideMenuHeaderContext";

// utils
import { GetLoggedInUserInf } from "@/utils/GetLoggedInUserInf";

// interfaces
import { User } from "@/interfaces/interfaces";

export default function Footer() {
  const { hideAsideMenu } = useAsideMenuContext();

  const [user, setUser] = useState<User[]>([]);

  useEffect(() => {
    GetLoggedInUserInf().then((data) => setUser(data));
  }, []);

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
      </div>
    </footer>
  );
}
