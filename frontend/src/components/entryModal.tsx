import { Modal } from "@mantine/core";
import { Button, NumberInput, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";

interface EntryModalProps {
  opened: boolean;
  onClose: () => void;
  date: string;
}

export function EntryModal({ opened, onClose, date }: EntryModalProps) {
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
    <Modal opened={opened} onClose={onClose} title={date} centered>
      <form onSubmit={form.onSubmit(() => {})}>
        <TextInput
          withAsterisk
          label="Content"
          placeholder="Write about your day"
          key={form.key("content")}
          {...form.getInputProps("content")}
        />

        <NumberInput
          withAsterisk
          radius="md"
          label="Mood score"
          placeholder="From 1 to 10"
          key={form.key("mood_score")}
          {...form.getInputProps("mood_score")}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Modal>
  );
}
