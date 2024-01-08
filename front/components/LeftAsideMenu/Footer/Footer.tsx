// components
import AvatarAndRole from "@/components/AvatarAndRole/AvatarAndRole";

// context
import { useGlobalModalStatus } from "@/context/CreateNewTaskModalContext";

export default function Footer() {
  const { user, onlineUsers, storedLocalStorageValue } = useGlobalModalStatus();

  return (
    <footer className="border-t-1 items-center">
      <div className="px-3 py-2">
        <AvatarAndRole
          hideAsideMenuStatus={storedLocalStorageValue.status}
          user={user}
          onlineUsers={onlineUsers}
        />
      </div>
    </footer>
  );
}
