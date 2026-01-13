// custom hook per prendere tutte le entries dal server usando transtack/react-query
import { useQuery } from "@tanstack/react-query";
import { getAllEntries } from "../api/getAllEntries";
import { Entry } from "../types/entry";

export const useEntries = () => {
    return useQuery({
        queryKey: ['entries'],
        queryFn: getAllEntries,
        staleTime: 1000 * 60 * 5,
        select: (data: Entry[]) => {
            // trasformo l'array in una Map con la data (YYYY-MM-DD) come chiave
            const entriesMap = new Map<string, Entry>();
            data.forEach(entry => {
                const date = entry.created_at.split('T')[0];
                entriesMap.set(date, entry);
            });
            return entriesMap;
        },
    });
};