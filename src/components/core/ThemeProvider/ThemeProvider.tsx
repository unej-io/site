import { useEffect, useMemo } from "react";
import type { PropsWithChildren } from "react";

import { MantineProvider } from "@mantine/core";
import type { ColorScheme, MantineColor, MantineSize } from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import type { HotkeyItem } from "@mantine/hooks";

import { cache, createTheme } from "~/libs/unej-io/theme";

import useThemeStore, { channel, createThemeStore, ThemeStoreProvider } from "~/stores/theme";
import type { ThemeStoreMessageData } from "~/stores/theme";

type ThemeProviderChildProps = PropsWithChildren<{}>;

function ThemeProviderChild(props: ThemeProviderChildProps) {
  const { colorScheme, primaryColor, radius, toggleColorScheme, setState } = useThemeStore();

  const theme = useMemo(() => createTheme(colorScheme, primaryColor, radius), [colorScheme, primaryColor, radius]);

  const hotkeys = useMemo((): HotkeyItem[] => [["mod+J", () => toggleColorScheme()]], []);
  useHotkeys(hotkeys);

  useEffect(() => {
    if (!channel) {
      return;
    }

    const handler = (data: ThemeStoreMessageData) => {
      switch (data.type) {
        case "toggle-color-scheme":
          setState({ colorScheme: data.payload });
          break;

        case "set-color-scheme":
          setState({ colorScheme: data.payload });
          break;

        case "set-primary-color":
          setState({ primaryColor: data.payload });
          break;

        case "set-radius":
          setState({ radius: data.payload });
          break;

        default:
          break;
      }
    };

    channel.addEventListener("message", handler);

    return () => {
      if (!channel) {
        return;
      }

      channel.removeEventListener("message", handler);
    };
  }, []);

  return (
    <MantineProvider emotionCache={cache} theme={theme} withGlobalStyles withNormalizeCSS>
      {props.children}
    </MantineProvider>
  );
}

type ThemeProviderProps = PropsWithChildren<{
  colorScheme?: ColorScheme;
  primaryColor?: MantineColor;
  radius?: MantineSize;
}>;

function ThemeProvider(props: ThemeProviderProps) {
  const { colorScheme, primaryColor, radius } = props;
  const createStore = useMemo(() => createThemeStore({ colorScheme, primaryColor, radius }), [colorScheme, primaryColor, radius]);

  return (
    <ThemeStoreProvider createStore={createStore}>
      <ThemeProviderChild>{props.children}</ThemeProviderChild>
    </ThemeStoreProvider>
  );
}

export type { ThemeProviderProps };
export default ThemeProvider;
