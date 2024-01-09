"use client";

import { useEffect, useState } from "react";

// components
import MemberCard from "@/components/MemberCard/MemberCard";
import Loading from "@/components/Loading/Loading";

// API
import { GetAllMembers } from "@/API/GetAllMembers";

// context
import { useGlobalModalStatus } from "@/context/CreateNewTaskModalContext";

// interfaces
import { Members } from "@/interfaces/interfaces";

export default function page() {
  const { user } = useGlobalModalStatus();
  const [members, setMembers] = useState<Members[] | null>(null);

  useEffect(() => {
    if (user.length > 0)
      GetAllMembers(user[0].id).then((members) => setMembers(members));
  }, [user]);

  return (
    <main className="flex-1 border-l-1 overflow-auto">
      {members ? (
        <>
          <div className="grid grid-cols-6">
            {members.map((member, idx) => {
              return (
                <MemberCard
                  key={idx}
                  member={member}
                  loggedin_user={user[0]}
                  setMembers={setMembers}
                />
              );
            })}
          </div>
        </>
      ) : (
        <Loading />
      )}
    </main>
  );
}
