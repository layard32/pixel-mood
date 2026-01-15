// custom hook che utilizza la chiamata api definita in ../api/entries e le query di @tanstack/react-query
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteEntry } from "../api/entries";
import { showSuccessNotification, showErrorNotification } from "../utils/notificationUtils";

export const useDeleteEntry = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (entryId: number) => 
            deleteEntry(entryId),
        onSuccess: () => {
            // invalido la query per forzare il refatch
            queryClient.invalidateQueries({ queryKey: ['entries'] });
            showSuccessNotification('Entry deleted successfully');
        },
        onError: (error: any) => {
            const apiErrors = error.errorData;
            const errorMessage = apiErrors 
                ? Object.entries(apiErrors)
                    .map(([key, value]: [string, any]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
                    .join(' | ')
                : error.message || 'Failed to delete entry';

            showErrorNotification(errorMessage);
        },
    });
}