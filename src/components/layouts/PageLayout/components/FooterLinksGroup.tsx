import { memo } from "react";

import { Anchor, Group, Stack, Text } from "@mantine/core";
import type { GroupProps } from "@mantine/core";

import { AnchorLink } from "@unej-io/ui/next";

import { APP } from "~/const/app";

type LinkObject = {
  label: string;
  links: {
    label: string;
    href: string;
    external?: boolean;
    prevent?: boolean;
  }[];
};

const links: LinkObject[] = [
  {
    label: "About",
    links: [
      {
        label: "About",
        href: "/about",
      },
      {
        label: "Contact",
        href: "/contact",
      },
      {
        label: "Events",
        href: "/events",
      },
      {
        label: "Releases",
        href: "/releases",
      },
    ],
  },
  {
    label: "Features",
    links: [
      {
        label: "Form",
        href: "/form",
      },
      {
        label: "Link",
        href: "/link",
      },
      {
        label: "Apps",
        href: "/apps",
      },
    ],
  },
  {
    label: "Learn",
    links: [
      {
        label: "Documentation",
        href: "/docs",
      },
      {
        label: "Contribute",
        href: "/contribute",
      },
    ],
  },
  {
    label: "Support",
    links: [
      {
        label: "FAQ",
        href: "/faq",
      },
      {
        label: "Feedback",
        href: "/feedback",
      },
    ],
  },
  {
    label: "Community",
    links: [
      {
        label: "Stars on Github",
        href: APP.link.github,
        external: true,
      },
      {
        label: "Follow on Instagram",
        href: "/#",
        external: true,
        prevent: true,
      },
      {
        label: "Follow on Tiktok",
        href: "/#",
        external: true,
        prevent: true,
      },
    ],
  },
  {
    label: "More",
    links: [
      {
        label: "Universitas Jember",
        href: "https://unej.ac.id",
        external: true,
      },
    ],
  },
];

type FooterLinksGroupProps = GroupProps;

function FooterLinksGroup({ children, ...props }: FooterLinksGroupProps) {
  return (
    <Group {...props}>
      {links.map((link, index) => (
        <Stack key={link.label + index.toString()}>
          <Text size="lg" weight={700}>
            {link.label}
          </Text>

          <Stack>
            {link.links.map((link, index) => {
              const handleClick = (event: any) => {
                if (link.prevent) {
                  (event as MouseEvent).preventDefault();
                }
              };

              return link.external ? (
                <Anchor key={link.label + index.toString()} variant="text" size="sm" href={link.href} onClick={handleClick} target="_blank">
                  {link.label}
                </Anchor>
              ) : (
                <AnchorLink key={link.label + index.toString()} variant="text" size="sm" href={link.href} onClick={handleClick}>
                  {link.label}
                </AnchorLink>
              );
            })}
          </Stack>
        </Stack>
      ))}
    </Group>
  );
}

export type { FooterLinksGroupProps };
export default memo(FooterLinksGroup);
