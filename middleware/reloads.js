// Nagy Tifani - Franciska 523 ntim1937

// import * as udb from '../db/user_queries.js';
// import * as fdb from '../db/field_queries.js';
// import * as idb from '../db/image_queries.js';
import * as qp from './query_params.js';

export async function reloadCreateFieldForm(response, text, status) {
  try {
    const user = await qp.checkUserInPayload(response);
    return response.status(status).render('admin_form_create_field', { username: user, message: text });
  } catch (error) {
    return response.status(500).render('admin_form_create_field', { username: '', message: 'Server error occured.' });
  }
}

export async function reloadFieldDetailsPage(response, request, text, status) {
  try {
    // const [fieldDetails, img] = await Promise.all([fdb.findField(request.query.fid),
    //   idb.findImages(request.query.fid)]);
    // const user = await qp.checkUserInPayload(response);
    // return response.status(status).render('field_details', {
    //   field: fieldDetails, username: user, message: text, images: img,
    // });
  } catch (error) {
    console.log(error);
    return response.status(500).render('field_details', {
      field: [], username: '', message: 'Server error occured.', images: [],
    });
  }
}

export async function reloadReservationsPage(response, text, status) {
  try {
    // const [users, fields] = await Promise.all([udb.findAllUsers(), fdb.findAllFields()]);
    const user = await qp.checkUserInPayload(response);
    // return response.status(status).render('client_form', {
    //   username: user, users, fields, message: text,
    // });
  } catch (error) {
    console.log(error);
    return response.status(500).render('client_form', {
      username: '', users: [], fields: [], message: 'Server error occured.',
    });
  }
}

export async function reloadLoginForm(response, text, status) {
  try {
    const user = await qp.checkUserInPayload(response);
    return response.status(status).render('login_form', { username: user, message: text });
  } catch (error) {
    return response.status(500).render('login_form', { username: '', message: 'Server error occured.' });
  }
}

export async function reloadRegistrationForm(response, text, status) {
  try {
    const user = await qp.checkUserInPayload(response);
    return response.status(status).render('registration_form', { username: user, message: text });
  } catch (error) {
    return response.status(500).render('registration_form', { username: '', message: 'Server error occured.' });
  }
}

export async function reloadSportfieldsPage(request, response) {
  try {
    if (request.query.type || request.query.wage || request.query.indoor) {
      return qp.checkFilterparams(request, response);
    }
    if (request.query.name) {
      return qp.checkNameQueryparams(request, response);
    }
    if (request.query.sortBy) {
      return qp.checkSortQueryparams(request, response);
    }
    const offset = (!request.query.page) ? 0 : (5 * parseInt(request.query.page, 10));
    // const fields = await fdb.findAll5Fields(offset);
    // const images = await qp.getImagePromises(fields);
    // images.forEach((image, index) => {
    //   fields[index].image = image;
    // });
    const username = await qp.checkUserInPayload(response);
    // return response.render('sportfields', { fields, username, message: '' });
  } catch (error) {
    console.log(error);
    return response.status(500).render('sportfields', { fields: [], username: '', message: 'Server error occured.' });
  }
}

export async function reloadCheckReservations(request, response) {
  try {
    const page = (!request.query.page) ? 0 : request.query.page;
    const offset = 5 * parseInt(page, 10);
    if (qp.hasQueryParamOtherThanPage(request)) {
      return qp.checkReservQueryparams(request, response, offset);
    }
    const user = await qp.checkUserInPayload(response);
    // const usersAndReservations = await udb.findAll5UsersAndReservations(offset);
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

export async function reloadCheckUsers(request, response) {
  try {
    const offset = (!request.query.page) ? 0 : (5 * parseInt(request.query.page, 10));
    if (qp.hasQueryParamOtherThanPage(request)) {
      return qp.checkUsersQueryparams(request, response, offset);
    }
    const user = await qp.checkUserInPayload(response);
    // const users = await udb.findAll5Users(offset);
    // return response.render('check_users', { users, username: user, message: '' });
  } catch (error) {
    console.log(error);
    return response.status(500).render('check_users', { users: [], username: '', message: `Unable to load data: ${error.message}` });
  }
}
