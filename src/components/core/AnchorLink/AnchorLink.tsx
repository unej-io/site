import { forwardRef } from "react";

import NextLink from "next/link";
import type { LinkProps as NextLinkProps } from "next/link";

import { Anchor } from "@mantine/core";
import type { AnchorProps } from "@mantine/core";

type AnchorLinkProps = AnchorProps & NextLinkProps;

const AnchorLink = forwardRef<HTMLAnchorElement, AnchorLinkProps>((props, ref) => {
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
      <Anchor ref={ref} component="a" {...rest} />
    </NextLink>
  );
});

export type { AnchorLinkProps };
export default AnchorLink;
