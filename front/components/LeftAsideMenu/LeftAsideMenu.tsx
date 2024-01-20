"use client";

// components
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";

// context
import { useGlobalModalStatus } from "@/context/CreateNewTaskModalContext";

export default function LeftAsideMenu() {
  const { storedLocalStorageValue } = useGlobalModalStatus();

  return (
    <aside
      className={`${
        storedLocalStorageValue.status ? "w-24" : "w-48"
      } h-screen transition-all duration-200 flex flex-col`}
    >
      {/* header */}
      <Header />

      {/* main */}
      <Main />

      {/* footer */}
      <Footer />
    </aside>
  );
}
