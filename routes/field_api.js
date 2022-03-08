// Nagy Tifani - Franciska 523 ntim1937

import express from 'express';
// import * as fdb from '../db/field_queries.js';

const router = express.Router();

router.get('/getFieldTypes', async (request, response) => {
  try {
    // const fields = await fdb.findFieldTypes();
    // response.json({ fields });
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: 'Server error occured.' });
  }
});

export default router;
