import { getApiUrl, handleApiError } from "../utils/apiUtils";

// chiamata GET per prendere tutte le entries
export const getAllEntries = async () => {
    const url = getApiUrl();

    const response = await fetch(url);
    
    handleApiError(response);
    return response.json();
};

// chiamata POST per creare una nuova entry
export const createNewEntry = async (newEntryData: { mood_score: number; content: string }) => {
    const url = getApiUrl();

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            entry: {
                content: newEntryData.content,
                mood_score: newEntryData.mood_score,
            },
        }),
    });

    handleApiError(response);
    return response.json();
};

// chiamata PATCH per aggiornare una entry esistente
export const updateEntry = async(entryId: number, updatedEntryData: { mood_score: number; content: string }) => {
    const url = `${getApiUrl()}/${entryId}`;

    const response = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            entry: {
                content: updatedEntryData.content,
                mood_score: updatedEntryData.mood_score,
            },
        }),
    });

    handleApiError(response);
    return response.json();
}

// chiamata DELETE per eliminare una entry
export const deleteEntry = async(entryId: number) => {
    const url =  `${getApiUrl()}/${entryId}`;

    const response = await fetch(url, {
        method: 'DELETE',
    });

    handleApiError(response);
    // 204 No Content non ha body, quindi non tentare di parsare JSON
    if (response.status === 204) {
        return null;
    }
    return response.json();
}