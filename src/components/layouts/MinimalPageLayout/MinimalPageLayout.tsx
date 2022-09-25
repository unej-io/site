import {} from "react";
import type { PropsWithChildren } from "react";

import type { GetLayout } from "next";

import { Center, Container, Group, Text } from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";

import { APP } from "~/const/app";

import { ColorSchemeTogglerActionIcon, PrimaryColorSelectMenuActionIcon, SpotlightOpenerActionIcon } from "~/components/core";
import { Logo } from "~/libs/unej-io/ui";
import { useSharedStyles } from "~/libs/unej-io/hooks/styles";

import useStyles from "./styles";

type MinimalPageLayoutProps = PropsWithChildren<{}>;

function MinimalPageLayout(props: MinimalPageLayoutProps) {
  const { classes: sharedClasses } = useSharedStyles();
  const { classes, cx } = useStyles();

  const [scroll] = useWindowScroll();

  return (
    <>
      <header className={cx(classes.header, scroll.y > 10 && classes.headerShadow, sharedClasses.blurredBackground)}>
        <Container size="xl" px="xl" className={sharedClasses.fullHeight}>
          <Group align="center" spacing="xl" className={sharedClasses.fullHeight}>
            <a href="/" className={sharedClasses.flexCenter}>
              <Logo className={classes.logo} />
            </a>

            <div style={{ flexGrow: 1 }} />

            <Group>
              <SpotlightOpenerActionIcon aria-label="app search" />

              <ColorSchemeTogglerActionIcon aria-label="toggle color scheme" />

              <PrimaryColorSelectMenuActionIcon aria-label="select primary color" />
            </Group>
          </Group>
        </Container>
      </header>

      <main className={classes.main} style={{ minHeight: "100vh" }}>
        <Container size="xl" px="xl">
          {props.children}
        </Container>
      </main>

      <footer className={classes.footer}>
        <Container size="xl" px="xl" pb="xl">
          <Center>
            <Text size="xs" color="dimmed">
              © 2022 - {APP.name}
            </Text>
          </Center>
        </Container>
      </footer>
    </>
  );
}

const getMinimalPageLayout: GetLayout = (page) => {
  return <MinimalPageLayout>{page}</MinimalPageLayout>;
};

export type { MinimalPageLayoutProps };
export { getMinimalPageLayout };
export default MinimalPageLayout;
