// Nagy Tifani - Franciska 523 ntim1937

import bodyParser from 'body-parser';
import express from 'express';
// import * as rdb from '../db/reservation_queries.js';
import { checkJWTToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/getReservations/:id', checkJWTToken, async (request, response) => {
  try {
    // const reservations = await rdb.findReservations(request.params.id);
    // response.json({ reservations });
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: 'Server error occured.' });
  }
});

router.delete('/deleteReservation', checkJWTToken, bodyParser.json(), async (request, response) => {
  try {
    // await rdb.deleteReservation(request.body.reservationID);
    // response.sendStatus(204);
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: 'Server error occured.' });
  }
});

export default router;
