import { useForm } from "@mantine/form";

export const entryForm = () => {
    return useForm({
        mode: "uncontrolled",
        initialValues: {
        content: "",
        mood_score: 0,
        },
        validate: {
        content: (value) => {
            if (!value) return "Content is required";
            if (value.length > 500) return "Content must be 500 characters or less";
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
};
