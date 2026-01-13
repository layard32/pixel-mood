import { Modal } from "@mantine/core";
import { Button, NumberInput, Group, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { useCreateEntry } from "../hooks/useCreateEntries";
import dayjs from "dayjs";

interface EntryModalProps {
  opened: boolean;
  onClose: () => void;
}

export function EntryModal({ opened, onClose }: EntryModalProps) {
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
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      content: "",
      mood_score: 0,
    },
    validate: {
      content: (value) => {
        if (!value) return "Content is required";
        if (value.length > 200) return "Content must be 200 characters or less";
        return null;
      },
      mood_score: (value) => {
        if (!value) return "Mood score is required";
        if (value < 1 || value > 10)
          return "Mood score must be between 1 and 10";
        return null;
      },
    },
  });

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
          <Button loading={isPending} type="submit" variant="light">
            Log
          </Button>
        </Group>
      </form>
    </Modal>
  );
}
