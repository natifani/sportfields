// Nagy Tifani Franciska 523 ntim1937

const days = new Map([['monday', 1], ['tuesday', 2], ['wednesday', 3], ['thursday', 4], ['friday', 5], ['saturday', 6], ['sunday', 0]]);

export function checkIfDateIsAfterPresent(dateStr) {
  const date = new Date(dateStr);
  const presentDate = new Date();

  if (date < presentDate) {
    return false;
  }
  return true;
}

export function checkDates(startDate1, endDate1, startDate2, endDate2) {
  if (!checkIfDateIsAfterPresent(startDate1) && !checkIfDateIsAfterPresent(endDate1)) {
    return true;
  }
  if (startDate1 === startDate2 && endDate1 === endDate2) {
    return false;
  }
  if (startDate1 < endDate2 && endDate1 > startDate2) {
    return false;
  }
  return true;
}

function getHoursFromDate(date) {
  const hour = `${(date.getHours() < 10 ? '0' : '')}${date.getHours()}`;
  return hour;
}

function getMinutesFromDate(date) {
  const minute = `${(date.getMinutes() < 10 ? '0' : '')}${date.getMinutes()}`;
  return minute;
}

export function checkDateAndTimeInterval(startTime, endTime, day, startHour, endHour) {
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);
  const day2 = startDate.getDay();
  if (day2 === days.get(day)) {
    const startTime2 = `${getHoursFromDate(startDate)}:${getMinutesFromDate(startDate)}:00`;
    const endTime2 = `${getHoursFromDate(endDate)}:${getMinutesFromDate(endDate)}:00`;
    if (startHour === startTime2 && endHour === endTime2) {
      return false;
    }
    if (startHour < endTime2 && endHour > startTime2) {
      return false;
    }
    return true;
  }
  return true;
}

export function checkDateAndTimeRecurrent(startTime, endTime, day, startHour, endHour) {
  const startDate = new Date(startTime);
  const endDate = new Date(endTime);
  const day2 = startDate.getDay();
  if (day2 === days.get(day)) {
    const startTime2 = `${getHoursFromDate(startDate)}:${getMinutesFromDate(startDate)}`;
    const endTime2 = `${getHoursFromDate(endDate)}:${getMinutesFromDate(endDate)}`;
    if (startHour === startTime2 && endHour === endTime2) {
      return false;
    }
    if (startHour < endTime2 && endHour > startTime2) {
      return false;
    }
    return true;
  }
  return true;
}

export function checkIfDatesCompatible(startDate1, endDate1,
  day, startHour, endHour, startDate2, endDate2) {
  if (startDate1 !== null && endDate1 !== null) {
    return checkDates(startDate1, endDate1, startDate2, endDate2);
  }
  return checkDateAndTimeInterval(startDate2, endDate2, day, startHour, endHour);
}

export function checkIfDatesCompatibleRecurrent(startTime, endTime, sDay, sHour, eHour,
  day, startHour, endHour) {
  if (startTime === null && endTime === null) {
    if (day === sDay) {
      if (sHour === startHour && eHour === endHour) {
        return false;
      }
      if (sHour < endHour && eHour > startHour) {
        return false;
      }
      return true;
    }
  }
  return checkDateAndTimeRecurrent(startTime, endTime, day, startHour, endHour);
}

export function checkHourRangeOfDate(startDate, endDate) {
  const date1 = new Date(startDate);
  const date2 = new Date(endDate);
  const startHour = `${getHoursFromDate(date1)}:${getMinutesFromDate(date1)}:00`;
  const endHour = `${getHoursFromDate(date2)}:${getMinutesFromDate(date2)}:00`;
  if (!(startHour >= '07:00:00' && startHour <= '22:00:00')) {
    return false;
  }

  if (!(endHour >= '07:00:00' && endHour <= '22:00:00')) {
    return false;
  }

  return true;
}

export function checkHourRangeOfTime(startHour, endHour) {
  if (!(startHour >= '07:00' && startHour <= '22:00')) {
    return false;
  }

  if (!(endHour >= '07:00' && endHour <= '22:00')) {
    return false;
  }

  return true;
}
