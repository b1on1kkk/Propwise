import Link from "next/link";

// components
import Icon from "../Icon/Icon";

// utils
import type { MenuData } from "@/constants/Menu";

// context
import { useAsideMenuContext } from "../../../../context/LeftAsideMenuHeaderContext";

interface TLinksBlock {
  title?: string;
  data: MenuData[];
  onMouseFunction: (
    data: MenuData[],
    chosen: MenuData,
    setter: React.Dispatch<React.SetStateAction<MenuData[]>>
  ) => void;
  setter: React.Dispatch<React.SetStateAction<MenuData[]>>;
  till_end_status?: boolean;
}

export default function LinksBlock({
  title,
  data,
  onMouseFunction,
  setter,
  till_end_status
}: TLinksBlock) {
  const { hideAsideMenu } = useAsideMenuContext();

  return (
    <div className={till_end_status ? "flex-1" : ""}>
      {title && (
        <div
          className={`text-sm font-semibold pt-4 pb-1 ${
            hideAsideMenu ? "text-center" : "pl-3"
          }`}
        >
          {title}
        </div>
      )}
      {data.map((item, idx) => {
        return (
          <Link
            key={idx}
            href={item.text === "Home" ? "/" : item.text.toLowerCase().trim()}
          >
            <div
              className="text-[#56616b] transition-all duration-200 select-none"
              onMouseEnter={() => onMouseFunction(data, item, setter)}
              onMouseLeave={() => onMouseFunction(data, item, setter)}
            >
              <div
                className={`p-3 flex items-center gap-3 ${
                  item.status ? "bg-[#e7f5ee]" : ""
                } transition-all duration-200 ${
                  hideAsideMenu ? "justify-center" : ""
                }`}
              >
                <div
                  className={`p-2 border-1 rounded-lg transition-all duration-200 ${
                    item.status ? "border-green-400 shadow drop-shadow-lg" : ""
                  }`}
                >
                  <Icon icon_name={item.icon_name} hover_status={item.status} />
                </div>
                {!hideAsideMenu && (
                  <div
                    className={`font-semibold transition-all duration-200 ${
                      item.status ? "text-black" : ""
                    }`}
                  >
                    {item.text}
                  </div>
                )}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
