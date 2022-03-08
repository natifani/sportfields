// Nagy Tifani - Franciska 523 ntim1937

import express from 'express';
import {
  existsSync, mkdirSync,
} from 'fs';
import { join } from 'path';
import eformidable from 'express-formidable';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import requestRoutes from './routes/views.js';
import userApiRoutes from './routes/user_api.js';
import fieldApiRoutes from './routes/field_api.js';
import reservationApiRoutes from './routes/reservation_api.js';
import loginRoutes from './routes/auth.js';
import { verifyJWTToken } from './middleware/auth.js';

const app = express();
app.set('port', process.env.PORT || 8080);

const uploadDir = join(process.cwd(), 'uploadDir');
if (!existsSync(uploadDir)) {
  mkdirSync(uploadDir);
}

app.use(express.static(join(process.cwd(), 'static')));
app.use(express.static(uploadDir));

app.use(morgan('tiny'));
app.use(cookieParser());
app.use(verifyJWTToken);
app.use('/userApi', userApiRoutes);
app.use('/fieldApi', fieldApiRoutes);
app.use('/reservationApi', reservationApiRoutes);

app.use(eformidable({ uploadDir, multiples: true }));

app.set('view engine', 'ejs');

app.use('/', requestRoutes);
app.use('/', loginRoutes);

app.listen(app.get('port'), () => { console.log(`Server listening on http://localhost:${app.get('port')}/ ...`); });
