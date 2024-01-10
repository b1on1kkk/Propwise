"use client";

import { useEffect } from "react";

// components
import MemberCard from "@/components/MemberCard/MemberCard";
import Loading from "@/components/Loading/Loading";

// API
import { GetAllMembers } from "@/API/GetAllMembers";

// context
import { useGlobalModalStatus } from "@/context/CreateNewTaskModalContext";

export default function page() {
  const { user, members, setMembers } = useGlobalModalStatus();

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
              return <MemberCard key={idx} member={member} />;
            })}
          </div>
        </>
      ) : (
        <Loading />
      )}
    </main>
  );
}
