// chiamata get al server per prendere tutte le entries
export const getAllEntries = async () => {
    const response = await fetch('http://localhost:3000/entries');
    if (!response.ok) throw new Error ('Network response was not ok');
    return response.json();
};