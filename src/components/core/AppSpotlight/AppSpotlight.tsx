import { useMemo } from "react";
import type { PropsWithChildren } from "react";

import { useRouter } from "next/router";

import { SpotlightProvider } from "@mantine/spotlight";
import type { SpotlightAction } from "@mantine/spotlight";

import { IconHome } from "@tabler/icons";

type AppSpotlightProps = PropsWithChildren<{}>;

function AppSpotlight(props: AppSpotlightProps) {
  const router = useRouter();

  const actions: SpotlightAction[] = useMemo(() => {
    return [
      {
        title: "Home",
        description: "Go to home page",
        onTrigger: () => router.push("/"),
        icon: <IconHome />,
      },
    ];
  }, []);

  return (
    <SpotlightProvider actions={actions} shortcut={["mod + P", "mod + K", "/"]} highlightQuery>
      {props.children}
    </SpotlightProvider>
  );
}

export type { AppSpotlightProps };
export default AppSpotlight;
