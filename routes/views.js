// Nagy Tifani - Franciska 523 ntim1937

import express from 'express';
// import * as udb from '../db/user_queries.js';
// import * as fdb from '../db/field_queries.js';
// import * as idb from '../db/image_queries.js';
import * as vd from '../middleware/validations.js';
import * as qp from '../middleware/query_params.js';
import {
  handlerCreateFieldForm,
  handlerReserveForm,
  handlerUploadImageForm,
} from '../middleware/handlers.js';
import * as rd from '../middleware/reloads.js';
import { checkJWTToken, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/sportfields.html', async (request, response) => {
  try {
    return rd.reloadSportfieldsPage(request, response);
  } catch (error) {
    console.log(error);
    return response.status(500).render('sportfields', { username: '', fields: [], message: 'Server error occured.' });
  }
});

router.get('/edit_profile.html', checkJWTToken, authorize('user'), async (request, response) => {
  try {
    // const user = await udb.findUser(response.locals.payload.username);
    // if (user.birthDate !== null) {
    //   user.birthDate = new Date(user.birthDate).toLocaleDateString();
    // }
    // return response.render('edit_profile', { user, username: user.name, message: '' });
  } catch (error) {
    console.log(error);
    return response.status(500).render('edit_profile', { user: [], username: '', message: 'Server error occured.' });
  }
});

router.get('/client_reservations.html', checkJWTToken, authorize('user'), async (request, response) => {
  try {
    // const offset = (!request.query.page) ? 0 : (5 * parseInt(request.query.page, 10));
    // const user = await qp.checkUserInPayload(response);
    // const usersReservations = await udb.findAll5UsersReservations(offset,
    //   response.locals.payload.username);
    // return response.render('client_reservations', {
    //   userName: response.locals.payload.username, username: user, fields: usersReservations, message: '',
    // });
  } catch (error) {
    console.log(error);
    return response.status(500).render('client_reservations', { username: '', fields: [], message: 'Server error occured.' });
  }
});

router.get('/check_reservations.html', checkJWTToken, authorize('admin'), async (request, response) => {
  try {
    return rd.reloadCheckReservations(request, response);
  } catch (error) {
    console.log(error);
    return response.status(500).render('check_reservations', { username: '', message: 'Server error occured.' });
  }
});

router.get('/check_users.html', checkJWTToken, authorize('admin'), async (request, response) => {
  try {
    return rd.reloadCheckUsers(request, response);
  } catch (error) {
    console.log(error);
    return response.status(500).render('check_users', { users: [], username: '', message: `Unable to load data: ${error.message}` });
  }
});

router.get('/user_details.html', checkJWTToken, authorize('admin'), async (request, response) => {
  try {
    const userName = await qp.checkUserInPayload(response);
    // const user = await udb.findUser(request.query.un);
    // user.birthDate = new Date(user.birthDate).toLocaleDateString();
    // return response.render('user_details', { username: userName, user, message: '' });
  } catch (error) {
    console.log(error);
    return response.status(500).render('user_details', { username: '', user: [], message: `Unable to load data: ${error.message}` });
  }
});

router.get(['/', '/index.html'], async (request, response) => {
  try {
    const user = await qp.checkUserInPayload(response);
    return response.render('index', { username: user, message: '' });
  } catch (error) {
    console.log(error);
    return response.status(500).render('index', { username: '', message: 'Server error occured.' });
  }
});

router.get('/field_details.html', async (request, response) => {
  try {
    const user = await qp.checkUserInPayload(response);
    // const [fieldDetails, img] = await Promise.all([fdb.findField(request.query.fid),
    //   idb.findImages(request.query.fid)]);
    // return response.render('field_details', {
    //   username: user, field: fieldDetails, message: '', images: img,
    // });
  } catch (error) {
    console.log(error);
    return response.status(500).render('field_details', {
      username: '', field: [], images: [], message: 'Server error occured.',
    });
  }
});

router.post('/upload_images_form', checkJWTToken, authorize('admin'), vd.validateImageFieldUploadForm, handlerUploadImageForm);
router.get('/admin_form_create_field.html', checkJWTToken, authorize('admin'), async (request, response) => {
  try {
    const user = await qp.checkUserInPayload(response);
    return response.render('admin_form_create_field', { username: user, message: '' });
  } catch (error) {
    console.log(error);
    return response.status(500).render('admin_form_create_field', { username: '', message: `Unable to load data: ${error.message}` });
  }
});
router.post('/create_field_form', checkJWTToken, authorize('admin'), vd.validateCreateFieldForm, handlerCreateFieldForm);
router.get('/client_form.html', checkJWTToken, authorize('user'), async (request, response) => {
  try {
    const user = await qp.checkUserInPayload(response);
    // const [users, fields] = await Promise.all([udb.findAllUsers(), fdb.findAllFields()]);
    // return response.render('client_form', {
    //   username: user, users, fields, message: '',
    // });
  } catch (error) {
    console.log(error);
    return response.status(500).render('client_form', {
      username: '', users: [], fields: [], message: 'Server error occured.',
    });
  }
});

router.post('/reserve_form', checkJWTToken, authorize('user'),
  [vd.checkNameAndFieldInReserveForm, vd.checkDateInReserveForm,
    vd.checkIfDateIsAfterPresentInReserveForm,
    vd.checkTimeInReserveForm, vd.checkIfFieldIsFreeInterval,
    vd.checkIfFieldIsFreeRecurrent], handlerReserveForm);

export default router;
