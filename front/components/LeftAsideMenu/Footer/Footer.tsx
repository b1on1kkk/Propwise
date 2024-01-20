"use client";

import { useEffect } from "react";

// components
import AvatarAndRole from "@/components/AvatarAndRole/AvatarAndRole";

// context
import { useGlobalModalStatus } from "@/context/CreateNewTaskModalContext";

// API
import { GetLoggedInUserInf } from "@/API/GetLoggedInUserInf";
import { useQuery } from "@tanstack/react-query";

export default function Footer() {
  const { onlineUsers, storedLocalStorageValue, setUser } =
    useGlobalModalStatus();

  const userQuery = useQuery({
    queryKey: ["logged_user"],
    queryFn: GetLoggedInUserInf
  });

  const userStatus = userQuery.isLoading;
  const userError = userQuery.isError;
  const userData = userQuery.data;

  useEffect(() => {
    if (userQuery.data) setUser(userQuery.data);
  }, [userQuery]);

  return (
    <footer className="border-t-1 items-center dark:border-dark_border">
      <div className="px-3 py-2">
        <AvatarAndRole
          hideAsideMenuStatus={storedLocalStorageValue.status}
          user_data={userData}
          user_isloading={userStatus}
          user_iserror={userError}
          onlineUsers={onlineUsers}
        />
      </div>
    </footer>
  );
}
