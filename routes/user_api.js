// Nagy Tifani - Franciska ntim1937 523

import bodyParser from 'body-parser';
import express from 'express';
// import * as udb from '../db/user_queries.js';
import { checkJWTToken, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/getUsersReservations/:username/:page', checkJWTToken, authorize('user'), async (request, response) => {
  try {
    // const offset = 5 * parseInt(request.params.page, 10);
    // const reservations = await udb.findAll5UsersReservations(offset,
    //   request.params.username);
    // response.json({ reservations });
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: 'Server error occured.' });
  }
});

router.get('/getAllUsersAndReservations', checkJWTToken, authorize('admin'), async (request, response) => {
  try {
    // const reservations = await udb.findAllUsersAndReservations();
    // response.json({ reservations });
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: 'Server error occured.' });
  }
});

router.put('/setName', checkJWTToken, authorize('user'), bodyParser.json(), async (request, response) => {
  try {
    const nameRegexp = /^[A-Z][a-z]+( +[A-Z][a-z]+)*$/;
    if (!nameRegexp.test(request.body.newname)) {
      response.status(400).send({ message: 'Invalid name.' });
    } else {
      // await udb.updateName(request.body.username, request.body.newname);
      // response.sendStatus(204);
    }
  } catch (error) {
    response.status(500).send({ message: 'Server error occured.' });
  }
});

router.put('/setBirthdate', checkJWTToken, authorize('user'), bodyParser.json(), async (request, response) => {
  try {
    const dateRegexp = /^(19|20)\d{2}(-|.)((1[0-2])|(0[1-9]))(-|.)(3[0-1]|[1-2]\d|0[1-9])$/;
    if (!request.body.newbirthdate) {
      // await udb.updateBirthdate(request.body.username, null);
      // response.sendStatus(204);
    } else if (!dateRegexp.test(request.body.newbirthdate)) {
      response.status(400).send({ message: 'Invalid date.' });
    } else {
      // await udb.updateBirthdate(request.body.username, request.body.newbirthdate);
      // response.sendStatus(204);
    }
  } catch (error) {
    response.status(500).send({ message: 'Server error occured.' });
  }
});

router.put('/setEducation', checkJWTToken, authorize('user'), bodyParser.json(), async (request, response) => {
  try {
    const educationRegexp = /^[A-Z][a-z]+( +[A-Z][a-z]+)*$/;
    if (!request.body.newinstitute) {
      // await udb.updateEducation(request.body.username, null);
      response.sendStatus(204);
    } else if (!educationRegexp.test(request.body.newinstitute)) {
      response.status(400).send({ message: 'Invalid institute name.' });
    } else {
      // await udb.updateEducation(request.body.username, request.body.newinstitute);
      // response.sendStatus(204);
    }
  } catch (error) {
    response.status(500).send({ message: 'Server error occured.' });
  }
});

router.put('/setblockedFieldUser', checkJWTToken, authorize('admin'), bodyParser.json(), async (request, response) => {
  try {
    // await udb.updateBlockedFieldUser(request.body.username,
    //   parseInt(request.body.isBlocked, 10));
    // response.sendStatus(204);
  } catch (error) {
    response.status(500).send({ message: 'Server error occured.' });
  }
});
router.put('/acceptUser', checkJWTToken, authorize('admin'), bodyParser.json(), async (request, response) => {
  try {
    // await udb.updateRoleOfUser(request.body.username);
    // response.sendStatus(204);
  } catch (error) {
    response.status(500).send({ message: 'Server error occured.' });
  }
});

router.delete('/rejectUser', checkJWTToken, authorize('admin'), bodyParser.json(), async (request, response) => {
  try {
    // await udb.deleteUser(request.body.username);
    // response.sendStatus(204);
  } catch (error) {
    response.status(500).send({ message: 'Server error occured.' });
  }
});

export default router;
