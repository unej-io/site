import create from "zustand";
import createContext from "zustand/context";
import type { StoreApi } from "zustand";

import type { ColorScheme, MantineColor, MantineSize } from "@mantine/core";

import { getCookie, setCookie } from "cookies-next";
import type { OptionsType } from "cookies-next/lib/types";

import { BroadcastChannel } from "broadcast-channel";

import { isTypeofString } from "javascript-yesterday";

import { withDevtools } from "./@utilities";

const NAME = "unej-io:theme-store";
const colorSchemes: ColorScheme[] = ["light", "dark"];
const primaryColors: MantineColor[] = ["red", "orange", "yellow", "green", "blue", "indigo", "grape", "gray"];
const radii: MantineSize[] = ["sm", "md", "lg"];

function isValidColorScheme(value: unknown): value is ColorScheme {
  return isTypeofString(value) && colorSchemes.includes(value as any);
}

function isValidPrimaryColor(value: unknown): value is MantineColor {
  return isTypeofString(value) && primaryColors.includes(value as any);
}

function isValidRadius(value: unknown): value is MantineSize {
  return isTypeofString(value) && radii.includes(value as any);
}

const expires = () => new Date(new Date().getTime() + 15552000000);

function setColorSchemeCookie(colorScheme: ColorScheme) {
  setCookie(NAME + ":color-scheme", colorScheme, { expires: expires() });
  return colorScheme;
}

function setPrimaryColorCookie(primaryColor: MantineColor) {
  setCookie(NAME + ":primary-color", primaryColor, { expires: expires() });
  return primaryColor;
}

function setRadiusCookie(radius: MantineSize) {
  setCookie(NAME + ":radius", radius, { expires: expires() });
  return radius;
}

type ThemeStoreState = {
  colorScheme: ColorScheme;
  primaryColor: MantineColor;
  radius: MantineSize;
};

type ThemeStoreAction = {
  toggleColorScheme: () => void;
  setColorScheme: (colorScheme?: ColorScheme | (string & {})) => void;
  setPrimaryColor: (primaryColor?: MantineColor | (string & {})) => void;
  setRadius: (radius?: MantineSize | (string & {})) => void;
  setState: (state: Partial<ThemeStoreState>) => void;
};

type ThemeStoreType = ThemeStoreState & ThemeStoreAction;

type ThemeStoreMessageData =
  | {
      type: "toggle-color-scheme";
      payload: ColorScheme;
    }
  | {
      type: "set-color-scheme";
      payload: ColorScheme;
    }
  | {
      type: "set-primary-color";
      payload: MantineColor;
    }
  | {
      type: "set-radius";
      payload: MantineSize;
    };

const channel: BroadcastChannel<ThemeStoreMessageData> | null =
  typeof window !== "undefined" ? new BroadcastChannel<ThemeStoreMessageData>(NAME) : null;

type CreateThemeStoreOptions = {
  colorScheme?: ColorScheme;
  primaryColor?: MantineColor;
  radius?: MantineSize;
};

const createThemeStore =
  (options: CreateThemeStoreOptions = {}) =>
  () => {
    const { colorScheme, primaryColor, radius } = options;

    return create<ThemeStoreType>()(
      withDevtools(
        (set, get) =>
          ({
            colorScheme: colorScheme || "light",
            primaryColor: primaryColor || "indigo",
            radius: radius || "md",
            toggleColorScheme: () => {
              const colorScheme = get().colorScheme === "dark" ? "light" : "dark";
              set({ colorScheme: setColorSchemeCookie(colorScheme) });
              channel?.postMessage({ type: "toggle-color-scheme", payload: colorScheme });
            },
            setColorScheme: (colorScheme) => {
              if (isValidColorScheme(colorScheme)) {
                set({ colorScheme: setColorSchemeCookie(colorScheme) });
                channel?.postMessage({ type: "set-color-scheme", payload: colorScheme });
              }
            },
            setPrimaryColor: (primaryColor) => {
              if (isValidPrimaryColor(primaryColor)) {
                set({ primaryColor: setPrimaryColorCookie(primaryColor) });
                channel?.postMessage({ type: "set-primary-color", payload: primaryColor });
              }
            },
            setRadius: (radius) => {
              if (isValidRadius(radius)) {
                set({ radius: setRadiusCookie(radius) });
                channel?.postMessage({ type: "set-radius", payload: radius });
              }
            },
            setState: ({ colorScheme, primaryColor, radius }) => {
              let state: Partial<ThemeStoreState> = {};

              if (isValidColorScheme(colorScheme)) state.colorScheme = setColorSchemeCookie(colorScheme);
              if (isValidPrimaryColor(primaryColor)) state.primaryColor = setPrimaryColorCookie(primaryColor);
              if (isValidRadius(radius)) state.radius = setRadiusCookie(radius);

              set(state);
            },
          } as ThemeStoreType),
        { name: NAME }
      )
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

function getRadiusCookie(options: OptionsType) {
  const value = getCookie(NAME + ":radius", options);
  return isValidRadius(value) ? value : undefined;
}

const { Provider: ThemeStoreProvider, useStore: useThemeStore } = createContext<StoreApi<ThemeStoreType>>();

export type { ThemeStoreState, ThemeStoreAction, ThemeStoreType, ThemeStoreMessageData };
export { colorSchemes, primaryColors, radii };
export { channel };
export { createThemeStore };
export { ThemeStoreProvider };
export { getColorSchemeCookie, getPrimaryColorCookie, getRadiusCookie };
export default useThemeStore;
