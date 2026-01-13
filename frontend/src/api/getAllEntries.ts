// chiamata get al server per prendere tutte le entries
export const getAllEntries = async () => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
    const url = `${baseUrl}/entries`;

    const response = await fetch(url);
    
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
};