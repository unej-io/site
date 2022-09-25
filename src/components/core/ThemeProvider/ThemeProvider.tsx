import { useMemo } from "react";
import type { PropsWithChildren } from "react";

import { MantineProvider } from "@mantine/core";
import type { ColorScheme, MantineColor } from "@mantine/core";

import { createTheme } from "~/libs/unej-io/theme";

import useThemeStore, { createThemeStore, ThemeStoreProvider } from "~/stores/theme";

type ThemeProviderChildProps = PropsWithChildren<{}>;

function ThemeProviderChild(props: ThemeProviderChildProps) {
  const { colorScheme, primaryColor } = useThemeStore();

  const theme = useMemo(() => createTheme({ colorScheme, primaryColor }), [colorScheme, primaryColor]);

  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      {props.children}
    </MantineProvider>
  );
}

type ThemeProviderProps = PropsWithChildren<{
  colorScheme?: ColorScheme;
  primaryColor?: MantineColor;
}>;

function ThemeProvider(props: ThemeProviderProps) {
  const { colorScheme, primaryColor } = props;
  const createStore = useMemo(() => createThemeStore({ colorScheme, primaryColor }), [colorScheme, primaryColor]);

  return (
    <ThemeStoreProvider createStore={createStore}>
      <ThemeProviderChild>{props.children}</ThemeProviderChild>
    </ThemeStoreProvider>
  );
}

export type { ThemeProviderProps };
export default ThemeProvider;
