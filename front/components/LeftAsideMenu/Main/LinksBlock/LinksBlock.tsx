import Link from "next/link";

// components
import Icon from "../Icon/Icon";

// context
import { useGlobalModalStatus } from "@/context/CreateNewTaskModalContext";

// interfaces
import type { TLinksBlock } from "@/interfaces/interfaces";

export default function LinksBlock({
  title,
  data,
  onMouseFunction,
  setter,
  till_end_status
}: TLinksBlock) {
  const { storedLocalStorageValue } = useGlobalModalStatus();

  return (
    <div className={till_end_status ? "flex-1" : ""}>
      {title && (
        <div
          className={`text-sm font-semibold pt-4 pb-1 ${
            storedLocalStorageValue.status ? "text-center" : "pl-3"
          }`}
        >
          {title}
        </div>
      )}
      {data.map((item, idx) => {
        return (
          <Link
            key={idx}
            href={
              item.text === "Reports"
                ? "https://github.com/b1on1kkk/Propwise/issues"
                : item.text === "Home"
                ? "/"
                : item.text.toLowerCase().trim()
            }
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
                  storedLocalStorageValue.status ? "justify-center" : ""
                }`}
              >
                <div
                  className={`p-2 border-1 rounded-lg transition-all duration-200${
                    item.status ? "border-green-400 shadow drop-shadow-lg" : ""
                  }`}
                >
                  <Icon icon_name={item.icon_name} hover_status={item.status} />
                </div>
                {!storedLocalStorageValue.status && (
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
