// Colore graduale dal blu (triste) al verde (felice)
export const getMoodColor = (moodScore: number): string => {
    const min = 1;
    const max = 10;
    const clamped = Math.min(max, Math.max(min, Number(moodScore) || min));
    const t = (clamped - min) / (max - min); // 0..1

    const hue = 220 - (220 - 120) * t;
    const lightness = 35 + (50 - 35) * t;

    return `hsl(${hue.toFixed(0)}, 70%, ${lightness.toFixed(0)}%)`;
};