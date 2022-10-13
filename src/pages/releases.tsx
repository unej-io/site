import {} from "react";

import type { NextPageWithLayout } from "next";

import { Container, List, Paper, Stack, Text, Timeline, Title } from "@mantine/core";

import { Head } from "~/components/core";
import { getPageLayout } from "~/components/layouts";

const ReleasesPage: NextPageWithLayout = () => {
  return (
    <>
      <Head title={{ prefix: "Releases" }} />

      <Container size="lg" my="xl" p="xl">
        <Title align="center" mb="xl" sx={{ fontSize: "4rem" }}>
          Releases
        </Title>

        <Container size="sm">
          <Timeline active={0}>
            <Timeline.Item title="Alpha release" lineVariant="dashed">
              <Text color="dimmed" size="sm">
                Release v1.0.0-alpha
              </Text>
              <Text size="xs" mt={4}>
                09-10-2022
              </Text>

              <Paper p="xs">
                <Stack>
                  <List>
                    <List.Item>Themeable</List.Item>
                    <List.Item>Layouting</List.Item>
                    <List.Item>Auth</List.Item>
                  </List>
                </Stack>
              </Paper>
            </Timeline.Item>

            <Timeline.Item title="Beta release" lineVariant="dotted">
              <Text color="dimmed" size="sm">
                Release v1.0.0-beta
              </Text>
              <Text size="xs" mt={4}>
                09-11-2022
              </Text>
            </Timeline.Item>

            <Timeline.Item title="Stable release" lineVariant="dotted">
              <Text color="dimmed" size="sm">
                Release v1.0.0
              </Text>
              <Text size="xs" mt={4}>
                09-12-2022
              </Text>
            </Timeline.Item>
          </Timeline>
        </Container>
      </Container>
    </>
  );
};

ReleasesPage.getLayout = getPageLayout;

export default ReleasesPage;
