import {} from "react";

import type { NextPageWithLayout } from "next";

import { Container, Title } from "@mantine/core";

import { Head } from "~/components/core";
import { getPageLayout } from "~/components/layouts";

const FeedbackPage: NextPageWithLayout = () => {
  return (
    <>
      <Head title={{ prefix: "Feedback" }} />

      <Container size="lg" my="xl" p="xl">
        <Title align="center" mb="xl" sx={{ fontSize: "4rem" }}>
          Feedback
        </Title>

        <Title order={2} align="center" mb="xl" sx={{ fontSize: "3rem" }}>
          Coming Soon
        </Title>
      </Container>
    </>
  );
};

FeedbackPage.getLayout = getPageLayout;

export default FeedbackPage;
