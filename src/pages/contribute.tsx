import {} from "react";

import type { NextPageWithLayout } from "next";

import { Container, Title } from "@mantine/core";

import { Head } from "~/components/core";
import { getPageLayout } from "~/components/layouts";

const ContributePage: NextPageWithLayout = () => {
  return (
    <>
      <Head title={{ prefix: "Contribute" }} />

      <Container size="lg" my="xl" p="xl">
        <Title align="center" mb="xl" sx={{ fontSize: "4rem" }}>
          Contribute
        </Title>

        <Title order={2} align="center" mb="xl" sx={{ fontSize: "3rem" }}>
          Coming Soon
        </Title>
      </Container>
    </>
  );
};

ContributePage.getLayout = getPageLayout;

export default ContributePage;
