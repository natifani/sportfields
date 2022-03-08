// Nagy Tifani - Franciska 523 ntim1937

import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as vd from '../middleware/validations.js';
// import * as udb from '../db/user_queries.js';
import * as rl from '../middleware/reloads.js';
import secret from '../utils/config.js';

const router = express.Router();

router.get('/registration_form.html', async (request, response) => response.render('registration_form', { message: '' }));
router.post('/registration_form', [vd.checkIfEmailIsBlocked, vd.validateRegistrationForm, vd.validateRegistrationFormPassword], async (request, response) => {
  try {
    const username = request.fields.clusername;
    const name = request.fields.clname;
    const email = request.fields.clemail;
    const birthDate = new Date(request.fields.clbirthdate);
    const education = request.fields.cleducation;
    const passwd = await bcrypt.hash(request.fields.clpassword, 10);
    const role = 'guest';
    // await udb.insertUser(username, email, name, birthDate, education, passwd, role);
    response.render('registration_form', { message: 'Your registration is being processed.' });
  } catch (error) {
    rl.reloadRegistrationForm(response, 'Server error occured.', 500);
  }
});

router.get('/login_form.html', async (request, response) => response.render('login_form', { message: '' }));
router.post('/login_form', vd.validateLoginForm, async (request, response) => {
  try {
    const username = request.fields.clusername;
    const passwd = await bcrypt.hash(request.fields.clpassword, 10);
    // const role = await udb.findRoleOfUser(username);
    // if (role !== 'guest') {
    //   const token = jwt.sign({ username, passwd, role }, secret);
    //   response.clearCookie('token');
    //   response.cookie('token', token, {
    //     httpOnly: true,
    //     sameSite: 'strict',
    //   });
    //   response.redirect('/');
    // } else {
    //   response.render('login_form', { message: 'Your registration is being processed.' });
    // }
  } catch (error) {
    rl.reloadLoginForm(response, 'Server error occured.', 500);
  }
});

router.use('/logout', (request, response) => {
  response.clearCookie('token');
  response.status(200).redirect('/');
});

export default router;
