// Nagy Tifani - Franciska 523 ntim1937

// import * as rdb from '../db/reservation_queries.js';
// import * as idb from '../db/image_queries.js';
// import * as fdb from '../db/field_queries.js';
import * as rl from './reloads.js';

// uj palya felvezetese a rendszerbe
export async function handlerCreateFieldForm(request, response) {
  try {
    // await fdb.insertField(request.fields);
    console.log(`Server received succesfully:
      field type: ${request.fields.type}
      field wage: ${request.fields.wage}
      field name: ${request.fields.address}
      field description: ${request.fields.description}
    `);
    response.redirect('/sportfields.html');
  } catch (error) {
    console.log(error);
    response.status(500).render('admin_form_create_field', { username: '', message: `Unable to insert data: ${error.message}` });
  }
}

// uj foglalas felvezetese a rendszerbe
export async function handlerReserveForm(request, response) {
  try {
    request.fields.clname = response.locals.payload.username;
    // await rdb.insertReservation(request.fields);
    console.log(`Server received succesfully:
      user name: ${request.fields.clname}
      field id: ${request.fields.clfname}
      start date and time: ${request.fields.startdatetime}
      end date and time: ${request.fields.enddatetime}
      is recurrent: ${request.fields.recurrentCb}
      start hour: ${request.fields.starthour}
      end hour: ${request.fields.endhour}
    `);
    rl.reloadReservationsPage(response, 'Reservation succeded.', 200);
  } catch (error) {
    console.log(error);
    response.status(500).render('client_form', {
      username: '', users: [], fields: [], message: 'Server error occurred.',
    });
  }
}

// kepek felvezetese a rendszerbe
export async function handlerUploadImageForm(request, response) {
  try {
    const fileHandler = request.files.images;
    if (fileHandler.constructor === Array) {
      const promises = [];
      // for (let i = 0; i < fileHandler.length; i += 1) {
      //   const insert = idb.insertImage(request.query.fid, fileHandler[i].path.split('\\').splice(-1)[0]);
      //   promises.push(insert);
      // }
      await Promise.all(promises);
    } else {
      // await idb.insertImage(request.query.fid, fileHandler.path.split('\\').splice(-1)[0]);
    }
    rl.reloadFieldDetailsPage(response, request, 'Images uploaded succesfully', 200);
    console.log('Server received succesfully the images.');
  } catch (error) {
    console.log(error);
    response.status(500).render('field_details', {
      username: '', field: [], message: `Unable to insert data: ${error.message}`, images: [],
    });
  }
}
