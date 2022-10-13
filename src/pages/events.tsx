import {} from "react";

import type { NextPageWithLayout } from "next";

import { Container, Title } from "@mantine/core";

import { Head } from "~/components/core";
import { getPageLayout } from "~/components/layouts";

const EventsPage: NextPageWithLayout = () => {
  return (
    <>
      <Head title={{ prefix: "Events" }} />

      <Container size="lg" my="xl" p="xl">
        <Title align="center" mb="xl" sx={{ fontSize: "4rem" }}>
          Events
        </Title>

        <Title order={2} align="center" mb="xl" sx={{ fontSize: "3rem" }}>
          Coming Soon
        </Title>
      </Container>
    </>
  );
};

EventsPage.getLayout = getPageLayout;

export default EventsPage;
