// custom hook per creare una nuova entry usando le mutazioni di @tanstack/react-query
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEntry } from "../api/createNewEntry";

export const useCreateEntry = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (newEntryData: { mood_score: number; content: string }) => createEntry(newEntryData),
        onSuccess: () => {
            // invalido la query per forzare il refatch
            queryClient.invalidateQueries({ queryKey: ['entries'] });
        },
    });
};