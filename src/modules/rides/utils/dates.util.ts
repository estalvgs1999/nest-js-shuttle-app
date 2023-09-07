export function combineDateAndTime(date: Date, time: string): Date | null {
  // Divide la hora en horas, minutos y AM/PM
  const [timeStr, amPm] = time.split(' ');
  const [hoursStr, minutesStr] = timeStr.split(':');

  // Convierte las horas y minutos en números
  let hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);

  // Ajusta las horas para el formato de 24 horas si es PM
  if (amPm.toLowerCase() === 'pm' && hours < 12) {
    hours += 12;
  }

  // Verifica si los valores son válidos
  if (isNaN(hours) || isNaN(minutes)) {
    return null; // Si los valores no son válidos, retorna null
  }

  // Crea una nueva fecha con la fecha original y la hora ajustada
  const combinedDate = new Date(date);
  combinedDate.setHours(hours, minutes, 0, 0);

  return combinedDate;
}
