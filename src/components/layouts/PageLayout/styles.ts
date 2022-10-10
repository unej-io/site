import { createStyles } from "@mantine/core";

const HeaderHeight = 64;

const useStyles = createStyles((theme) => ({
  header: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: HeaderHeight,
    transition: "box-shadow 150ms",
    zIndex: 1,
  },

  headerShadow: {
    boxShadow: theme.shadows.md,
  },

  logo: {
    height: 22,

    [theme.fn.largerThan("sm")]: {
      height: 28,
    },

    [theme.fn.largerThan("md")]: {
      height: 32,
    },
  },

  logoSmall: {
    height: 18,

    [theme.fn.largerThan("sm")]: {
      height: 24,
    },

    [theme.fn.largerThan("md")]: {
      height: 28,
    },
  },

  header__menu_action: {
    [theme.fn.largerThan("lg")]: {
      display: "none",
    },
  },

  header__links_group: {
    [theme.fn.smallerThan("lg")]: {
      display: "none",
    },
  },

  header__auth_links_group: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  drawer__navbar: {
    border: "none",
  },

  main: {
    position: "relative",
    marginTop: HeaderHeight,
    zIndex: 0,
  },

  footer: {
    position: "relative",
    marginTop: 64,
    marginBottom: 64,
    zIndex: 0,
  },
}));

export default useStyles;
