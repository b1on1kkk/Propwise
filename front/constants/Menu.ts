export interface MenuData {
  id: number;
  icon_name: string;
  text: string;
  status: boolean;
}

export const LEFT_ASIDEMENU_MENU_DATA: MenuData[] = [
  {
    id: 1,
    icon_name: "Home",
    text: "Home",
    status: false
  },
  {
    id: 2,
    icon_name: "CreditCard",
    text: "Payments",
    status: false
  },
  {
    id: 3,
    icon_name: "HardHat",
    text: "Maintenance",
    status: false
  },
  {
    id: 4,
    icon_name: "Inbox",
    text: "Indox",
    status: false
  }
];
