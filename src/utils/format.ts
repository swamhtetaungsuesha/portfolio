import { format, formatDistanceToNow, parse } from "date-fns";

export function formatDateString(dateString: string) {
  if (!dateString || dateString.length !== 6) {
    return "Invalid date format";
  }

  const month = parseInt(dateString.substring(0, 2), 10) - 1;
  const year = parseInt(dateString.substring(2, 6), 10);

  const date = new Date(year, month, 1);
  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  return format(date, "MMMM yyyy");
}

export function addInitialZero(number: number) {
  if (number < 10) {
    return "0" + number;
  }
  return number.toString();
}

export const getTimeAgo = (dateString: string) => {
  const parsedDate = parse(dateString, "MMyyyy", new Date());

  return formatDistanceToNow(parsedDate, { addSuffix: true });
};
