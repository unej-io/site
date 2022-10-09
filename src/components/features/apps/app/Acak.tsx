import { useCallback, useEffect } from "react";

import { Button, Container, Grid, Group, List, NumberInput, Paper, Stack, Text } from "@mantine/core";
import { useSessionStorage } from "@mantine/hooks";

import { IconArrowsShuffle } from "@tabler/icons";

import { createArray } from "javascript-yesterday";

function AcakKelompokBerdasarkanNomor() {
  const [fromNumber, setFromNumber] = useSessionStorage<number | undefined>({
    key: "acak-kelompok-berdasarkan-nomor:from-number",
    defaultValue: 1,
  });
  const [toNumber, setToNumber] = useSessionStorage<number | undefined>({
    key: "acak-kelompok-berdasarkan-nomor:to-number",
    defaultValue: 10,
  });
  const [size, setSize] = useSessionStorage<number | undefined>({ key: "acak-kelompok-berdasarkan-nomor:size", defaultValue: 5 });

  const [result, setResult] = useSessionStorage<number[][]>({ key: "acak-kelompok-berdasarkan-nomor:result", defaultValue: [] });

  const shuffleArray = useCallback(<T extends string | number>(input: T[]) => {
    const clone = [...input];
    for (let i = clone.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [clone[i], clone[j]] = [clone[j], clone[i]];
    }
    return clone;
  }, []);

  const chunkArray = useCallback(<T extends string | number>(size: number, input: T[]) => {
    return input.reduce((result, one, i) => {
      const ch = Math.floor(i / size);
      result[ch] = ([] as T[]).concat(result[ch] || [], one);
      return result;
    }, [] as T[][]);
  }, []);

  useEffect(() => {
    if (typeof fromNumber === "number" && typeof toNumber === "number" && toNumber <= fromNumber) {
      setToNumber(fromNumber + 1);
    }
  }, [fromNumber, toNumber]);

  return (
    <Paper p="xl">
      <Stack>
        <Text size="xl">Kelompok Berdasarkan Nomor</Text>

        <Stack px="xs">
          <Group grow>
            <NumberInput label="Nomor awal" placeholder="..." value={fromNumber} onChange={setFromNumber} min={0} />
            <NumberInput label="Nomor akhir" placeholder="..." value={toNumber} onChange={setToNumber} min={fromNumber} />
            <NumberInput
              label="Tiap kelompok"
              placeholder="..."
              value={size}
              onChange={setSize}
              min={1}
              max={typeof fromNumber === "number" && typeof toNumber === "number" ? toNumber - fromNumber : undefined}
            />
          </Group>

          <Button
            leftIcon={<IconArrowsShuffle />}
            onClick={() => {
              if (typeof fromNumber === "number" && typeof toNumber === "number" && typeof size === "number") {
                setResult(chunkArray(size, shuffleArray(createArray(toNumber - fromNumber + 1, (i) => i - 1 + fromNumber))));
              }
            }}
          >
            Acak
          </Button>
        </Stack>

        <Grid px="xs">
          {result.map((group) => (
            <Grid.Col key={`${group.join("-")}`} span={12} xs={6} md={3}>
              <Paper px="lg" py="md" withBorder>
                <List>
                  {group.map((value) => (
                    <List.Item key={`${value}`}>{value}</List.Item>
                  ))}
                </List>
              </Paper>
            </Grid.Col>
          ))}
        </Grid>
      </Stack>
    </Paper>
  );
}

function Acak() {
  return (
    <Container size="md">
      <Stack>
        <AcakKelompokBerdasarkanNomor />
      </Stack>
    </Container>
  );
}

export default Acak;
