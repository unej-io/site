import { memo } from "react";
import type { PropsWithChildren } from "react";

import type { GetLayout } from "next";

import { Anchor, Box, Center, Container, Group, Text } from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";

import { APP } from "~/const/app";

import { Logo } from "~/libs/unej-io/components/core";
import { useSharedStyles } from "~/libs/unej-io/hooks/styles";

import { StatusBadge } from "~/components/core";
import { AppToolbarGroup, ScrollToTop } from "~/components/interfaces";

import useStyles from "./styles";

const MinimalPageHeader = memo(() => {
  const { classes: sharedClasses } = useSharedStyles();
  const { classes, cx } = useStyles();

  const [scroll] = useWindowScroll();

  return (
    <header className={cx(classes.header, scroll.y > 10 && classes.headerShadow, sharedClasses.blurredBackground)}>
      <Container size="xl" px="xl" className={sharedClasses.fullHeight}>
        <Group align="center" spacing="xl" className={sharedClasses.fullHeight}>
          <Anchor href="/" variant="text" className={sharedClasses.flexCenter}>
            <Logo className={sharedClasses.logo} />
          </Anchor>

          <StatusBadge variant="outline" size="lg" />

          <Box sx={{ flexGrow: 1 }} />

          <AppToolbarGroup />
        </Group>
      </Container>
    </header>
  );
});

const MinimalPageMain = memo((props: PropsWithChildren<{}>) => {
  const { classes } = useStyles();

  return (
    <main className={classes.main}>
      <Container size="xl" px="xl">
        {props.children}
      </Container>
    </main>
  );
});

const MinimalPageFooter = memo(() => {
  const { classes } = useStyles();

  return (
    <footer className={classes.footer}>
      <Container size="xl" px="xl" pb="xl">
        <Center>
          <Text size="xs" color="dimmed">
            © 2022 - {APP.name}
          </Text>
        </Center>
      </Container>
    </footer>
  );
});

type MinimalPageLayoutProps = PropsWithChildren<{}>;

function MinimalPageLayout(props: MinimalPageLayoutProps) {
  return (
    <>
      <MinimalPageHeader />

      <MinimalPageMain>{props.children}</MinimalPageMain>

      <MinimalPageFooter />

      <ScrollToTop />
    </>
  );
}

const getMinimalPageLayout: GetLayout = (page) => {
  return <MinimalPageLayout>{page}</MinimalPageLayout>;
};

export type { MinimalPageLayoutProps };
export { getMinimalPageLayout };
export default MinimalPageLayout;
