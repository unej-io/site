import { useCallback, useEffect, useState } from "react";

import { ActionIcon, Box, Container, Group, NumberInput, Paper, Select, Stack, Text } from "@mantine/core";

import { IconArrowsExchange2 } from "@tabler/icons";

function KonversiWaktuApp() {
  type Unit = "detik" | "menit" | "jam" | "hari" | "minggu";

  const units: Unit[] = ["detik", "menit", "jam", "hari", "minggu"];

  const [fromUnit, setFromUnit] = useState<Unit | null | (string & {})>("detik");
  const [toUnit, setToUnit] = useState<Unit | null | (string & {})>("detik");

  const [fromValue, setFromValue] = useState<number | undefined>(0);
  const [toValue, setToValue] = useState<number | undefined>();

  const getBase = useCallback((unit: Unit | null | (string & {})) => {
    switch (unit) {
      case "detik":
        return 1;

      case "menit":
        return 60;

      case "jam":
        return 3600;

      case "hari":
        return 86400;

      case "minggu":
        return 604800;

      default:
        return 1;
    }
  }, []);

  useEffect(() => {
    setToValue(typeof fromValue === "number" ? (fromValue * getBase(fromUnit)) / getBase(toUnit) : undefined);
  }, [fromUnit, toUnit, fromValue]);

  return (
    <Paper p="xl">
      <Stack>
        <Text size="xl">Waktu</Text>

        <Box px="xs">
          <Group>
            <Box sx={{ flexGrow: 1 }}>
              <Group>
                <Box sx={{ flexGrow: 1 }}>
                  <NumberInput placeholder="..." value={fromValue} onChange={setFromValue} min={0} precision={2} />
                </Box>
                <Select data={units} value={fromUnit} onChange={setFromUnit} sx={{ width: 120 }} />
              </Group>
            </Box>
            <ActionIcon
              onClick={() => {
                setFromUnit(toUnit);
                setToUnit(fromUnit);
              }}
            >
              <IconArrowsExchange2 />
            </ActionIcon>
            <Box sx={{ flexGrow: 1 }}>
              <Group>
                <Box sx={{ flexGrow: 1 }}>
                  <NumberInput placeholder="..." value={toValue} onChange={setToValue} min={0} precision={2} disabled />
                </Box>
                <Select data={units} value={toUnit} onChange={setToUnit} sx={{ width: 120 }} />
              </Group>
            </Box>
          </Group>
        </Box>
      </Stack>
    </Paper>
  );
}

function Konversi() {
  return (
    <Container size="md">
      <Stack>
        <KonversiWaktuApp />
      </Stack>
    </Container>
  );
}

export default Konversi;
