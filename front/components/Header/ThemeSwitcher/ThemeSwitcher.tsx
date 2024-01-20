"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

// components
import { Switch } from "@nextui-org/react";
import { Moon, SunMedium } from "lucide-react";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Switch
      defaultSelected={theme === "dark" ? true : false}
      size="md"
      color="primary"
      thumbIcon={({ isSelected, className }) =>
        isSelected ? (
          <SunMedium
            className={className}
            width={16}
            height={16}
            color="#56616b"
          />
        ) : (
          <Moon className={className} width={16} height={16} color="#56616b" />
        )
      }
      onValueChange={() => {
        theme === "dark" ? setTheme("light") : setTheme("dark");
      }}
    />
  );
}
