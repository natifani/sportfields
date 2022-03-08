// Nagy Tifani - Franciska 523 ntim1937

function createMessageDivIfNotExists(table, fieldID) {
  let messageDiv = document.getElementById(`no-reserv-div-${fieldID}`);
  if (messageDiv === null) {
    messageDiv = document.createElement('div');
    messageDiv.setAttribute('id', `no-reserv-div-${fieldID}`);
    messageDiv.innerText = 'No reservations yet!';
    table.parentNode.appendChild(messageDiv);
  }
}

async function deleteReservation(reservID, fieldID, event) {
  const response = await fetch('/reservationApi/deleteReservation', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      reservationID: reservID,
    }),
  });
  const errDiv = document.getElementById(`${fieldID}-err-div`);
  if (response.status === 204) {
    errDiv.innerText = 'Reservation deleted succesfully!';

    const row = event.target.parentNode.parentNode;
    const table = event.target.parentNode.parentNode.parentNode;
    table.removeChild(row);

    if (table.rows.length === 1) {
      table.removeChild(table.firstChild);
      createMessageDivIfNotExists(table, fieldID);
    }
  } else {
    const body = await response.json();
    errDiv.innerText = `Error: ${body.message}`;
  }
}

async function deleteRecurrentReservation(reservID, fieldID, event) {
  const response = await fetch('/reservationApi/deleteReservation', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      reservationID: reservID,
    }),
  });

  const errDiv = document.getElementById(`${fieldID}-err-div`);
  if (response.status === 204) {
    errDiv.innerText = 'Reservation deleted succesfully!';

    const row = event.target.parentNode.parentNode;
    const table = event.target.parentNode.parentNode.parentNode;
    table.removeChild(row);

    if (table.rows.length === 1) {
      table.removeChild(table.firstChild);
      createMessageDivIfNotExists(table, fieldID);
    }
  } else {
    const body = await response.json();
    errDiv.innerText = `Error: ${body.message}`;
  }
}

function clearTable(table) {
  while (table.firstChild) {
    table.removeChild(table.firstChild);
  }
}

function createRecurrentReservationHeader(table) {
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

  table.appendChild(headerRow);
}

function createIntervalReservationHeader(table) {
  const headerRow = document.createElement('tr');
  const startDateHeader = document.createElement('th');
  const endDateHeader = document.createElement('th');

  startDateHeader.innerText = 'Start Date';
  endDateHeader.innerText = 'End Date';

  headerRow.appendChild(startDateHeader);
  headerRow.appendChild(endDateHeader);

  table.appendChild(headerRow);
}

function appendTable(table, element, username, role, fieldID) {
  const row = document.createElement('tr');
  const tdStartDate = document.createElement('td');
  const tdEndDate = document.createElement('td');

  tdStartDate.innerText = new Date(element.startDate).toLocaleString();
  tdEndDate.innerText = new Date(element.endDate).toLocaleString();

  row.appendChild(tdStartDate);
  row.appendChild(tdEndDate);

  if (role === 'user' && element.userName === username) {
    const deleteBtn = document.createElement('td');
    const deleteLink = document.createElement('a');
    deleteLink.setAttribute('href', '#');
    deleteLink.innerText = 'DELETE';
    deleteLink.addEventListener('click', (event) => {
      deleteReservation(element.reservID, fieldID, event);
    });
    deleteBtn.appendChild(deleteLink);
    row.appendChild(deleteBtn);
  }
  table.appendChild(row);
}

function appendRecurrentTable(table, element, username, role, fieldID) {
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

  if (role === 'user' && element.userName === username) {
    const deleteBtn = document.createElement('td');
    const deleteLink = document.createElement('a');
    deleteLink.setAttribute('href', '#');
    deleteLink.innerText = 'DELETE';
    deleteLink.addEventListener('click', (event) => {
      deleteRecurrentReservation(element.reservID, fieldID, event);
    });
    deleteBtn.appendChild(deleteLink);
    row.appendChild(deleteBtn);
  }
  table.appendChild(row);
}

