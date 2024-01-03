"use client";
import { useState } from "react";

// components
import LinksBlock from "./LinksBlock/LinksBlock";

// utils
import { LEFT_ASIDEMENU_DATA } from "@/constants/Data";
import { LEFT_ASIDEMENU_MENU_DATA } from "@/constants/Menu";
import { Change_aside_data } from "./utils/Change_aside_data";
import { LEFT_ASIDEMENU_SETTINGS_DATA } from "@/constants/SettingsHelp";

// interfaces
import type { MenuData } from "@/interfaces/interfaces";

export default function Main() {
  const [MENU_ASIDE_DATA, SET_MENU_ASIDE_DATA] = useState<MenuData[]>(
    LEFT_ASIDEMENU_MENU_DATA
  );

  const [ASIDE_DATA, SET_ASIDE_DATA] =
    useState<MenuData[]>(LEFT_ASIDEMENU_DATA);

  const [SETTINGS_ASIDE_DATA, SET_SETTINGS_ASIDE_DATA] = useState<MenuData[]>(
    LEFT_ASIDEMENU_SETTINGS_DATA
  );

  return (
    <main className="flex flex-col flex-1">
      <LinksBlock
        title="MENU"
        data={MENU_ASIDE_DATA}
        onMouseFunction={(data, chosen, setter) =>
          Change_aside_data(data, chosen, setter)
        }
        setter={SET_MENU_ASIDE_DATA}
      />

      <LinksBlock
        title="DATA"
        data={ASIDE_DATA}
        onMouseFunction={(data, chosen, setter) =>
          Change_aside_data(data, chosen, setter)
        }
        setter={SET_ASIDE_DATA}
        till_end_status={true}
      />

      <LinksBlock
        data={SETTINGS_ASIDE_DATA}
        onMouseFunction={(data, chosen, setter) =>
          Change_aside_data(data, chosen, setter)
        }
        setter={SET_SETTINGS_ASIDE_DATA}
      />
    </main>
  );
}
