import { memo } from "react";
import type {} from "react";

import { Avatar, Box, Divider, Drawer, Group, Navbar, NavLink as MantineNavLink, ScrollArea, Text } from "@mantine/core";
import type { DrawerProps } from "@mantine/core";

import {
  IconAffiliate,
  IconApps,
  IconBook2,
  IconCalendarEvent,
  IconGauge,
  IconHome,
  IconInfoCircle,
  IconLink,
  IconPhone,
  IconQuestionMark,
  IconReport,
  IconTable,
} from "@tabler/icons";

import { Logo } from "~/libs/unej-io/components/core";
import { useSharedStyles } from "~/libs/unej-io/hooks/styles";

import route from "~/const/route";

import { ButtonLink, NavLink } from "~/components/core";

import useAuthStore from "~/stores/auth";

const PageDrawerAuthLinks = memo(() => {
  const { user } = useAuthStore();

  if (!user) {
    return (
      <Box p="xs">
        <Group>
          <ButtonLink href="/sign-in" variant="outline">
            Sign In
          </ButtonLink>

          <ButtonLink href="/sign-up" variant="gradient">
            Sign Up
          </ButtonLink>
        </Group>
      </Box>
    );
  }

  return (
    <Box p="xs">
      <Group noWrap>
        <Avatar variant="gradient" radius="xl" size="md" />

        <Box component={ScrollArea} my="-xs" py="xs">
          <Text size="sm">{user.displayName || "No name"}</Text>
          <Text size="sm">{user.email || "No email"}</Text>
        </Box>
      </Group>
    </Box>
  );
});

const PageDrawerAuthNavLinks = memo(() => {
  const { user } = useAuthStore();

  if (!user) {
    return null;
  }

  return (
    <>
      <Divider my="sm" label="Auth" />
      <MantineNavLink component="a" href={route.host.app()} target="_blank" icon={<IconGauge />} label="App" variant="filled" />
    </>
  );
});

const PageDrawerNavLinks = memo(() => {
  return (
    <Box p="xs">
      <PageDrawerAuthNavLinks />
      <Divider my="sm" label="Main" />
      <NavLink href="/" icon={<IconHome />} label="Home" variant="filled" />
      <NavLink href="/about" icon={<IconInfoCircle />} label="About" variant="filled" />
      <NavLink href="/contact" icon={<IconPhone />} label="Contact" variant="filled" />
      <NavLink href="/events" icon={<IconCalendarEvent />} label="Events" variant="filled" />
      <Divider my="sm" label="Feature" />
      <NavLink href="/form" icon={<IconTable />} label="Form" variant="filled" />
      <NavLink href="/link" icon={<IconLink />} label="Link" variant="filled" />
      <NavLink href="/apps" icon={<IconApps />} label="Apps" variant="filled" />
      <Divider my="sm" label="Learn" />
      <NavLink href="/docs" icon={<IconBook2 />} label="Documentation" variant="filled" />
      <NavLink href="/contribute" icon={<IconAffiliate />} label="Contribute" variant="filled" />
      <Divider my="sm" label="Support" />
      <NavLink href="/faq" icon={<IconQuestionMark />} label="FAQ" variant="filled" />
      <NavLink href="/feedback" icon={<IconReport />} label="Feedback" variant="filled" />
    </Box>
  );
});

type PageDrawerProps = Omit<DrawerProps, "children">;

function PageDrawer(props: PageDrawerProps) {
  const { classes: sharedClasses } = useSharedStyles();

  return (
    <Drawer
      padding="lg"
      size="lg"
      overlayOpacity={0.3}
      overlayBlur={3}
      {...props}
      title={
        <div className={sharedClasses.flexCenter}>
          <Logo className={sharedClasses.logo} />
        </div>
      }
    >
      <Navbar py="sm" height="100%" sx={{ border: "none" }}>
        <Navbar.Section>
          <PageDrawerAuthLinks />
        </Navbar.Section>

        <Navbar.Section grow component={ScrollArea} mx="-xs" py="sm" px="xs">
          <PageDrawerNavLinks />
        </Navbar.Section>
      </Navbar>
    </Drawer>
  );
}

export type { PageDrawerProps };
export default memo(PageDrawer);
