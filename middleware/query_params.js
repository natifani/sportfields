// Nagy Tifani Franciska 523 ntim1937

// import * as fdb from '../db/field_queries.js';
// import * as idb from '../db/image_queries.js';
// import * as udb from '../db/user_queries.js';

export async function checkUserInPayload(response) {
  try {
    const username = '';
    if (Object.keys(response.locals.payload).length === 0) {
      return username;
    }
    // username = await udb.findNameOfUser(response.locals.payload.username);
    return username;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getImagePromises(fields) {
  const promises = [];
  // for (let i = 0; i < fields.length; i += 1) {
  //   promises.push(idb.findFirstImageOfField(fields[i].fieldID));
  // }
  const images = await Promise.all(promises);
  return images;
}

export function getReservParams(request) {
  const arr = [null, null, null, null, null, null, null];
  if (request.query.username) {
    arr[0] = decodeURI(request.query.username);
  }
  if (request.query.fieldname) {
    arr[1] = decodeURI(request.query.fieldname);
  }

  if (request.query.day) {
    arr[2] = decodeURI(request.query.day);
  }

  if (request.query.startHour) {
    arr[3] = decodeURI(request.query.startHour);
  }

  if (request.query.endHour) {
    arr[4] = decodeURI(request.query.endHour);
  }

  if (request.query.startDate) {
    arr[5] = new Date(decodeURI(request.query.startDate));
  }

  if (request.query.endDate) {
    arr[6] = new Date(decodeURI(request.query.endDate));
  }

  return arr;
}

export async function checkSortQueryparams(request, response) {
  try {
    const offset = (!request.query.page) ? 0 : (5 * parseInt(request.query.page, 10));
    const fields = [];
    // if (request.query.sortBy === 'name') {
    //   fields = await fdb.sortFieldsByName(request.query.sortMode, offset);
    // }
    // if (request.query.sortBy === 'wage') {
    //   fields = await fdb.sortFieldsByWage(request.query.sortMode, offset);
    // }
    // if (request.query.sortBy === 'reserv') {
    //   fields = await fdb.sortFieldsByReservations(request.query.sortMode, offset);
    // }
    const images = await getImagePromises(fields);
    images.forEach((image, index) => {
      fields[index].image = image;
    });
    const user = await checkUserInPayload(response);
    return response.render('sportfields', { username: user, fields, message: '' });
  } catch (error) {
    console.log(error);
    return response.status(500).render('sportfields', { fields: [], username: '', message: 'Server error occured.' });
  }
}

export async function checkNameQueryparams(request, response) {
  try {
    const user = await checkUserInPayload(response);
    // const field = await fdb.findFieldByName(decodeURI(request.query.name));
    // if (field !== undefined) {
    //   field.image = await idb.findFirstImageOfField(field.fieldID);
    //   return response.render('sportfields', { username: user, fields: [field], message: '' });
    // }
    return response.render('sportfields', { username: user, fields: [], message: '' });
  } catch (error) {
    console.log(error);
    return response.status(500).render('sportfields', { fields: [], username: '', message: 'Server error occured.' });
  }
}

export async function checkFilterparams(request, response) {
  try {
    const user = await checkUserInPayload(response);
    if (request.query.wage) {
      const pattern = /^[1-9]+[0-9]*(\.[0-9])*[0-9]*$/;
      if (!pattern.test(request.query.wage)) {
        return response.render('sportfields', { username: user, fields: [], message: '' });
      }
    }
    // const offset = (!request.query.page) ? 0 : (5 * parseInt(request.query.page, 10));
    // const fields = await fdb.findFieldsByFilters(request.query.type,
    //   request.query.indoor, request.query.wage, offset);
    // const images = await getImagePromises(fields);
    // images.forEach((image, index) => {
    //   fields[index].image = image;
    // });
    // return response.render('sportfields', { fields, username: user, message: '' });
  } catch (error) {
    console.log(error);
    return response.status(500).render('sportfields', { fields: [], username: '', message: 'Server error occured.' });
  }
}

export async function checkReservQueryparams(request, response, offset) {
  try {
    const user = await checkUserInPayload(response);
    const params = getReservParams(request);
    // const usersAndReservations = await udb.findAll5UsersAndReservationsByFilter(offset, params);
    // for (let i = 0; i < usersAndReservations.length; i += 1) {
    //   if (usersAndReservations[i].day !== null) {
    //     usersAndReservations[i].day = usersAndReservations[i].day.toUpperCase();
    //   } else {
    //     usersAndReservations[i].startDate = usersAndReservations[i].startDate.toLocaleString();
    //     usersAndReservations[i].endDate = usersAndReservations[i].endDate.toLocaleString();
    //   }
    // }
    // return response.render('check_reservations', { fields: usersAndReservations, username: user, message: '' });
  } catch (error) {
    console.log(error);
    return response.status(500).render('check_reservations', { fields: [], username: '', message: 'Server error occured.' });
  }
}

export async function checkUsersQueryparams(request, response, offset) {
  try {
    const user = await checkUserInPayload(response);
    // const users = await udb.findAll5UsersByFilter(offset, request.query.notApproved,
    //   request.query.blocked);
    // return response.render('check_users', { users, username: user, message: '' });
  } catch (error) {
    console.log(error);
    return response.status(500).render('check_users', { users: [], username: '', message: `Unable to load data: ${error.message}` });
  }
}

export function hasQueryParamOtherThanPage(request) {
  if (Object.keys(request.query).length > 1) {
    return true;
  }

  if (Object.keys(request.query).length === 1 && !request.query.page) {
    return true;
  }
  return false;
}
