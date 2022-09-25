import create from "zustand";
import createContext from "zustand/context";
import type { StoreApi } from "zustand";
import { devtools } from "zustand/middleware";

import type { ColorScheme, MantineColor } from "@mantine/core";

import { getCookie, setCookie } from "cookies-next";
import type { OptionsType } from "cookies-next/lib/types";

import { isTypeofString } from "javascript-yesterday";

const NAME = "unej-io:theme-store";
const colorSchemes: ColorScheme[] = ["light", "dark"];
const primaryColors: MantineColor[] = [
  "blue",
  "cyan",
  "grape",
  "green",
  "indigo",
  "lime",
  "orange",
  "pink",
  "red",
  "teal",
  "violet",
  "yellow",
];

function isValidColorScheme(value: unknown): value is ColorScheme {
  return isTypeofString(value) && colorSchemes.includes(value as any);
}

function isValidPrimaryColor(value: unknown): value is MantineColor {
  return isTypeofString(value) && primaryColors.includes(value as any);
}

function setColorSchemeCookie(colorScheme: ColorScheme) {
  setCookie(NAME + ":color-scheme", colorScheme);
  return colorScheme;
}

function setPrimaryColorCookie(primaryColor: MantineColor) {
  setCookie(NAME + ":primary-color", primaryColor);
  return primaryColor;
}

type ThemeStoreState = {
  colorScheme: ColorScheme;
  primaryColor: MantineColor;
};

type ThemeStoreAction = {
  toggleColorScheme: () => void;
  setPrimaryColor: (primaryColor?: MantineColor) => void;
};

type ThemeStoreType = ThemeStoreState & ThemeStoreAction;

type CreateThemeStoreOptions = {
  colorScheme?: ColorScheme;
  primaryColor?: MantineColor;
};

const createThemeStore =
  (options: CreateThemeStoreOptions = {}) =>
  () => {
    const { colorScheme, primaryColor } = options;

    return create<ThemeStoreType>()(
      devtools((set, get) => ({
        colorScheme: colorScheme || "light",
        primaryColor: primaryColor || "indigo",
        toggleColorScheme: () => {
          set({ colorScheme: setColorSchemeCookie(get().colorScheme === "dark" ? "light" : "dark") });
        },
        setPrimaryColor: (primaryColor) => {
          if (isValidPrimaryColor(primaryColor)) set({ primaryColor: setPrimaryColorCookie(primaryColor) });
        },
      }))
    );
  };

function getColorSchemeCookie(options: OptionsType) {
  const value = getCookie(NAME + ":color-scheme", options);
  return isValidColorScheme(value) ? value : undefined;
}

function getPrimaryColorCookie(options: OptionsType) {
  const value = getCookie(NAME + ":primary-color", options);
  return isValidPrimaryColor(value) ? value : undefined;
}

const { Provider: ThemeStoreProvider, useStore: useThemeStore } = createContext<StoreApi<ThemeStoreType>>();

export type { ThemeStoreState, ThemeStoreAction, ThemeStoreType };
export { colorSchemes, primaryColors };
export { createThemeStore };
export { ThemeStoreProvider };
export { getColorSchemeCookie, getPrimaryColorCookie };
export default useThemeStore;
