// custom hook per creare una nuova entry usando le mutazioni di @tanstack/react-query
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewEntry } from "../api/entries";
import { showSuccessNotification, showErrorNotification } from "../utils/notificationUtils";

export const useCreateEntry = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (newEntryData: { mood_score: number; content: string }) => createNewEntry(newEntryData),
        onSuccess: () => {
            // invalido la query per forzare il refatch
            queryClient.invalidateQueries({ queryKey: ['entries'] });
            showSuccessNotification('Entry created successfully');
        },
        // mostra l'errore usando un toast di mantine
        onError: (error: any) => {
            const apiErrors = error.errorData;
            const errorMessage = apiErrors 
                ? Object.entries(apiErrors)
                    .map(([key, value]: [string, any]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
                    .join(' | ')
                : error.message || 'Failed to create entry';

            showErrorNotification(errorMessage);
        },
    });
};