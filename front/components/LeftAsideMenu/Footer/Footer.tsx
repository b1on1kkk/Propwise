// context
import { useAsideMenuContext } from "../../../context/LeftAsideMenuHeaderContext";
import { useGlobalModalStatus } from "@/context/CreateNewTaskModalContext";

import AvatarAndRole from "@/components/AvatarAndRole/AvatarAndRole";

export default function Footer() {
  const { hideAsideMenu } = useAsideMenuContext();
  const { user, onlineUsers } = useGlobalModalStatus();

  return (
    <footer className="border-t-1 items-center">
      <div className="px-3 py-2">
        <AvatarAndRole
          hideAsideMenu={hideAsideMenu}
          user={user}
          onlineUsers={onlineUsers}
        />
      </div>
    </footer>
  );
}
