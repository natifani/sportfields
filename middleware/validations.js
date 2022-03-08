// Nagy Tifani - Franciska 523 ntim1937

import bcrypt from 'bcrypt';
// import * as rdb from '../db/reservation_queries.js';
// import * as udb from '../db/user_queries.js';
import * as rl from './reloads.js';
import * as date from '../utils/date_functions.js';

const extensions = ['.JPEG', '.JPG', '.PNG'];

function checkExtensions(fileHandler) {
  if (fileHandler.constructor === Array) {
    for (let i = 0; i < fileHandler.length; i += 1) {
      const index = fileHandler[i].name.lastIndexOf('.');
      const extension = fileHandler[i].name.substr(index, fileHandler[i].name.length).toUpperCase();
      if (!extensions.some((e) => e === extension)) {
        return false;
      }
    }
    return true;
  }
  const index = fileHandler.name.lastIndexOf('.');
  const extension = fileHandler.name.substr(index, fileHandler.name.length).toUpperCase();
  if (!extensions.some((e) => e === extension)) {
    return false;
  }
  return true;
}

export function validateCreateFieldForm(request, response, next) {
  const wageRegexp = /^[1-9]+[0-9]*(\.[0-9])*[0-9]*$/;
  if (!request.fields.type) {
    console.log('The type field is empty.');
    return rl.reloadCreateFieldForm(response, 'The type field is empty.', 400);
  }

  if (!wageRegexp.test(request.fields.wage)) {
    console.log('The hourly wage field is invalid.');
    return rl.reloadCreateFieldForm(response, 'The hourly wage field is invalid.', 400);
  }

  if (!request.fields.address) {
    console.log('The name field is empty.');
    return rl.reloadCreateFieldForm(response, 'The name field is empty.', 400);
  }

  return next();
}

export function checkNameAndFieldInReserveForm(request, response, next) {
  if (!request.fields.clfname) {
    console.log('The fieldname field is empty.');
    return rl.reloadReservationsPage(response, 'The fieldname field is empty.', 400);
  }

  return next();
}

export function checkDateInReserveForm(request, response, next) {
  const dateRegexp = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[0-9]|1[0-9]|2[0-9]|3[0-1])(T| )(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
  if (!request.fields.reservCb) {
    if (!dateRegexp.test(request.fields.startdatetime)) {
      console.log('The start datetime field is invalid.');
      return rl.reloadReservationsPage(response, 'The start datetime field is empty or invalid.', 400);
    }
    if (!dateRegexp.test(request.fields.enddatetime)) {
      console.log('The end datetime field is invalid.');
      return rl.reloadReservationsPage(response, 'The end datetime field is invalid.', 400);
    }

    if (request.fields.enddatetime < request.fields.startdatetime
      || request.fields.startdatetime === request.fields.enddatetime
      || !date.checkHourRangeOfDate(request.fields.startdatetime, request.fields.enddatetime)) {
      console.log('The datetime fields are invalid.');
      return rl.reloadReservationsPage(response, 'The datetime fields are invalid.', 400);
    }
  }
  return next();
}

export function checkIfDateIsAfterPresentInReserveForm(request, response, next) {
  if (!date.checkIfDateIsAfterPresent(request.fields.startdatetime)) {
    console.log('The start datetime field is invalid.');
    return rl.reloadReservationsPage(response, 'The start datetime field is empty or invalid.', 400);
  }

  if (!date.checkIfDateIsAfterPresent(request.fields.enddatetime)) {
    console.log('The start datetime field is invalid.');
    return rl.reloadReservationsPage(response, 'The start datetime field is empty or invalid.', 400);
  }

  return next();
}

export function checkTimeInReserveForm(request, response, next) {
  const timeRegexp = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  if (request.fields.reservCb) {
    if (!timeRegexp.test(request.fields.starthour)) {
      console.log('The start time field is invalid.');
      return rl.reloadReservationsPage(response, 'The start time field is empty or invalid.', 400);
    }
    if (!timeRegexp.test(request.fields.endhour)) {
      console.log('The end time field is invalid.');
      return rl.reloadReservationsPage(response, 'The end time field is invalid.', 400);
    }
    if (request.fields.endhour < request.fields.starthour
      || request.fields.endhour === request.fields.starthour
      || !date.checkHourRangeOfTime(request.fields.starthour, request.fields.endhour)) {
      console.log('The time fields are invalid.');
      return rl.reloadReservationsPage(response, 'The time fields are invalid.', 400);
    }
  }
  return next();
}

export async function checkIfFieldIsFreeInterval(request, response, next) {
  if (!request.fields.reservCb) {
    const idres = Number(request.fields.clfname);
    // const res = await rdb.findAllReservations();
    const startTime2 = new Date(request.fields.startdatetime);
    const endTime2 = new Date(request.fields.enddatetime);
    // for (let i = 0; i < res.length; i += 1) {
    //   const fid = res[i].fieldID;
    //   const startTime = res[i].startDate;
    //   const endTime = res[i].endDate;
    //   const sDay = res[i].day;
    //   const sHour = res[i].startHour;
    //   const eHour = res[i].endHour;
    //   if (fid === Number(idres)
    //         && !date.checkIfDatesCompatible(startTime, endTime, sDay, sHour, eHour,
    //           startTime2, endTime2)) {
    //     console.log('Field is not available at the given date and time.');
    //     return rl.reloadReservationsPage(response, 'Field is not available at the given date and time.', 400);
    //   }
    // }
  }
  return next();
}

