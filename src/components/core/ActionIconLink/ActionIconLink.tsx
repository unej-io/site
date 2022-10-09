import { forwardRef } from "react";

import NextLink from "next/link";
import type { LinkProps as NextLinkProps } from "next/link";

import { ActionIcon } from "@mantine/core";
import type { ActionIconProps } from "@mantine/core";

type ActionIconLinkProps = ActionIconProps & NextLinkProps;

const ActionIconLink = forwardRef<HTMLAnchorElement, ActionIconLinkProps>((props, ref) => {
  const { href, as, replace, scroll, shallow, passHref = true, locale, prefetch, legacyBehavior, ...rest } = props;
  return (
    <NextLink
      href={href}
      as={as}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      passHref={passHref}
      locale={locale}
      prefetch={prefetch}
      legacyBehavior={legacyBehavior}
    >
      <ActionIcon ref={ref} component="a" {...rest} />
    </NextLink>
  );
});

export type { ActionIconLinkProps };
export default ActionIconLink;
