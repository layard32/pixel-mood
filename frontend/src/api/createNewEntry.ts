// chiamata post all'API per creare una nuova entry
export const createEntry = async (newEntryData: { mood_score: number; content: string }) => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
    const url = `${baseUrl}/entries`;

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

    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
};