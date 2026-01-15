import { Box, Button, Group, Stack, Text } from "@mantine/core";
import { getAllDaysOfYearByMonth } from "../utils/dateUtils";
import { useGetEntries } from "../hooks/useGetEntries";
import { getMoodColor } from "../utils/moodColor";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { EntryModal } from "./entryModal";
import { IconArrowBigUpLine } from "@tabler/icons-react";
import { useState } from "react";
import { Entry } from "../types/entry";
import dayjs from "dayjs";

export function Calendar() {
  // usiamo l'util per ottenere una mappa contenente tutti i giorni dell'anno raggruppati per mese
  const daysByMonth: Record<string, string[]> = getAllDaysOfYearByMonth();

  // prendiamo la mappa contenente le entries dal custom hook
  const { data: entriesMap } = useGetEntries();

  // gestione del modale figlio
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedEntry, setSelectedEntry] = useState<Entry>();
  // quando clicco su un giorno (se clicco sul pulsante, prende in automatico oggi)
  const [selectedDay, setSelectedDay] = useState<string>("");
  // quando clicco su un giorno o sul pulsante
  const handleModalOpen = (day: string) => {
    setSelectedEntry(entriesMap?.get(day)!);
    setSelectedDay(day);
    open();
  };

  // per modificare la grandezza del pulsante
  const isMobile = useMediaQuery("(max-width: 800px)");

  // per rendere il giorno attuale del calendario cliccabile (al contrario di tutti gli altri)
  const isCurrentDay = (day: string) => {
    const today = dayjs().format("YYYY-MM-DD");
    return day === today;
  };

  return (
    // usiamo Stack per disporre i mesi in colonna
    <>
      <Box
        pt={{ base: "10px", sm: "20px", md: "40px", lg: "60px", xl: "80px" }}
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Stack gap={10}>
          {/* iteriamo sui mesi dell'anno */}
          {Object.entries(daysByMonth).map(
            ([month, days]: [string, string[]]) => (
              // per ogni mese creiamo un Box parente (con Box)
              <Box
                key={month}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                }}
              >
                <Text
                  fz={{ base: "sm", sm: "md", md: "lg" }}
                  fw={500}
                  miw={{ base: "85px", sm: "95px", md: "110px" }}
                  style={{ flexShrink: 0 }}
                >
                  {month}
                </Text>

                {/* creiamo un Box figlio che conterrà i giorni del mese (a loro volte come Box) */}
                <Box
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
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
                        cursor: "pointer",
                        borderColor: isCurrentDay(day)
                          ? "#228be6"
                          : "transparent",
                        borderWidth: isCurrentDay(day) ? "3.5px" : "0px",
                        borderStyle: "solid",
                      }}
                      title={day}
                      onClick={() => {
                        handleModalOpen(day);
                      }}
                    />
                  ))}
                </Box>
              </Box>
            )
          )}
          <Group
            mt={{
              base: "8px",
              sm: "10px",
              md: "15px",
              lg: "20px",
            }}
            justify="center"
          >
            <Button
              variant="subtle"
              size={isMobile ? "sm" : "md"}
              radius="md"
              onClick={() => {
                handleModalOpen(dayjs().format("YYYY-MM-DD"));
              }}
              rightSection={<IconArrowBigUpLine size={isMobile ? 15 : 20} />}
            >
              Log or edit today
            </Button>
          </Group>
        </Stack>
      </Box>

      <EntryModal
        opened={opened}
        onClose={close}
        selectedDay={selectedDay}
        selectedEntry={selectedEntry}
      />
    </>
  );
}
