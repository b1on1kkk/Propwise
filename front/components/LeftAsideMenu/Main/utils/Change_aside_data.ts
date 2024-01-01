import type { MenuData } from "@/constants/Menu";

export function Change_aside_data(
  data: MenuData[],
  chosen: MenuData,
  setter: React.Dispatch<React.SetStateAction<MenuData[]>>
) {
  setter([
    ...data.map((item) => {
      if (item.id === chosen.id) {
        return {
          ...item,
          status: !chosen.status
        };
      }
      return {
        ...item,
        status: false
      };
    })
  ]);
}
