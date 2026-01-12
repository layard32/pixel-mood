// custom hook per prendere tutte le entries dal server usando transtack/react-query
import { useQuery } from "@tanstack/react-query";
import { fetchEntries } from "../api/entries";

export const useEntries = () => { 
    return useQuery({
        queryKey: ['entries'],
        queryFn: fetchEntries,
        staleTime: 1000 * 60 * 5,
    });
};