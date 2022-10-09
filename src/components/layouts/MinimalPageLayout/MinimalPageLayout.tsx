import {} from "react";
import type { PropsWithChildren } from "react";

import type { GetLayout } from "next";

import { Anchor, Center, Container, Group, Text } from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";

import { APP } from "~/const/app";

import { Logo } from "~/libs/unej-io/components/core";
import { useSharedStyles } from "~/libs/unej-io/hooks/styles";

import { StatusBadge } from "~/components/core";

import ToolbarGroup from "../PageLayout/components/ToolbarGroup";

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
            <Anchor href="/" variant="text" className={sharedClasses.flexCenter}>
              <Logo className={classes.logo} />
            </Anchor>

            <StatusBadge variant="outline" size="lg" />

            <div style={{ flexGrow: 1 }} />

            <ToolbarGroup />
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
