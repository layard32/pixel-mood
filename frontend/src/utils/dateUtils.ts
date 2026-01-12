import dayjs from "dayjs";

// la funzione utilizza la libreria dayjs per generare una mappa in cui ad ogni mese
// è associato un array di stringhe contenenti i giorni nel formato 'YYYY-MM-DD'
export const getAllDaysOfYearByMonth = (year: number = dayjs().year()) => {
  const startDate: dayjs.Dayjs = dayjs(`${year}-01-01`);
  const endDate: dayjs.Dayjs = dayjs(`${year}-12-31`);
  const days: string[] = []; // array contenente i giorni
  let currentDate: dayjs.Dayjs = startDate;

  while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, "day")) {
    days.push(currentDate.format("YYYY-MM-DD"));
    currentDate = currentDate.add(1, "day");
  }

  // trasforma l'array di giorni in una mappa raggruppata per mese
  const daysByMonth: Record<string, string[]> = days.reduce((acc, day) => {
    const month = dayjs(day).format("MMMM");
    if (!acc[month]) acc[month] = [];
    acc[month].push(day);
    return acc;
  }, {} as Record<string, string[]>);
  
  return daysByMonth;
};