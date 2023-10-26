"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  Switch,
  VisuallyHidden,
  useSwitch,
  SwitchProps,
} from "@nextui-org/react";
import { MoonIcon } from "./MoonIcon";
import { SunIcon } from "./SunIcon";

export function ThemeSwitcher(props: SwitchProps) {
  const [mounted, setMounted] = useState(false);
  const { setTheme } = useTheme();

  const {
    Component,
    slots,
    isSelected,
    getBaseProps,
    getInputProps,
    getWrapperProps,
  } = useSwitch(props);
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    isSelected ? setTheme("light") : setTheme("dark");
  }, [isSelected, setTheme]);

  if (!mounted) return null;

  return (
    <Component {...getBaseProps()}>
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <div
        {...getWrapperProps()}
        className={slots.wrapper({
          class: [
            "w-8 h-8",
            "flex items-center justify-center",
            "rounded-lg bg-default-100 hover:bg-default-200",
          ],
        })}
      >
        {isSelected ? <SunIcon /> : <MoonIcon />}
      </div>
    </Component>
  );
}
