import {} from "react";

import type { NextPageWithLayout } from "next";

import { Accordion, Container, Title } from "@mantine/core";

import { Head } from "~/components/core";
import { getPageLayout } from "~/components/layouts";

const FAQPage: NextPageWithLayout = () => {
  return (
    <>
      <Head title={{ prefix: "FAQ" }} />

      <Container size="md" my="xl" p="xl">
        <Title align="center" mb="xl">
          Frequently Asked Questions
        </Title>

        <Accordion variant="separated" defaultValue={["who-can-use"]} multiple>
          <Accordion.Item value="who-can-use">
            <Accordion.Control>Siapa yang dapat menggunakan platform unej.io?</Accordion.Control>
            <Accordion.Panel>Untuk saat ini pengguna platform hanya ditujukan kepada mahasiswa dan organisasi.</Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="who-can-contribute">
            <Accordion.Control>Siapa yang dapat berkontribusi untuk platform unej.io?</Accordion.Control>
            <Accordion.Panel>
              Seluruh instansi baik mahasiswa maupun staff yang mampu dan berkompeten memberikan kontribusi sesuai kemampuan dibidang
              masing-masing.
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="student-account">
            <Accordion.Control>Bagaimana cara membuat akun mahasiswa?</Accordion.Control>
            <Accordion.Panel>
              Daftar akun menggunakan email dan password. Kemudian lakukan verifikasi pengguna sebagai mahasiswa menggunakan NIM dan
              password sesuai akun pada SISTER.
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="organization-account">
            <Accordion.Control>Bagaimana cara membuat akun organisasi?</Accordion.Control>
            <Accordion.Panel>
              Daftar akun menggunakan email dan password. Kemudian lakukan verifikasi pengguna sebagai organisasi. Karena akun organisasi
              sifatnya terbatas maka harus melakukan persetujuan kepada team unej.io untuk mendapatkan id verifikasi.
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="device-lag">
            <Accordion.Control>Kenapa aplikasi terasa lambat?</Accordion.Control>
            <Accordion.Panel>
              Mungkin anda terlalu sering mengganti tema aplikasi sehingga memakan banyak memori. Silahkan refresh browser untuk menyegarkan
              kembali.
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Container>
    </>
  );
};

FAQPage.getLayout = getPageLayout;

export default FAQPage;
