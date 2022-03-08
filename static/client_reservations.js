// Nagy Tifani Franciska 523 ntim1937

function addPaging() {
  document.getElementById('first-page').onclick = () => {
    const url = new URL(window.location.href);
    const params = url.searchParams;
    params.delete('page');
    params.append('page', 0);
    url.search = params.toString();
    const newUrl = url.toString();
    window.location = newUrl;
  };

  document.getElementById('prev-page').onclick = () => {
    const url = new URL(window.location.href);
    const params = url.searchParams;
    if (params.get('page')) {
      const page = parseInt(params.get('page'), 10);
      if (page > 0) {
        params.delete('page');
        params.append('page', page - 1);
        url.search = params.toString();
        const newUrl = url.toString();
        window.location = newUrl;
      }
    }
  };

  document.getElementById('next-page').onclick = async () => {
    const url = new URL(window.location.href);
    const params = url.searchParams;
    const fieldDiv = document.getElementsByClassName('field')[0];
    if (fieldDiv.children.length > 0) {
      let pageNumber = 0;
      if (params.get('page')) {
        pageNumber = parseInt(params.get('page'), 10);
      }
      params.delete('page');
      params.append('page', pageNumber + 1);
      url.search = params.toString();
      const newUrl = url.toString();
      window.location = newUrl;
    }
  };
}

function addTable(element) {
  const table = document.getElementById(`${element.reservID}-list-reserv`);

  const headerRow = document.createElement('tr');
  const startDateHeader = document.createElement('th');
  const endDateHeader = document.createElement('th');
  startDateHeader.innerText = 'Start Date';
  endDateHeader.innerText = 'End Date';
  headerRow.appendChild(startDateHeader);
  headerRow.appendChild(endDateHeader);
  table.appendChild(headerRow);

  const row = document.createElement('tr');
  const tdStartDate = document.createElement('td');
  const tdEndDate = document.createElement('td');

  tdStartDate.innerText = new Date(element.startDate).toLocaleString();
  tdEndDate.innerText = new Date(element.endDate).toLocaleString();

  row.appendChild(tdStartDate);
  row.appendChild(tdEndDate);
  table.appendChild(row);
}

function addRecurentTable(element) {
  const table = document.getElementById(`${element.reservID}-list-reserv`);

  const headerRow = document.createElement('tr');
  const dayHeader = document.createElement('th');
  const startHourHeader = document.createElement('th');
  const endHourHeader = document.createElement('th');

  dayHeader.innerText = 'Day';
  startHourHeader.innerText = 'Start Hour';
  endHourHeader.innerText = 'End Hour';

  headerRow.appendChild(dayHeader);
  headerRow.appendChild(startHourHeader);
  headerRow.appendChild(endHourHeader);

  const row = document.createElement('tr');
  const tdDay = document.createElement('td');
  const tdStartHour = document.createElement('td');
  const tdEndHour = document.createElement('td');

  tdDay.innerText = element.day.toUpperCase();
  tdStartHour.innerText = element.startHour;
  tdEndHour.innerText = element.endHour;

  row.appendChild(tdDay);
  row.appendChild(tdStartHour);
  row.appendChild(tdEndHour);

  table.appendChild(headerRow);
  table.appendChild(row);
}

function addReservationTimes(data) {
  for (let i = 0; i < data.length; i += 1) {
    if (data[i].startDate !== null && data[i].endDate !== null) {
      addTable(data[i]);
    } else {
      addRecurentTable(data[i]);
    }
  }
}

// eslint-disable-next-line no-unused-vars
async function loadUsersReservationsAndAddPaging(userName) {
  addPaging();
  const url = new URL(window.location.href);
  const params = url.searchParams;
  const page = (!params.get('page') ? 0 : params.get('page'));
  const response = await fetch(`/userApi/getUsersReservations/${userName}/${page}`);
  const body = await response.json();
  const errDiv = document.getElementById('client-reservation-err-div');
  if (response.status === 200) {
    if (body.reservations.length > 0) {
      errDiv.innerText = '';
      addReservationTimes(body.reservations);
    }
  } else {
    errDiv.innerText = 'Error occured. Come back later!';
  }
}

// eslint-disable-next-line no-unused-vars
async function deleteReservation(reservID) {
  const response = await fetch('/reservationApi/deleteReservation', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      reservationID: reservID,
    }),
  });

  if (response.status === 204) {
    window.location = 'client_reservations.html';
    document.getElementById(`${reservID}-field-div`).remove();
  } else {
    window.location = 'client_reservations.html';
  }
}
