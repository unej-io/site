import {} from "react";

import type { NextPageWithLayout } from "next";

import { Button, Container, createStyles, Group, Text, Title } from "@mantine/core";

import { Head } from "~/components/core";
import { getMinimalPageLayout } from "~/components/layouts";

const useStyles = createStyles((theme) => ({
  root: {
    position: "relative",
    paddingTop: 80,
    paddingBottom: 80,
  },

  background: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    zIndex: 0,
    display: "flex",
    justifyContent: "center",
    paddingTop: 55,
    opacity: 0.75,
    overflow: "hidden",
  },

  ["404"]: {
    color: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[1],
    fontSize: theme.fontSizes.xl * 24,

    [theme.fn.smallerThan("sm")]: {
      fontSize: theme.fontSizes.xl * 12,
    },
  },

  foreground: {
    paddingTop: 220,
    position: "relative",
    zIndex: 1,

    [theme.fn.smallerThan("sm")]: {
      paddingTop: 120,
    },
  },

  title: {
    textAlign: "center",
    fontWeight: 900,
    fontSize: 38,

    [theme.fn.smallerThan("sm")]: {
      fontSize: 32,
    },
  },

  description: {
    maxWidth: 540,
    margin: "auto",
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5,
  },
}));

const NotFoundPage: NextPageWithLayout = () => {
  const { classes } = useStyles();

  return (
    <>
      <Head title={{ prefix: "Not Found" }} />

      <Container className={classes.root}>
        <div className={classes.background}>
          <Text weight={700} className={classes[404]}>
            404
          </Text>
        </div>
        <div className={classes.foreground}>
          <Title className={classes.title}>Nothing to see here</Title>
          <Text color="dimmed" size="lg" align="center" className={classes.description}>
            Page you are trying to open does not exist. You may have mistyped the address, or the page has been moved to another URL. If you
            think this is an error contact support.
          </Text>
          <Group position="center">
            <Button component="a" href="/" size="md">
              Take me back to home page
            </Button>
          </Group>
        </div>
      </Container>
    </>
  );
};

NotFoundPage.getLayout = getMinimalPageLayout;

export default NotFoundPage;
