import { memo, useState } from "react";

import { ActionIcon, Box, Group, Loader, Menu, ScrollArea, Text } from "@mantine/core";
import type { GroupProps } from "@mantine/core";
import { showNotification } from "@mantine/notifications";

import { ButtonLink } from "@unej-io/ui/next";

import { IconLogout, IconLayoutDashboard, IconUserCircle } from "@tabler/icons";

import { signOut } from "~/libs/unej-io/firebase/auth";
import { getFirebaseErrorMessage } from "~/libs/unej-io/firebase/utilities";

import route from "~/const/route";

import useAuthStore from "~/stores/auth";

type AuthLinksGroupProps = GroupProps;

function AuthLinksGroup({ children, ...props }: AuthLinksGroupProps) {
  const { user, loading } = useAuthStore();

  const [logoutLoading, setLogoutLoading] = useState(false);

  async function handleSignOut() {
    try {
      setLogoutLoading(true);
      await signOut();
      setLogoutLoading(false);
    } catch (error) {
      const { code, message } = getFirebaseErrorMessage(error);
      showNotification({ id: code, title: code === "unknown" ? "Oh no!" : "Error!", message, color: "red" });
    }
  }

  if (loading) {
    return (
      <Group {...props}>
        <Loader size="sm" />
      </Group>
    );
  }

  if (!user) {
    return (
      <Group {...props}>
        <ButtonLink href="/sign-in" variant="outline">
          Sign In
        </ButtonLink>

        <ButtonLink href="/sign-up" variant="gradient">
          Sign Up
        </ButtonLink>
      </Group>
    );
  }

  return (
    <Group {...props}>
      <Menu shadow="md" position="bottom-end" withinPortal>
        <Menu.Target>
          <ActionIcon>
            <IconUserCircle />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Group p="sm" noWrap>
            <Box component={ScrollArea} my="-xs" py="xs">
              <Text size="sm">{user.displayName || "No name"}</Text>
              <Text size="sm">{user.email || "No email"}</Text>
            </Box>
          </Group>

          <Menu.Label>Application</Menu.Label>
          <Menu.Item component="a" href={route.host.app()} icon={<IconLayoutDashboard size={14} />}>
            Dashboard
          </Menu.Item>

          <Menu.Divider />

          <Menu.Label>Account</Menu.Label>
          <Menu.Item icon={<IconLogout size={14} />} onClick={handleSignOut} disabled={logoutLoading} closeMenuOnClick={false}>
            Sign Out
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}

export type { AuthLinksGroupProps };
export default memo(AuthLinksGroup);
