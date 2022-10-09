import { forwardRef } from "react";

import NextLink from "next/link";
import type { LinkProps as NextLinkProps } from "next/link";

import { Button } from "@mantine/core";
import type { ButtonProps } from "@mantine/core";

type ButtonLinkProps = ButtonProps & NextLinkProps;

const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>((props, ref) => {
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
      <Button ref={ref} component="a" {...rest} />
    </NextLink>
  );
});

export type { ButtonLinkProps };
export default ButtonLink;
