import {} from "react";

import type { NextPageWithLayout } from "next";

import { Anchor, Badge, Box, Center, Container, Grid, Group, Paper, Stack, Text, Title } from "@mantine/core";

import { IconLink, IconPhoto } from "@tabler/icons";

import { ActionIconLink, Head } from "~/components/core";
import { getPageLayout } from "~/components/layouts";

function AppImagePlaceholder() {
  return (
    <Paper withBorder sx={{ width: "100%", height: "100%", aspectRatio: "16/9", borderStyle: "dashed", borderWidth: 3 }}>
      <Center sx={{ width: "100%", height: "100%" }}>
        <IconPhoto size="5rem" />
      </Center>
    </Paper>
  );
}

const AppsPage: NextPageWithLayout = () => {
  return (
    <>
      <Head title={{ prefix: "Apps" }} />

      <Container size="lg" my="xl" p="xl">
        <Title align="center" mb="xl" sx={{ fontSize: "4rem" }}>
          Apps
        </Title>

        <Stack spacing="xl">
          <Paper p="md" withBorder>
            <Grid>
              <Grid.Col span={12} sm={6}>
                <Stack sx={{ width: "100%", height: "100%" }}>
                  <Group>
                    <Text size="xl">Acak</Text>
                    <Badge>Beta</Badge>

                    <div style={{ flexGrow: 1 }} />

                    <ActionIconLink href="/apps/acak">
                      <IconLink />
                    </ActionIconLink>
                  </Group>

                  <Box px="xs">
                    <Text>Tentang acak</Text>
                  </Box>

                  <div style={{ flexGrow: 1 }} />

                  <Text color="dimmed" size="sm">
                    Built by <Anchor href="/student/flamrdevs">flamrdevs</Anchor>
                  </Text>
                </Stack>
              </Grid.Col>
              <Grid.Col span={12} sm={6}>
                <AppImagePlaceholder />
              </Grid.Col>
            </Grid>
          </Paper>

          <Paper p="md" withBorder>
            <Grid>
              <Grid.Col span={12} sm={6}>
                <Stack sx={{ width: "100%", height: "100%" }}>
                  <Group>
                    <Text size="xl">Konversi</Text>
                    <Badge>Beta</Badge>

                    <div style={{ flexGrow: 1 }} />

                    <ActionIconLink href="/apps/konversi">
                      <IconLink />
                    </ActionIconLink>
                  </Group>

                  <Box px="xs">
                    <Text>Tentang konversi</Text>
                  </Box>

                  <div style={{ flexGrow: 1 }} />

                  <Text color="dimmed" size="sm">
                    Built by <Anchor href="/student/flamrdevs">flamrdevs</Anchor>
                  </Text>
                </Stack>
              </Grid.Col>
              <Grid.Col span={12} sm={6}>
                <AppImagePlaceholder />
              </Grid.Col>
            </Grid>
          </Paper>

          <Paper component="a" href="/contribute" p="xl" withBorder sx={{ borderStyle: "dashed", borderWidth: 3 }}>
            <Text size="xl" align="center">
              Ada masukan aplikasi?
            </Text>
            <Text size="xl" align="center">
              Atau ingin berkontribusi pengembangan aplikasi?
            </Text>
          </Paper>
        </Stack>
      </Container>
    </>
  );
};

AppsPage.getLayout = getPageLayout;

export default AppsPage;