function checkLengthOfTable(fieldID) {
  const table = document.getElementById(`${fieldID}-list-reserv`);
  document.getElementById(`${fieldID}-load-more-reserv-a`).innerText = 'Load more';

  if (table.rows.length > 4) {
    for (let i = 4; i < table.rows.length; i += 1) {
      table.rows[i].style.display = 'none';
    }
    document.getElementById(`${fieldID}-load-more-reserv-a`).style.display = 'block';
    document.getElementById(`${fieldID}-load-more-reserv-a`).addEventListener('click', () => {
      const Intervaltable = document.getElementById(`${fieldID}-list-reserv`);
      for (let i = 0; i < table.rows.length; i += 1) {
        Intervaltable.rows[i].style.display = 'block';
      }
      document.getElementById(`${fieldID}-load-more-reserv-a`).innerText = 'Hide';
      document.getElementById(`${fieldID}-load-more-reserv-a`).addEventListener('click', () => {
        checkLengthOfTable(fieldID);
      });
    });
  }
}

function checkLengthOfRecurrentTable(fieldID) {
  const table = document.getElementById(`${fieldID}-list-recurrent-reserv`);
  document.getElementById(`${fieldID}-load-more-recurrent-reserv-a`).innerText = 'Load more';
  if (table.rows.length > 4) {
    for (let i = 4; i < table.rows.length; i += 1) {
      table.rows[i].style.display = 'none';
    }
    document.getElementById(`${fieldID}-load-more-recurrent-reserv-a`).style.display = 'block';
    document.getElementById(`${fieldID}-load-more-recurrent-reserv-a`).addEventListener('click', () => {
      const recurrentTable = document.getElementById(`${fieldID}-list-recurrent-reserv`);
      for (let i = 0; i < table.rows.length; i += 1) {
        recurrentTable.rows[i].style.display = 'block';
      }
      document.getElementById(`${fieldID}-load-more-recurrent-reserv-a`).innerText = 'Hide';
      document.getElementById(`${fieldID}-load-more-recurrent-reserv-a`).addEventListener('click', () => {
        checkLengthOfRecurrentTable(fieldID);
      });
    });
  }
}

function addRows(table, recurrentTable, data, fieldID, username, role) {
  createIntervalReservationHeader(table);
  createRecurrentReservationHeader(recurrentTable);

  for (let i = 0; i < data.length; i += 1) {
    if (data[i].startDate !== null && data[i].endDate !== null) {
      appendTable(table, data[i], username, role, fieldID);
    } else {
      appendRecurrentTable(recurrentTable, data[i], username, role, fieldID);
    }
  }
  if (table.querySelector('td') === null) {
    clearTable(table);
  } else {
    checkLengthOfTable(fieldID);
  }
  if (recurrentTable.querySelector('td') === null) {
    clearTable(recurrentTable);
  } else {
    checkLengthOfRecurrentTable(fieldID);
  }
}

// eslint-disable-next-line no-unused-vars
async function loadReservations(fieldid, username, role) {
  const response = await fetch(`/reservationApi/getReservations/${fieldid}`);
  const body = await response.json();
  if (response.status === 200) {
    const reservList = document.getElementById(`${fieldid}-list-reserv`);
    const recurrentReservList = document.getElementById(`${fieldid}-list-recurrent-reserv`);
    clearTable(reservList);
    clearTable(recurrentReservList);
    if (body.reservations.length > 0) {
      const messageDiv = document.getElementById(`no-reserv-div-${fieldid}`);
      if (messageDiv !== null) {
        reservList.parentNode.removeChild(messageDiv);
      }
      addRows(reservList, recurrentReservList, body.reservations, fieldid, username, role);
    } else {
      createMessageDivIfNotExists(reservList, fieldid);
    }
  } else {
    const errDiv = document.getElementById(`${fieldid}-err-div`);
    errDiv.innerText = `Error: ${body.message}`;
  }
}
