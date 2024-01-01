"use client";

import { createContext, useContext } from "react";

interface SizeSettingsContext {
  hideAsideMenu: boolean;
  setHideAsideMenu: (c: boolean) => void;
}

export const AsideMenuContext = createContext<SizeSettingsContext>({
  hideAsideMenu: false,
  setHideAsideMenu: () => {}
});

export const useAsideMenuContext = () => useContext(AsideMenuContext);
