import strftime from "strftime";

export function dateFormat(date: Date) {
  return strftime("%d %B %Y", date);
}

export function fullDateFormat(date: Date) {
  return strftime("%d %B %Y - %H:%M:%S", date);
}