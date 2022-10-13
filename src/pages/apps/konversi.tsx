import {} from "react";

import type { NextPageWithLayout } from "next";
import dynamic from "next/dynamic";

import { Container, Title } from "@mantine/core";

import { Head } from "~/components/core";
import { Loading } from "~/components/next/dynamic";
import { getMinimalPageLayout } from "~/components/layouts";

const KonversiApp = dynamic(() => import(/* webpackChunkName: "feature/apps/konversi-app" */ "~/components/features/apps/app/Konversi"), {
  ssr: false,
  loading: Loading,
});

const AppKonversiPage: NextPageWithLayout = () => {
  return (
    <>
      <Head title={{ prefix: "Konversi App" }} />

      <Container size="lg" my="xl" p="xl">
        <Title align="center" mb="xl" sx={{ fontSize: "4rem" }}>
          Konversi App
        </Title>

        <KonversiApp />
      </Container>
    </>
  );
};

AppKonversiPage.getLayout = getMinimalPageLayout;

export default AppKonversiPage;
