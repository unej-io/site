import { useEffect, useMemo } from "react";
import type { PropsWithChildren } from "react";

import { MantineProvider } from "@mantine/core";
import { useHotkeys } from "@mantine/hooks";
import type { HotkeyItem } from "@mantine/hooks";

import { emotionCache, createTheme } from "@unej-io/ui/core";
import type { ThemeSystemState } from "@unej-io/ui/system";

import useThemeStore, { channel, createThemeStore, ThemeStoreProvider } from "~/stores/theme";
import type { ThemeStoreMessageData } from "~/stores/theme";

type ThemeProviderChildProps = PropsWithChildren<{}>;

function ThemeProviderChild(props: ThemeProviderChildProps) {
  const { colorScheme, primaryColor, defaultRadius, toggleColorScheme, setState } = useThemeStore();

  const theme = useMemo(() => createTheme({ colorScheme, primaryColor, defaultRadius }), [colorScheme, primaryColor, defaultRadius]);

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

        case "set-default-radius":
          setState({ defaultRadius: data.payload });
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
    <MantineProvider emotionCache={emotionCache} theme={theme} withGlobalStyles withNormalizeCSS>
      {props.children}
    </MantineProvider>
  );
}

type ThemeProviderProps = PropsWithChildren<Partial<ThemeSystemState>>;

function ThemeProvider(props: ThemeProviderProps) {
  const { colorScheme, primaryColor, defaultRadius } = props;
  const createStore = useMemo(
    () => createThemeStore({ colorScheme, primaryColor, defaultRadius }),
    [colorScheme, primaryColor, defaultRadius]
  );

  return (
    <ThemeStoreProvider createStore={createStore}>
      <ThemeProviderChild>{props.children}</ThemeProviderChild>
    </ThemeStoreProvider>
  );
}

export type { ThemeProviderProps };
export default ThemeProvider;
