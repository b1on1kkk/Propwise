"use client";

import { useEffect, useState } from "react";
import styles from "./MemberCard.module.scss";

// components
import StatusButton from "./StatusButton/StatusButton";

// interfaces
import type { TMemberCard } from "@/interfaces/interfaces";

// context
import { useGlobalModalStatus } from "@/context/CreateNewTaskModalContext";

// utils
import { SendingNotificationSocket } from "@/utils/SendingNotificationSocket";

// API
import { InsertDataToCreateFriendship } from "@/API/InsertDataToCreateFriendship";
import { GetFriends } from "@/API/GetFriends";

export default function MemberCard({ member }: TMemberCard) {
  const { socket, setMembers, user } = useGlobalModalStatus();
  const [friendsCounter, setFriendsCounter] = useState<number>(0);

  const loggedin_user = user[0];

  function CreateFriendship() {
    InsertDataToCreateFriendship(loggedin_user.id, member.id, "pending").then(
      () => {
        // send notification another user
        SendingNotificationSocket(
          socket,
          member.id,
          "friend_request",
          `${loggedin_user.name} wants to be a friends!`,
          loggedin_user
        );

        // send system notification to logged in user
        SendingNotificationSocket(
          socket,
          loggedin_user.id,
          "system",
          `Sent request to ${member.name} to be friends!`,
          loggedin_user
        );
      }
    );
  }

  // set up listener to get updated members
  useEffect(() => {
    socket!.on("getMembersFromSocket", (data) => {
      setMembers(data.content);
      // update friends counter when user add another to friend
      GetFriends(member.id).then((friends) =>
        setFriendsCounter(friends.length)
      );
    });

    GetFriends(member.id).then((friends) => setFriendsCounter(friends.length));
  }, []);

  return (
    <div className="w-64 h-[400px] border-1 shadow rounded-lg m-3 flex flex-col relative bg-white dark:bg-dark_bg dark:border-dark_border">
      <div className="flex-1">
        <div className="h-full bg-gray-400 rounded-t-lg" />
      </div>

      <div className="flex-1">
        <div className="pt-16 px-8">
          <div className="text-center text-[#56616b]">
            <div className="text-xl font-semibold dark:text-dark_text">
              {member.name} {member.lastname}
            </div>
            <div className="font-semibold text-sm dark:text-dark_text">
              {member.role}
            </div>
          </div>

          <div className="mt-5 border-t-1 flex dark:border-dark_border">
            <div className="flex-1 text-center border-r-1 flex flex-col mt-1 dark:border-dark_border">
              <span className="font-bold dark:text-dark_text">
                {friendsCounter}
              </span>
              <span className="text-sm text-[#56616b] dark:text-dark_text">
                friends
              </span>
            </div>

            <div className="flex-1 flex items-center justify-center mt-1">
              {member.status === "pending" ? (
                <StatusButton
                  icon_name="CircleDotDashed"
                  className="py-2 px-3 border-1 rounded-lg shadow active:translate-y-0.5 cursor-pointer flex items-center justify-center dark:border-dark_border"
                  onClick={() => {}}
                  picture_size={19}
                />
              ) : member.status === "accepted" ? (
                <StatusButton
                  icon_name="Contact2"
                  className="py-2 px-3 border-1 rounded-lg shadow active:translate-y-0.5 cursor-pointer flex items-center justify-center dark:border-dark_border"
                  onClick={() => {}}
                  picture_size={19}
                />
              ) : (
                <StatusButton
                  icon_name="UserRoundPlus"
                  className="py-2 px-3 border-1 rounded-lg shadow bg-[#009965] text-white active:translate-y-0.5 cursor-pointer flex items-center justify-center dark:border-dark_border"
                  onClick={CreateFriendship}
                  picture_size={19}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.avatar_position} />
    </div>
  );
}
