import {} from "react";

import type { NextPageWithLayout } from "next";
import dynamic from "next/dynamic";

import { Container, Title } from "@mantine/core";

import { Head } from "~/components/core";
import { Loading } from "~/components/next/dynamic";
import { getMinimalPageLayout } from "~/components/layouts";

const AcakApp = dynamic(() => import(/* webpackChunkName: "feature/apps/acak-app" */ "~/components/features/apps/app/Acak"), {
  ssr: false,
  loading: Loading,
});

const AppAcakPage: NextPageWithLayout = () => {
  return (
    <>
      <Head title={{ prefix: "Acak App" }} />

      <Container size="lg" my="xl" p="xl">
        <Title align="center" mb="xl" sx={{ fontSize: "4rem" }}>
          Acak App
        </Title>

        <AcakApp />
      </Container>
    </>
  );
};

AppAcakPage.getLayout = getMinimalPageLayout;

export default AppAcakPage;
