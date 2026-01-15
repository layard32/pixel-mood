import { Modal } from "@mantine/core";
import { Button, NumberInput, Group, Textarea } from "@mantine/core";
import { entryForm } from "../hooks/entryForm";
import { useEffect, useState } from "react";
import { useCreateEntry } from "../hooks/useCreateEntry";
import { useUpdateEntry } from "../hooks/useUpdateEntry";
import { useDeleteEntry } from "../hooks/useDeleteEntry";
import { Entry } from "../types/entry";
import dayjs from "dayjs";

interface EntryModalProps {
  opened: boolean;
  onClose: () => void;
  selectedDate: string;
  selectedEntry?: Entry;
}

export function EntryModal({
  opened,
  onClose,
  selectedDate,
  selectedEntry,
}: EntryModalProps) {
  // prendo i custom hooks per creazione, modifica e cancellazione delle entry
  // ed uno stato per tenere traccia del tipo di operazione quando il form viene sottomesso
  const [submitAction, setSubmitAction] = useState<
    "create" | "edit" | "delete"
  >("create");

  const { mutate: createEntry, isPending: isCreating } = useCreateEntry();
  const { mutate: updateEntry, isPending: isUpdating } = useUpdateEntry();
  const { mutate: deleteEntry, isPending: isDeleting } = useDeleteEntry();

  const handleSubmit = (values: { mood_score: number; content: string }) => {
    // per la modifica e il delete, controllo prima esista un'entry
    if (selectedEntry) {
      if (submitAction === "edit") {
        updateEntry({
          entryId: selectedEntry.id,
          updatedEntryData: {
            mood_score: values.mood_score,
            content: values.content,
          },
        });
        onClose();
        return;
      } else if (submitAction === "delete") {
        deleteEntry(selectedEntry.id);
        onClose();
        return;
      }
    } else if (submitAction === "create") {
      // per la creazione non serve controllare l'esistenza dell'entry
      createEntry({
        mood_score: values.mood_score,
        content: values.content,
      });
      onClose();
    }
  };

  // utilizzo il custom hook per definire la validazione sul form
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

  // true se la data selezionata ha una entry
  const isEntryExisting: boolean = selectedEntry !== undefined;

  // true se la data selezionata non ha una entry ed è oggi
  const todayDate: string = dayjs().format("YYYY-MM-DD");
  const isNotEntryExistingAndIsToday: boolean =
    !isEntryExisting && selectedDate === todayDate;

  // true se la data selezionata non ha un'entry ed è diversa da oggi
  const isNotEntryExistingAndIsNotToday: boolean =
    !isEntryExisting && selectedDate !== todayDate;

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={dayjs(selectedDate).format("MMMM D, YYYY")}
      centered
      radius="lg"
      size="md"
    >
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Textarea
          withAsterisk
          label="Content"
          description="Write about your day"
          key={form.key("content")}
          {...form.getInputProps("content")}
          mb="md"
          autosize
          minRows={4}
          maxRows={10}
          // i form sono disabilitati se la data selezionata non ha un'entry e non è oggi
          disabled={isNotEntryExistingAndIsNotToday}
        />

        <NumberInput
          required
          radius="md"
          label="Mood score"
          description="Rate your mood from 1 (very bad) to 10 (excellent)"
          key={form.key("mood_score")}
          {...form.getInputProps("mood_score")}
          // i form sono disabilitati se la data selezionata non ha un'entry e non è oggi
          disabled={isNotEntryExistingAndIsNotToday}
        />

        <Group justify="flex-end" mt="xl">
          {isEntryExisting && (
            // se esiste un'entry per la data selezionata, mostra il pulsante "Edit" e "Delete"
            <>
              <Button
                loading={isUpdating}
                variant="light"
                type="submit"
                onClick={() => setSubmitAction("edit")}
              >
                Edit
              </Button>
              <Button
                loading={isDeleting}
                color="red"
                variant="light"
                type="submit"
                onClick={() => setSubmitAction("delete")}
              >
                Delete
              </Button>
            </>
          )}

          {isNotEntryExistingAndIsToday && (
            // se non esiste un'entry per la data selezionata ed è oggi, mostra il pulsante "Log"
            <Button
              loading={isCreating}
              variant="light"
              type="submit"
              onClick={() => setSubmitAction("create")}
            >
              Log
            </Button>
          )}
        </Group>
      </form>
    </Modal>
  );
}
