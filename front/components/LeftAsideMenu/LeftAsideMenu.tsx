"use client";

import { useEffect, useState } from "react";

// components
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";

// context
import { AsideMenuContext } from "../../context/LeftAsideMenuHeaderContext";

export default function LeftAsideMenu() {
  const [hideAsideMenu, setHideAsideMenu] = useState<boolean>(
    localStorage.getItem("aside_menu_settings")
      ? JSON.parse(localStorage.getItem("aside_menu_settings")!).status
      : false
  );

  // remember if user change status of left aside menu (large or small)
  useEffect(() => {
    localStorage.setItem(
      "aside_menu_settings",
      JSON.stringify({ status: hideAsideMenu })
    );
  }, [hideAsideMenu]);

  return (
    <aside
      className={`${
        hideAsideMenu ? "w-24" : "w-48"
      } h-screen transition-all duration-200 bg-white flex flex-col`}
    >
      <AsideMenuContext.Provider value={{ hideAsideMenu, setHideAsideMenu }}>
        {/* header */}
        <Header />

        {/* main */}
        <Main />

        {/* footer */}
        <Footer />
      </AsideMenuContext.Provider>
    </aside>
  );
}
