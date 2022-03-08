// Nagy Tifani - Franciska 523 ntim1937

import jwt from 'jsonwebtoken';
import secret from '../utils/config.js';

export function verifyJWTToken(request, response, next) {
  response.locals.payload = {};
  if (request.cookies.token) {
    try {
      response.locals.payload = jwt.verify(request.cookies.token, secret);
    } catch (error) {
      response.clearCookie('token');
      response.status(500).send(error.toString());
    }
  }
  next();
}

export function checkJWTToken(request, response, next) {
  if (Object.keys(response.locals.payload).length !== 0) {
    next();
  } else {
    response.status(401).render('login_form', { message: 'Login required!' });
  }
}

export function authorize(role) {
  return (request, response, next) => {
    if (response.locals.payload.role !== role) {
      response.status(403).redirect('/');
    } else {
      next();
    }
  };
}
