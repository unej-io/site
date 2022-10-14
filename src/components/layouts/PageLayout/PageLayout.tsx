import { memo, useCallback, useEffect, useRef, useState } from "react";
import type { PropsWithChildren } from "react";

import type { GetLayout } from "next";
import { useRouter } from "next/router";

import { ActionIcon, Anchor, Box, Container, Group, Stack, Text, useMantineTheme } from "@mantine/core";
import { useMediaQuery, useWindowScroll } from "@mantine/hooks";

import { IconMenu2 } from "@tabler/icons";

import { Logo } from "~/libs/unej-io/components/core";

import { StatusBadge } from "~/components/core";
import { AppToolbarGroup, PageDrawer, ScrollToTop } from "~/components/interfaces";
import { useSharedStyles } from "~/hooks/core";

import useStyles from "./styles";

import HeaderLinksGroup from "./components/HeaderLinksGroup";

import AuthLinksGroup from "./components/AuthLinksGroup";
import FooterLinksGroup from "./components/FooterLinksGroup";

const PageHeader = memo((props: { onMenuClick: () => void }) => {
  const { classes: sharedClasses } = useSharedStyles();
  const { classes, cx } = useStyles();

  const [scroll] = useWindowScroll();

  return (
    <header className={cx(classes.header, scroll.y > 10 && classes.headerShadow, sharedClasses.blurredBackground)}>
      <Container size="xl" px="xl" className={sharedClasses.fullHeight}>
        <Group align="center" spacing="xl" className={sharedClasses.fullHeight}>
          <ActionIcon onClick={props.onMenuClick} className={classes.header__menu_action}>
            <IconMenu2 />
          </ActionIcon>

          <Anchor href="/" variant="text" className={sharedClasses.flexCenter} aria-label="unej.io logo">
            <Logo className={sharedClasses.logo} />
          </Anchor>

          <StatusBadge variant="outline" size="lg" />

          <Box sx={{ flexGrow: 1 }} />

          <HeaderLinksGroup mx="xl" spacing="xl" className={classes.header__links_group} />

          <AppToolbarGroup />

          <AuthLinksGroup className={classes.header__auth_links_group} />
        </Group>
      </Container>
    </header>
  );
});

const PageMain = memo((props: PropsWithChildren<{}>) => {
  const { classes } = useStyles();

  return (
    <main className={classes.main}>
      <Container size="xl" px="xl">
        {props.children}
      </Container>
    </main>
  );
});

const PageFooter = memo(() => {
  const { classes: sharedClasses } = useSharedStyles();
  const { classes } = useStyles();

  return (
    <footer className={classes.footer}>
      <Container size="xl" px="xl" pb="xl">
        <Group position="apart" align="start">
          <Stack px="xl" mb="xl">
            <div>
              <Logo className={sharedClasses.logoSmall} />
            </div>
            <Text size="xs" color="dimmed">
              Build with ❤️ from student to student
            </Text>
          </Stack>

          <FooterLinksGroup align="start" px="xl" spacing={48} />
        </Group>
      </Container>
    </footer>
  );
});

type PageLayoutProps = PropsWithChildren<{}>;

function PageLayout(props: PageLayoutProps) {
  const router = useRouter();

  const theme = useMantineTheme();

  const [drawer, setDrawer] = useState(false);
  const openDrawer = useCallback(() => {
    setDrawer(true);
  }, []);
  const closeDrawer = useCallback(() => {
    setDrawer(false);
  }, []);

  const matchesLargerThanMedium = useMediaQuery(`(min-width: ${theme.breakpoints.md}px)`);
  const currentMatchesLargerThanMedium = useRef(matchesLargerThanMedium);

  useEffect(() => {
    const handler = () => {
      setTimeout(closeDrawer, 150);
    };

    router.events.on("routeChangeComplete", handler);
    router.events.on("routeChangeError", handler);

    return () => {
      router.events.off("routeChangeComplete", handler);
      router.events.off("routeChangeError", handler);
    };
  }, [router.asPath]);

  useEffect(() => {
    if (matchesLargerThanMedium !== currentMatchesLargerThanMedium.current) {
      closeDrawer();
      currentMatchesLargerThanMedium.current = matchesLargerThanMedium;
    }
  }, [matchesLargerThanMedium]);

  return (
    <>
      <PageHeader onMenuClick={openDrawer} />

      <PageDrawer opened={drawer} onClose={closeDrawer} />

      <PageMain>{props.children}</PageMain>

      <PageFooter />

      <ScrollToTop />
    </>
  );
}

const getPageLayout: GetLayout = (page) => {
  return <PageLayout>{page}</PageLayout>;
};

export type { PageLayoutProps };
export { getPageLayout };
export default PageLayout;
