import { memo } from "react";

import { Anchor, Group, Stack, Text } from "@mantine/core";
import type { GroupProps } from "@mantine/core";

import { APP } from "~/const/app";

import { AnchorLink } from "~/components/core";

type LinkObject = {
  label: string;
  links: {
    label: string;
    href: string;
    external?: boolean;
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
      },
      {
        label: "Follow on Tiktok",
        href: "/#",
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
          <Text weight={700}>{link.label}</Text>

          <Stack>
            {link.links.map((link, index) =>
              link.external ? (
                <Anchor key={link.label + index.toString()} variant="text" size="sm" href={link.href} target="_blank">
                  {link.label}
                </Anchor>
              ) : (
                <AnchorLink key={link.label + index.toString()} variant="text" size="sm" href={link.href}>
                  {link.label}
                </AnchorLink>
              )
            )}
          </Stack>
        </Stack>
      ))}
    </Group>
  );
}

export type { FooterLinksGroupProps };
export default memo(FooterLinksGroup);
