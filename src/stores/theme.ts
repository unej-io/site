import create from "zustand";
import createContext from "zustand/context";
import type { StoreApi } from "zustand";

import type { ColorScheme, MantineColor, MantineSize } from "@mantine/core";

import { defaultThemeSystemValue, isValidColorScheme, isValidPrimaryColor, isValidDefaultRadius } from "@unej-io/ui/system";
import type { ThemeSystemState } from "@unej-io/ui/system";

import { getCookie, setCookie } from "cookies-next";
import type { OptionsType } from "cookies-next/lib/types";

import { BroadcastChannel } from "broadcast-channel";

import { withDevtools } from "./@utilities";

const NAME = "unej-io:theme-store";

const expires = () => new Date(new Date().getTime() + 15552000000);

function setColorSchemeCookie(colorScheme: ColorScheme) {
  setCookie(NAME + ":color-scheme", colorScheme, { expires: expires() });
  return colorScheme;
}

function setPrimaryColorCookie(primaryColor: MantineColor) {
  setCookie(NAME + ":primary-color", primaryColor, { expires: expires() });
  return primaryColor;
}

function setDefaultRadiusCookie(radius: MantineSize) {
  setCookie(NAME + ":default-radius", radius, { expires: expires() });
  return radius;
}

type ThemeStoreState = ThemeSystemState;

type ThemeStoreAction = {
  toggleColorScheme: () => void;
  setColorScheme: (colorScheme?: ColorScheme | (string & {})) => void;
  setPrimaryColor: (primaryColor?: MantineColor | (string & {})) => void;
  setDefaultRadius: (defaultRadius?: MantineSize | (string & {})) => void;
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
      type: "set-default-radius";
      payload: MantineSize;
    };

const channel: BroadcastChannel<ThemeStoreMessageData> | null =
  typeof window !== "undefined" ? new BroadcastChannel<ThemeStoreMessageData>(NAME) : null;

type CreateThemeStoreOptions = Partial<ThemeSystemState>;

const createThemeStore =
  (options: CreateThemeStoreOptions = {}) =>
  () => {
    const { colorScheme, primaryColor, defaultRadius } = options;

    return create<ThemeStoreType>()(
      withDevtools(
        (set, get) =>
          ({
            colorScheme: colorScheme || defaultThemeSystemValue.colorScheme,
            primaryColor: primaryColor || defaultThemeSystemValue.primaryColor,
            defaultRadius: defaultRadius || defaultThemeSystemValue.defaultRadius,
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
            setDefaultRadius: (defaultRadius) => {
              if (isValidDefaultRadius(defaultRadius)) {
                set({ defaultRadius: setDefaultRadiusCookie(defaultRadius) });
                channel?.postMessage({ type: "set-default-radius", payload: defaultRadius });
              }
            },
            setState: ({ colorScheme, primaryColor, defaultRadius }) => {
              let state: Partial<ThemeStoreState> = {};

              if (isValidColorScheme(colorScheme)) state.colorScheme = setColorSchemeCookie(colorScheme);
              if (isValidPrimaryColor(primaryColor)) state.primaryColor = setPrimaryColorCookie(primaryColor);
              if (isValidDefaultRadius(defaultRadius)) state.defaultRadius = setDefaultRadiusCookie(defaultRadius);

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

function getDefaultRadiusCookie(options: OptionsType) {
  const value = getCookie(NAME + ":default-radius", options);
  return isValidDefaultRadius(value) ? value : undefined;
}

const { Provider: ThemeStoreProvider, useStore: useThemeStore } = createContext<StoreApi<ThemeStoreType>>();

export type { ThemeStoreState, ThemeStoreAction, ThemeStoreType, ThemeStoreMessageData };
export { channel };
export { createThemeStore };
export { ThemeStoreProvider };
export { getColorSchemeCookie, getPrimaryColorCookie, getDefaultRadiusCookie };
export default useThemeStore;
