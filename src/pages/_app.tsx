import {} from "react";

import App from "next/app";
import type { AppContext, AppInitialProps, AppPropsWithLayout } from "next/app";

import type { ColorScheme, MantineColor } from "@mantine/core";

import { AppSpotlight, AuthProvider, Head, ThemeProvider } from "~/components/core";

import { getColorSchemeCookie, getPrimaryColorCookie } from "~/stores/theme";

type ExtraAppProps = {
  colorScheme?: ColorScheme;
  primaryColor?: MantineColor;
};

type _AppProps = AppPropsWithLayout & ExtraAppProps;

function _App({ Component, pageProps, colorScheme, primaryColor }: _AppProps) {
  const getLayout = Component.getLayout ?? ((page) => <>{page}</>);

  return (
    <>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />

        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
      </Head>

      <AuthProvider>
        <ThemeProvider colorScheme={colorScheme} primaryColor={primaryColor}>
          <AppSpotlight>{getLayout(<Component {...pageProps} />)}</AppSpotlight>
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}

_App.getInitialProps = async (appContext: AppContext): Promise<AppInitialProps & ExtraAppProps> => {
  const appProps: AppInitialProps = await App.getInitialProps(appContext);

  const { req, res } = appContext.ctx;
  const colorScheme = getColorSchemeCookie({ req, res });
  const primaryColor = getPrimaryColorCookie({ req, res });

  const extraAppProps: ExtraAppProps = {
    colorScheme,
    primaryColor,
  };

  return {
    ...appProps,
    ...extraAppProps,
  };
};

export type { _AppProps };
export default _App;
