import {} from "react";

import type { NextPageWithLayout } from "next";

import { Container, Title } from "@mantine/core";

import { Head } from "~/components/core";
import { getPageLayout } from "~/components/layouts";

const LinkPage: NextPageWithLayout = () => {
  return (
    <>
      <Head title={{ prefix: "Link" }} />

      <Container size="lg" my="xl" p="xl">
        <Title align="center" mb="xl" sx={{ fontSize: "4rem" }}>
          Link
        </Title>
      </Container>
    </>
  );
};

LinkPage.getLayout = getPageLayout;

export default LinkPage;
