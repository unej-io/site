import { memo } from "react";

import { Anchor, Group, Menu, Text } from "@mantine/core";
import type { GroupProps } from "@mantine/core";
import { NextLink } from "@mantine/next";

import { IconAffiliate, IconApps, IconBook2, IconChevronDown, IconLink, IconTable } from "@tabler/icons";

import { AnchorLink } from "~/components/core";

type LinkObject =
  | {
      label: string;
      href: string;
      links?: undefined;
    }
  | {
      label: string;
      href?: undefined;
      links: {
        label: string;
        icon: JSX.Element;
        href: string;
      }[];
    };

const links: LinkObject[] = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Events", href: "/events" },
  {
    label: "Features",
    links: [
      {
        label: "Form",
        icon: <IconTable size={20} />,
        href: "/form",
      },
      {
        label: "Link",
        icon: <IconLink size={20} />,
        href: "/link",
      },
      {
        label: "Apps",
        icon: <IconApps size={20} />,
        href: "/apps",
      },
    ],
  },
  {
    label: "Learn",
    links: [
      {
        label: "Documentation",
        icon: <IconBook2 size={20} />,
        href: "/docs",
      },
      {
        label: "Contribute",
        icon: <IconAffiliate size={20} />,
        href: "/contribute",
      },
    ],
  },
];

type HeaderLinksGroupProps = GroupProps;

function HeaderLinksGroup({ children, ...props }: HeaderLinksGroupProps) {
  return (
    <Group {...props}>
      {links.map((link) => {
        if (link.links) {
          return (
            <Menu key={link.label} shadow="md" trigger="hover" position="bottom-end">
              <Menu.Target>
                <Anchor component="button" variant="text" underline={false}>
                  <Group spacing={4}>
                    <Text component="span">{link.label}</Text>
                    <IconChevronDown size={16} />
                  </Group>
                </Anchor>
              </Menu.Target>

              <Menu.Dropdown>
                {link.links?.map((link) => (
                  <Menu.Item key={link.label} component={NextLink} href={link.href} icon={link.icon}>
                    {link.label}
                  </Menu.Item>
                ))}
              </Menu.Dropdown>
            </Menu>
          );
        } else {
          return (
            <AnchorLink key={link.label} href={link.href} variant="text" underline={false}>
              {link.label}
            </AnchorLink>
          );
        }
      })}
    </Group>
  );
}

export type { HeaderLinksGroupProps };
export default memo(HeaderLinksGroup);
