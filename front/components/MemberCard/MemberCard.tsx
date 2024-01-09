"use client";

import { useEffect, useState } from "react";
import styles from "./MemberCard.module.scss";

// components
import StatusButton from "./StatusButton/StatusButton";

// interfaces
import type { TMemberCard } from "@/interfaces/interfaces";

// import { GetFriends } from "@/API/GetFriends";

import { useGlobalModalStatus } from "@/context/CreateNewTaskModalContext";
import { InsertDataToCreateFriendship } from "@/API/InsertDataToCreateFriendship";
import { GetAllMembers } from "@/API/GetAllMembers";

export default function MemberCard({
  member,
  loggedin_user,
  setMembers
}: TMemberCard) {
  const { socket } = useGlobalModalStatus();

  // const [numberOfFriends, setNumberOfFriends] = useState<number>(0);

  // useEffect(() => {
  //   GetFriends(member.id).then((friends) => setNumberOfFriends(friends.length));
  // }, [member]);

  function CreateFriendship() {
    InsertDataToCreateFriendship(loggedin_user.id, member.id)
      .then(() => {
        GetAllMembers(loggedin_user.id).then((members) => setMembers(members));

        // send notification another user
        socket!.emit("sendNotificationsTo", {
          user_id: member.id,
          notif_type: "friend_request",
          message: JSON.stringify({
            content: `${loggedin_user.name} wants to be a friends!`,
            user: loggedin_user
          })
        });

        // send system notification to logged in user
        socket!.emit("sendNotificationsTo", {
          user_id: loggedin_user.id,
          notif_type: "system",
          message: JSON.stringify({
            content: `Sent ${member.name} request to be friends!`,
            user: loggedin_user
          })
        });
      })
      .catch((error) => {
        if (error) console.log("Error occur, we are trying to fix it!");
      });
  }

  return (
    <div className="w-64 h-[400px] border-1 shadow rounded-lg m-3 flex flex-col relative bg-white">
      <div className="flex-1">
        <div className="h-full bg-gray-400 rounded-t-lg" />
      </div>

      <div className="flex-1">
        <div className="pt-16 px-8">
          <div className="text-center text-[#56616b]">
            <div className="text-xl font-semibold">
              {member.name} {member.lastname}
            </div>
            <div className="font-semibold text-sm">{member.role}</div>
          </div>

          <div className="mt-5 border-t-2 flex">
            <div className="flex-1 text-center border-r-1 flex flex-col mt-1">
              <span className="font-bold">0</span>
              <span className="text-sm text-[#56616b]">friends</span>
            </div>

            <div className="flex-1 flex items-center justify-center mt-1">
              {member.status === "pending" ? (
                <StatusButton
                  icon_name="CircleDotDashed"
                  className="py-2 px-3 border-1 rounded-lg shadow active:translate-y-0.5 cursor-pointer flex items-center justify-center"
                  onClick={() => {}}
                />
              ) : member.status === "accepted" ? (
                <StatusButton
                  icon_name="Contact2"
                  className="py-2 px-3 border-1 rounded-lg shadow active:translate-y-0.5 cursor-pointer flex items-center justify-center"
                  onClick={() => {}}
                />
              ) : (
                <StatusButton
                  icon_name="UserRoundPlus"
                  className="py-2 px-3 border-1 rounded-lg shadow bg-[#009965] text-white active:translate-y-0.5 cursor-pointer flex items-center justify-center"
                  onClick={CreateFriendship}
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
