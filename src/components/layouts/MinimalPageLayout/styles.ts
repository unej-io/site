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

  main: {
    position: "relative",
    marginTop: HeaderHeight,
    zIndex: 0,
  },

  footer: {
    position: "relative",
    zIndex: 0,
  },
}));

export default useStyles;
