import { Box, Divider, NavLink as MantineNavLink } from "@mantine/core";

import {
  IconAffiliate,
  IconApps,
  IconBook2,
  IconGauge,
  IconHome,
  IconInfoCircle,
  IconLink,
  IconPhone,
  IconQuestionMark,
  IconReport,
  IconTable,
} from "@tabler/icons";

import route from "~/const/route";

import { NavLink } from "~/components/core";

import useAuthStore from "~/stores/auth";

function DrawerNavLinks() {
  const { user } = useAuthStore();

  return (
    <Box py="xs" px="xs">
      {user && (
        <>
          <Divider my="sm" label="Auth" />
          <MantineNavLink component="a" href={route.host.app()} target="_blank" icon={<IconGauge />} label="App" variant="filled" />
        </>
      )}
      <Divider my="sm" label="Main" />
      <NavLink href="/" icon={<IconHome />} label="Home" variant="filled" />
      <NavLink href="/about" icon={<IconInfoCircle />} label="About" variant="filled" />
      <NavLink href="/contact" icon={<IconPhone />} label="Contact" variant="filled" />
      <Divider my="sm" label="Feature" />
      <NavLink href="/form" icon={<IconTable />} label="Form" variant="filled" />
      <NavLink href="/link" icon={<IconLink />} label="Link" variant="filled" />
      <NavLink href="/apps" icon={<IconApps />} label="Apps" variant="filled" />
      <Divider my="sm" label="Learn" />
      <NavLink href="/docs" icon={<IconBook2 />} label="Documentation" variant="filled" />
      <NavLink href="/contribute" icon={<IconAffiliate />} label="Contribute" variant="filled" />
      <Divider my="sm" label="Support" />
      <NavLink href="/faq" icon={<IconQuestionMark />} label="FAQ" variant="filled" />
      <NavLink href="/feedback" icon={<IconReport />} label="Feedback" variant="filled" />
    </Box>
  );
}

export default DrawerNavLinks;
