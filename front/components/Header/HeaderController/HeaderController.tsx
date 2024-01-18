"use client";

import { HOMEPAGE_HEADER } from "@/constants/HomepageHeader";

import { Tabs, Tab, Card } from "@nextui-org/react";

export default function HeaderController() {
  return (
    <Tabs>
      {HOMEPAGE_HEADER.map((header) => {
        return (
          <Tab key={header.id} title={header.label} className="text-base">
            <Card></Card>
          </Tab>
        );
      })}
    </Tabs>
  );
}
