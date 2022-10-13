import {} from "react";

import type { NextPageWithLayout } from "next";

import { Container, Title } from "@mantine/core";

import { Head } from "~/components/core";
import { getPageLayout } from "~/components/layouts";

const ContactPage: NextPageWithLayout = () => {
  return (
    <>
      <Head title={{ prefix: "Contact" }} />

      <Container size="lg" my="xl" p="xl">
        <Title align="center" mb="xl" sx={{ fontSize: "4rem" }}>
          Contact
        </Title>
      </Container>
    </>
  );
};

ContactPage.getLayout = getPageLayout;

export default ContactPage;
