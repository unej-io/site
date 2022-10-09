import { useEffect, useRef } from "react";
import type { PropsWithChildren } from "react";

import type { GetLayout } from "next";
import { useRouter } from "next/router";

import { ActionIcon, Anchor, Container, Drawer, Group, Navbar, ScrollArea, Stack, Text } from "@mantine/core";
import { useDisclosure, useMediaQuery, useWindowScroll } from "@mantine/hooks";

import { IconMenu2 } from "@tabler/icons";

import { Logo } from "~/libs/unej-io/components/core";
import { useSharedStyles } from "~/libs/unej-io/hooks/styles";

import { StatusBadge } from "~/components/core";

import useStyles from "./styles";

import HeaderLinksGroup from "./components/HeaderLinksGroup";
import ToolbarGroup from "./components/ToolbarGroup";
import AuthLinksGroup from "./components/AuthLinksGroup";
import DrawerAuthLinks from "./components/DrawerAuthLinks";
import DrawerNavLinks from "./components/DrawerNavLinks";
import FooterLinksGroup from "./components/FooterLinksGroup";

type PageLayoutProps = PropsWithChildren<{}>;

function PageLayout(props: PageLayoutProps) {
  const router = useRouter();

  const { classes: sharedClasses } = useSharedStyles();
  const { classes, cx, theme } = useStyles();

  const [scroll] = useWindowScroll();
  const [drawer, drawerHandle] = useDisclosure(false);

  const matchesLargerThanMedium = useMediaQuery(`(min-width: ${theme.breakpoints.md}px)`);
  const currentMatchesLargerThanMedium = useRef(matchesLargerThanMedium);

  useEffect(() => {
    const handler = () => {
      setTimeout(drawerHandle.close, 150);
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
      drawerHandle.close();
      currentMatchesLargerThanMedium.current = matchesLargerThanMedium;
    }
  }, [matchesLargerThanMedium]);

  return (
    <>
      <header className={cx(classes.header, scroll.y > 10 && classes.headerShadow, sharedClasses.blurredBackground)}>
        <Container size="xl" px="xl" className={sharedClasses.fullHeight}>
          <Group align="center" spacing="xl" className={sharedClasses.fullHeight}>
            <ActionIcon onClick={drawerHandle.open} className={classes.header__menu_action}>
              <IconMenu2 />
            </ActionIcon>

            <Anchor href="/" variant="text" className={sharedClasses.flexCenter}>
              <Logo className={classes.logo} />
            </Anchor>

            <StatusBadge variant="outline" size="lg" />

            <div style={{ flexGrow: 1 }} />

            <HeaderLinksGroup mx="xl" spacing="xl" className={classes.header__links_group} />

            <ToolbarGroup />

            <AuthLinksGroup className={classes.header__auth_links_group} />
          </Group>
        </Container>
      </header>

      <Drawer
        opened={drawer}
        onClose={drawerHandle.close}
        title={
          <Anchor component="button" variant="text" className={sharedClasses.flexCenter}>
            <Logo className={classes.logo} />
          </Anchor>
        }
        padding="xl"
        size="lg"
        overlayOpacity={0.3}
        overlayBlur={3}
      >
        <Navbar py="sm" className={classes.drawer__navbar} height="100%">
          <Navbar.Section>
            <DrawerAuthLinks />
          </Navbar.Section>

          <Navbar.Section grow component={ScrollArea} mx="-xs" my="sm" px="xs">
            <DrawerNavLinks />
          </Navbar.Section>
        </Navbar>
      </Drawer>

      <main className={classes.main}>
        <Container size="xl" px="xl">
          {props.children}
        </Container>
      </main>

      <footer className={classes.footer}>
        <Container size="xl" px="xl" pb="xl">
          <Group position="apart" align="start">
            <Stack px="xl" mb="xl">
              <Anchor href="/" variant="text">
                <Logo className={classes.logoSmall} />
              </Anchor>
              <Text size="xs" color="dimmed">
                Build with ❤️ from student to student
              </Text>
            </Stack>

            <FooterLinksGroup align="start" px="xl" spacing={64} />
          </Group>
        </Container>
      </footer>
    </>
  );
}

const getPageLayout: GetLayout = (page) => {
  return <PageLayout>{page}</PageLayout>;
};

export type { PageLayoutProps };
export { getPageLayout };
export default PageLayout;
