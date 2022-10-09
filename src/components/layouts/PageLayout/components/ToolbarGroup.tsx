import { memo } from "react";

import { ActionIcon, Group, Popover, useMantineTheme } from "@mantine/core";
import type { GroupProps } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import { IconPalette } from "@tabler/icons";

import { ColorSchemeTogglerSwitch, PrimaryColorSelectGroup, SpotlightOpenerActionIcon } from "~/components/core";

type ToolbarGroupProps = GroupProps;

function ToolbarGroup(props: ToolbarGroupProps) {
  const theme = useMantineTheme();

  const matchesSmallerThanMedium = useMediaQuery(`(min-width: ${theme.breakpoints.sm}px)`);

  return (
    <Group {...props}>
      {matchesSmallerThanMedium && <SpotlightOpenerActionIcon aria-label="app search" />}

      {matchesSmallerThanMedium && (
        <Popover shadow="md" withArrow withinPortal>
          <Popover.Target>
            <ActionIcon aria-label="select primary color">
              <IconPalette />
            </ActionIcon>
          </Popover.Target>
          <Popover.Dropdown>
            <PrimaryColorSelectGroup />
          </Popover.Dropdown>
        </Popover>
      )}

      <ColorSchemeTogglerSwitch aria-label="switch color scheme" />
    </Group>
  );
}

export type { ToolbarGroupProps };
export default memo(ToolbarGroup);
