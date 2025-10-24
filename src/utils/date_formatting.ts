import strftime from "strftime";

export function dateFormat(date: Date) {
  return strftime("%d %B %Y", date);
}

export function fullDateFormat(date: Date) {
  return strftime("%d %B %Y - %H:%M:%S", date);
}

export function dynamicDateFormat(date: Date) {
  const zeroHoursDate = new Date(date);
  zeroHoursDate.setHours(0, 0, 0, 0);
  

  // If its the same date
  if(zeroHoursDate.valueOf() < Date.now().valueOf()) {
    return strftime("%H:%M:%S", date);
  }
  else {
    return strftime("%d %B %Y", date);
  }
}