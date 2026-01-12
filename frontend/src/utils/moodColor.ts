export const getMoodColor = (moodScore: number): string => {
    if (moodScore >= 8) return "#4CAF50"; // verde per punteggi alti
    if (moodScore >= 5) return "#FFEB3B"; // giallo per punteggi medi
    return "#F44336"; // rosso per punteggi bassi
};