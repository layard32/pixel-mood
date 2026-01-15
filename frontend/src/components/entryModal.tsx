import { Modal } from "@mantine/core";
import { Button, NumberInput, Group, Textarea } from "@mantine/core";
import { entryForm } from "../hooks/entryForm";
import { useEffect } from "react";
import { useCreateEntry } from "../hooks/useCreateEntry";
import { Entry } from "../types/entry";
import dayjs from "dayjs";

interface EntryModalProps {
  opened: boolean;
  onClose: () => void;
  selectedDay: string;
  selectedEntry?: Entry;
}

export function EntryModal({
  opened,
  onClose,
  selectedDay,
  selectedEntry,
}: EntryModalProps) {
  // utilizzo il custom hook per creare una nuova entry
  const { mutate, isPending } = useCreateEntry();
  const handleSubmit = (values: { mood_score: number; content: string }) => {
    mutate({
      mood_score: values.mood_score,
      content: values.content,
    });
    onClose();
  };

  // utilizzo il custom hook di mantine per definire il form
  const form = entryForm();

  // utilizzo useEffect per resettare il form quando il modale viene chiuso e per popolarlo quando viene aperto con una selectedEntry
  useEffect(() => {
    if (selectedEntry) {
      form.setFieldValue("content", selectedEntry.content);
      form.setFieldValue("mood_score", selectedEntry.mood_score);
    }
    if (!opened) {
      form.reset();
    }
  }, [opened, selectedEntry]);

  // la funzione restituisce true se il giorno selezionato è diverso da oggi
  const isDayNotToday = (): boolean => {
    return (
      dayjs(selectedDay).format("YYYY-MM-DD") !== dayjs().format("YYYY-MM-DD")
    );
  };
  // la funzione restituisce true se selectedEntry è definita e corrisponde al giorno attuale
  const isSelectedEntryToday = (): boolean => {
    return (
      selectedEntry?.created_at.split("T")[0] === dayjs().format("YYYY-MM-DD")
    );
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={isDayNotToday() ? "See entry" : "Log your mood"}
      centered
      radius="lg"
      size="md"
    >
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Textarea
          required
          label="Content"
          placeholder="Write about your day"
          key={form.key("content")}
          {...form.getInputProps("content")}
          mb="md"
          autosize
          minRows={4}
          maxRows={10}
          disabled={isDayNotToday()}
        />

        <NumberInput
          required
          radius="md"
          label="Mood score"
          placeholder="From 1 to 10"
          key={form.key("mood_score")}
          {...form.getInputProps("mood_score")}
          disabled={isDayNotToday()}
        />

        <Group justify="flex-end" mt="xl">
          {!isDayNotToday() && (
            <Button loading={isPending} type="submit" variant="light">
              Log
            </Button>
          )}
          {isSelectedEntryToday() && (
            <Button color="red" variant="light">
              Delete
            </Button>
          )}
        </Group>
      </form>
    </Modal>
  );
}
