import { format } from "date-fns";

export function formatDateString(dateString: string) {
  if (!dateString || dateString.length !== 6) {
    return "Invalid date format";
  }

  const month = parseInt(dateString.substring(0, 2), 10) - 1; // Months are 0-indexed in JavaScript Date
  const year = parseInt(dateString.substring(2, 6), 10);

  const date = new Date(year, month, 1); // Create a Date object with the first day of the month

  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  return format(date, "MMMM yyyy"); // Format as "Month Year" (e.g., February 2023)
}
