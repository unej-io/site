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

  const shuffleArray = useCallback((input: number[]) => {
    const clone = input.slice();
    for (let i = clone.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [clone[i], clone[j]] = [clone[j], clone[i]];
    }
    return clone.slice();
  }, []);

  const sortNumberFn = useCallback((a: number, b: number) => {
    return a - b;
  }, []);

  const getResult = useCallback((from: number, to: number, size: number) => {
    return shuffleArray(createArray(to - from + 1, (i) => i - 1 + from))
      .reduce((result, one, i) => {
        const ch = Math.floor(i / size);
        result[ch] = ([] as number[]).concat(result[ch] || [], one);
        return result;
      }, [] as number[][])
      .map((array) => [...array].sort(sortNumberFn));
  }, []);

  useEffect(() => {
    if (typeof fromNumber === "number" && typeof toNumber === "number" && toNumber <= fromNumber) {
      setToNumber(fromNumber + 1);
    }
  }, [fromNumber, toNumber]);

  useEffect(() => {
    if (typeof fromNumber === "number" && typeof toNumber === "number" && typeof size === "number") {
      const maxSize = toNumber - fromNumber + 1;
      if (size > maxSize) {
        setSize(maxSize);
      }
    }
  }, [fromNumber, toNumber, size]);

  const total = typeof fromNumber === "number" && typeof toNumber === "number" ? toNumber - fromNumber + 1 : undefined;
  const left = typeof total === "number" && typeof size === "number" ? total % size : undefined;

  return (
    <Paper p="xl">
      <Stack>
        <Text size="xl">Kelompok Berdasarkan Nomor</Text>

        <Stack px="xs">
          <Group grow>
            <NumberInput label="Nomor awal" placeholder="..." value={fromNumber} onChange={setFromNumber} min={0} />
            <NumberInput label="Nomor akhir" placeholder="..." value={toNumber} onChange={setToNumber} min={fromNumber} />

            <NumberInput label="Jumlah" value={total} disabled />
          </Group>
          <Group grow>
            <NumberInput label="Tiap kelompok" placeholder="..." value={size} onChange={setSize} min={1} max={total} />
            <NumberInput label="Sisa" value={left} disabled />
          </Group>

          <Button
            leftIcon={<IconArrowsShuffle />}
            onClick={() => {
              if (typeof fromNumber === "number" && typeof toNumber === "number" && typeof size === "number") {
                setResult(getResult(fromNumber, toNumber, size));
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
