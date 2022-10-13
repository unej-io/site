import { useMemo } from "react";
import type { PropsWithChildren } from "react";

import { useRouter } from "next/router";

import { SpotlightProvider } from "@mantine/spotlight";
import type { SpotlightAction } from "@mantine/spotlight";

import {
  IconAffiliate,
  IconApps,
  IconBook2,
  IconCalendarEvent,
  IconHome,
  IconInfoCircle,
  IconLink,
  IconPhone,
  IconQuestionMark,
  IconReport,
  IconSearch,
  IconTable,
} from "@tabler/icons";

type SpotlightsProps = PropsWithChildren<{}>;

function Spotlights(props: SpotlightsProps) {
  const router = useRouter();

  const actions = useMemo((): SpotlightAction[] => {
    return [
      {
        title: "Home",
        description: "Go to home page",
        onTrigger: () => router.push("/"),
        icon: <IconHome />,
        group: "Main",
      },
      {
        title: "About",
        description: "Go to about page",
        onTrigger: () => router.push("/about"),
        icon: <IconInfoCircle />,
        group: "Main",
      },
      {
        title: "Contact",
        description: "Go to contact page",
        onTrigger: () => router.push("/contact"),
        icon: <IconPhone />,
        group: "Main",
      },
      {
        title: "Events",
        description: "Go to events page",
        onTrigger: () => router.push("/events"),
        icon: <IconCalendarEvent />,
        group: "Main",
      },
      {
        title: "Form",
        description: "Go to form page",
        onTrigger: () => router.push("/form"),
        icon: <IconTable />,
        group: "Feature",
      },
      {
        title: "Link",
        description: "Go to link page",
        onTrigger: () => router.push("/link"),
        icon: <IconLink />,
        group: "Feature",
      },
      {
        title: "Apps",
        description: "Go to apps page",
        onTrigger: () => router.push("/apps"),
        icon: <IconApps />,
        group: "Feature",
      },
      {
        title: "Documentation",
        description: "Go to documentation page",
        onTrigger: () => router.push("/docs"),
        icon: <IconBook2 />,
        group: "Learn",
      },
      {
        title: "Contribute",
        description: "Go to contribute page",
        onTrigger: () => router.push("/contribute"),
        icon: <IconAffiliate />,
        group: "Learn",
      },
      {
        title: "FAQ",
        description: "Go to faq page",
        onTrigger: () => router.push("/faq"),
        icon: <IconQuestionMark />,
        group: "Support",
      },
      {
        title: "Feedback",
        description: "Go to feedback page",
        onTrigger: () => router.push("/feedback"),
        icon: <IconReport />,
        group: "Support",
      },
    ];
  }, []);

  return (
    <SpotlightProvider
      actions={actions}
      searchIcon={<IconSearch size={20} />}
      searchPlaceholder="Search..."
      nothingFoundMessage="Nothing found..."
      shortcut="/"
      highlightQuery
    >
      {props.children}
    </SpotlightProvider>
  );
}

export type { SpotlightsProps };
export default Spotlights;
