import { Modal } from "@mantine/core";
import { Button, NumberInput, Group, Textarea } from "@mantine/core";
import { entryForm } from "../hooks/entryForm";
import { useEffect } from "react";
import { useCreateEntry } from "../hooks/useCreateEntries";
import dayjs from "dayjs";

interface EntryModalProps {
  opened: boolean;
  onClose: () => void;
  action: string;
}

export function EntryModal({ opened, onClose, action }: EntryModalProps) {
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

  // utilizzo useEffect per resettare il form quando il modale viene chiuso
  useEffect(() => {
    if (!opened) {
      form.reset();
    }
  }, [opened]);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={dayjs().format("MMMM D, YYYY")}
      centered
      radius="lg"
      size="md"
    >
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Textarea
          withAsterisk
          label="Content"
          placeholder="Write about your day"
          key={form.key("content")}
          {...form.getInputProps("content")}
          mb="md"
          autosize
          minRows={4}
          maxRows={10}
        />

        <NumberInput
          withAsterisk
          radius="md"
          label="Mood score"
          placeholder="From 1 to 10"
          key={form.key("mood_score")}
          {...form.getInputProps("mood_score")}
        />

        <Group justify="flex-end" mt="xl">
          {(action === "create" || action === "edit") && (
            <Button loading={isPending} type="submit" variant="light">
              Log
            </Button>
          )}
          {action === "delete" && (
            <Button color="red" variant="light">
              Delete
            </Button>
          )}
        </Group>
      </form>
    </Modal>
  );
}
