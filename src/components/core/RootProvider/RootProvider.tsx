import {} from "react";
import type { PropsWithChildren } from "react";

import Spotlights from "./components/Spotlights";
import useCookie from "./hooks/useCookie";

type RootProviderProps = PropsWithChildren<{}>;

function RootProvider(props: RootProviderProps) {
  useCookie();

  return <Spotlights>{props.children}</Spotlights>;
}

export type { RootProviderProps };
export default RootProvider;
