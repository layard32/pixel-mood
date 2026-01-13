import { Box, Button, Stack, Text } from "@mantine/core";
import { getAllDaysOfYearByMonth } from "../utils/dateUtils";
import { useEntries } from "../hooks/useGetEntries";
import { getMoodColor } from "../utils/moodColor";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { EntryModal } from "./entryModal";
import { IconArrowBigUpLine } from "@tabler/icons-react";
import dayjs from "dayjs";

export function Calendar() {
  // usiamo l'util per ottenere una mappa contenente tutti i giorni dell'anno raggruppati per mese
  const daysByMonth: Record<string, string[]> = getAllDaysOfYearByMonth();

  // prendiamo la mappa contenente le entries dal custom hook
  const { data: entriesMap } = useEntries();

  // gestione del modale figlio
  const [opened, { open, close }] = useDisclosure(false);
  const handleModalOpen = () => {
    open();
  };

  // per modificare la grandezza del pulsante
  const isMobile = useMediaQuery("(max-width: 768px)");

  // per rendere il giorno attuale del calendario cliccabile (al contrario di tutti gli altri)
  const isCurrentDay = (day: string) => {
    const today = dayjs().format("YYYY-MM-DD");
    return day === today;
  };

  return (
    // usiamo Stack per disporre i mesi in colonna
    <>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "15px",
        }}
      >
        <Stack gap={10}>
          {/* iteriamo sulle chiavi della mappa, cioè sui mesi */}
          {Object.entries(daysByMonth).map(
            ([month, days]: [string, string[]]) => (
              // per ogni mese creiamo un Box parente (con Box)
              <Box
                key={month}
                style={{
                  display: "flex",
                  gap: "16px",
                  alignItems: "flex-start",
                }}
              >
                <Text
                  fz={{ base: "sm", sm: "md", md: "lg" }}
                  fw={500}
                  miw={{ base: "70px", sm: "95px", md: "110px" }}
                  style={{ flexShrink: 0 }}
                >
                  {month}
                </Text>

                {/* creiamo un primo Box figlio che conterrà i giorni del mese 
          (a loro volte come Box) */}
                <Box
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "4px",
                  }}
                >
                  {days.map((day: string) => (
                    <Box
                      key={day}
                      w={40}
                      h={40}
                      bg={
                        entriesMap?.has(day)
                          ? getMoodColor(entriesMap.get(day)!.mood_score)
                          : "gray.2"
                      }
                      style={{
                        borderRadius: "15px",
                        cursor: isCurrentDay(day) ? "pointer" : "default",
                      }}
                      title={day}
                    />
                  ))}
                </Box>
              </Box>
            )
          )}
        </Stack>
      </Box>

      <Box mt="lg" style={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="light"
          size={isMobile ? "sm" : "md"}
          radius="md"
          onClick={handleModalOpen}
          rightSection={<IconArrowBigUpLine size={isMobile ? 15 : 20} />}
        >
          {" "}
          Log today{" "}
        </Button>
        <EntryModal opened={opened} onClose={close} />
      </Box>
    </>
  );
}
