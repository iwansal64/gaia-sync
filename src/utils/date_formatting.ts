import strftime from "strftime";

export function dateFormat(date: Date) {
  return strftime("%d %B %Y", date);
}