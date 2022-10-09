import { useRef } from "react";

import type { NextPageWithLayout } from "next";

import { Anchor, Box, Container, Grid, Text, Title } from "@mantine/core";

import { Head } from "~/components/core";
import { getPageLayout } from "~/components/layouts";

type Team = {
  name: string;
  url: string;
  description: string;
};

type TeamCardProps = {
  team: Team;
};

function TeamCard(props: TeamCardProps) {
  const { name, url, description } = props.team;

  return (
    <Box>
      <Anchor href={url}>{name}</Anchor>
      <Text color="dimmed" size="sm">
        {description}
      </Text>
    </Box>
  );
}

const TeamsPage: NextPageWithLayout = () => {
  const teams = useRef<Team[]>([
    {
      name: "Muhammad Faisal Amruddin",
      url: "flamrdevs",
      description: "Fakultas Ilmu Komputer | 2018",
    },
  ]);

  return (
    <>
      <Head title={{ prefix: "Teams" }} />

      <Container size="lg" my="xl" p="xl">
        <Title align="center" mb="xl" sx={{ fontSize: "4rem" }}>
          Teams
        </Title>

        <Grid>
          {teams.current.map((team) => (
            <Grid.Col key={team.url} span={12} md={6} lg={4}>
              <TeamCard team={team} />
            </Grid.Col>
          ))}
        </Grid>
      </Container>
    </>
  );
};

TeamsPage.getLayout = getPageLayout;

export default TeamsPage;
