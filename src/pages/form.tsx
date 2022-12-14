import {} from "react";

import type { NextPageWithLayout } from "next";

import { Container, Title } from "@mantine/core";

import { Head } from "~/components/core";
import { getPageLayout } from "~/components/layouts";

const FormPage: NextPageWithLayout = () => {
  return (
    <>
      <Head title={{ prefix: "Form" }} />

      <Container size="lg" my="xl" p="xl">
        <Title align="center" mb="xl" sx={{ fontSize: "4rem" }}>
          Form
        </Title>
      </Container>
    </>
  );
};

FormPage.getLayout = getPageLayout;

export default FormPage;
