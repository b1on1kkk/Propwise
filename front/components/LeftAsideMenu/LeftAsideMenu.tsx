"use client";

import { useState } from "react";

// components
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";

// context
import { AsideMenuContext } from "../../context/LeftAsideMenuHeaderContext";

export default function LeftAsideMenu() {
  const [hideAsideMenu, setHideAsideMenu] = useState<boolean>(true);

  return (
    <aside
      className={`${
        hideAsideMenu ? "w-24" : "w-60"
      } h-screen overflow-hidden transition-all duration-200 bg-white flex flex-col`}
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