export async function checkIfFieldIsFreeRecurrent(request, response, next) {
  if (request.fields.reservCb) {
    const idres = request.fields.clfname;
    // const res = await rdb.findAllReservations();
    const day = request.fields.clday;
    const startHour = request.fields.starthour;
    const endHour = request.fields.endhour;
    // for (let i = 0; i < res.length; i += 1) {
    //   const fid = res[i].fieldID;
    //   const startTime = res[i].startDate;
    //   const endTime = res[i].endDate;
    //   const sDay = res[i].day;
    //   const sHour = res[i].startHour;
    //   const eHour = res[i].endHour;
    //   if (fid === Number(idres)
    //         && !date.checkIfDatesCompatibleRecurrent(startTime, endTime, sDay, sHour, eHour,
    //           day, startHour, endHour)) {
    //     console.log('Field is not available at the given date and time.');
    //     return rl.reloadReservationsPage(response, 'Field is not available at the given date and time.', 400);
    //   }
    // }
  }
  return next();
}

export function validateImageFieldUploadForm(request, response, next) {
  const fileHandler = request.files.images;
  if (!request.files.images) {
    console.log('File upload cannot be empty.');
    return rl.reloadFieldDetailsPage(response, request, 'File upload cannot be empty.', 400);
  }
  if (!checkExtensions(fileHandler)) {
    console.log('The extension of the uploaded files are not images type.');
    return rl.reloadFieldDetailsPage(response, request, 'The extension of the uploaded files are not images type.', 400);
  }

  return next();
}

export async function validateLoginForm(request, response, next) {
  const usernameRegexp = /^[^A-Z\s]+$/;
  if (!usernameRegexp.test(request.fields.clusername)) {
    console.log('The username field is invalid.');
    return rl.reloadLoginForm(response, 'The username field is invalid.', 401);
  }

  if (!request.fields.clpassword) {
    console.log('The password field is invalid.');
    return rl.reloadLoginForm(response, 'The password field is invalid.', 401);
  }

  try {
    // const pwd = await udb.findPasswordForUser(request.fields.clusername);
    // if (pwd === null) {
    //   console.log('The given username is invalid.');
    //   return rl.reloadLoginForm(response, 'The given username is invalid.', 401);
    // }

    // const isBlocked = await udb.checkIfUserIsBlocked(request.fields.clusername);
    // if (isBlocked === 1) {
    //   console.log('Unauthorized.');
    //   return rl.reloadLoginForm(response, 'Unauthorized.', 403);
    // }

    // if (!await bcrypt.compare(request.fields.clpassword, pwd)) {
    //   console.log('Invalid username or password.');
    //   return rl.reloadLoginForm(response, 'Invalid username or password.', 401);
    // }
  } catch (error) {
    console.log(error);
    return rl.reloadLoginForm(response, 'Server error occured.', 500);
  }
  return next();
}

export async function checkIfEmailIsBlocked(request, response, next) {
  const emailRegexp = /^[^\s@]+@(yahoo|gmail|example)\.[^\s@]+$/;

  if (!emailRegexp.test(request.fields.clemail)) {
    console.log('The email field is invalid.');
    return rl.reloadRegistrationForm(response, 'The email field is invalid.', 401);
  }
  try {
    // const isBlocked = await udb.checkIfEmailIsBlocked(request.fields.clemail);
    // if (isBlocked === 1) {
    //   console.log('Unauthorized.');
    //   return rl.reloadRegistrationForm(response, 'Unauthorized.', 403);
    // }
  } catch (error) {
    console.log(error);
    return rl.reloadRegistrationForm(response, 'Server error occured.', 500);
  }

  return next();
}

export async function validateRegistrationForm(request, response, next) {
  const usernameRegexp = /^[^A-Z\s]+$/;
  const nameRegexp = /^[A-Z][a-z]+( +[A-Z][a-z]+)*$/;
  const dateRegexp = /^(19|20)\d{2}(-|.)((1[0-2])|(0[1-9]))(-|.)(3[0-1]|[1-2]\d|0[1-9])$/;

  if (!usernameRegexp.test(request.fields.clusername)) {
    console.log('The username field is invalid.');
    return rl.reloadRegistrationForm(response, 'The username field is invalid.', 401);
  }

  if (!nameRegexp.test(request.fields.clname)) {
    console.log('The name field is invalid.');
    return rl.reloadRegistrationForm(response, 'The name field is invalid.', 401);
  }

  if (request.fields.clbirthdate && !dateRegexp.test(request.fields.clbirthdate)) {
    console.log('The date of birth field is invalid.');
    return rl.reloadRegistrationForm(response, 'The date of birth field is invalid.', 401);
  }

  if (request.fields.cleducation && !nameRegexp.test(request.fields.cleducation)) {
    console.log('The education institute field is invalid.');
    return rl.reloadRegistrationForm(response, 'The education institute field is invalid.', 401);
  }
  return next();
}

export async function validateRegistrationFormPassword(request, response, next) {
  if (!request.fields.clpassword || !request.fields.clpasswordrepeat) {
    console.log('The password field is invalid.');
    return rl.reloadRegistrationForm(response, 'The password field is invalid.', 401);
  }

  if (request.fields.clpassword !== request.fields.clpasswordrepeat) {
    console.log('Password must be the same.');
    return rl.reloadRegistrationForm(response, 'Password must be the same.', 401);
  }

  try {
    // const pwd = await udb.findPasswordForUser(request.fields.clusername);
    // if (pwd === null) {
    //   return next();
    // }
    console.log('User already exists.');
    return rl.reloadRegistrationForm(response, 'User already exists.', 401);
  } catch (error) {
    console.log(error);
    return rl.reloadRegistrationForm(response, 'Server error occured.', 500);
  }
}
