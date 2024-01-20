"use client";

import { HOMEPAGE_HEADER } from "@/constants/HomepageHeader";

import { Tabs, Tab } from "@nextui-org/react";

import { useTheme } from "next-themes";

export default function HeaderController() {
  const { theme } = useTheme();

  return (
    <Tabs
      variant={theme === "dark" ? "underlined" : "solid"}
      color="primary"
      defaultSelectedKey="calendar"
    >
      {HOMEPAGE_HEADER.map((header) => {
        return (
          <Tab
            key={header.id}
            title={header.label}
            className="text-base font-semibold"
          />
        );
      })}
    </Tabs>
  );
}
