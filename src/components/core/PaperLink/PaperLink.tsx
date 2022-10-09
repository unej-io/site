import { forwardRef } from "react";

import NextLink from "next/link";
import type { LinkProps as NextLinkProps } from "next/link";

import { Paper } from "@mantine/core";
import type { PaperProps } from "@mantine/core";

type PaperLinkProps = PaperProps & NextLinkProps;

const PaperLink = forwardRef<HTMLAnchorElement, PaperLinkProps>((props, ref) => {
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
      <Paper ref={ref} component="a" {...rest} />
    </NextLink>
  );
});

export type { PaperLinkProps };
export default PaperLink;
