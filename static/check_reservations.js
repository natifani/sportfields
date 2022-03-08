// Nagy Tifani Franciska 523 ntim1937

function clearDiv(div) {
  while (div.firstChild) {
    div.removeChild(div.firstChild);
  }
}

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
    window.location = 'check_reservations.html';
    document.getElementById(`${reservID}-field-div`).remove();
  } else {
    window.location = 'check_reservations.html';
  }
}

function addUsernameSearchBtn() {
  const url = new URL(window.location.href);
  const params = url.searchParams;
  document.getElementById('admin-username-search-btn').onclick = () => {
    const inputText = document.getElementById('admin-username-input').value;
    if (inputText !== '') {
      params.delete('username');
      params.delete('fieldname');
      params.append('username', inputText);
      params.delete('page');
      params.append('page', 0);
      const newUrl = url.toString();
      window.location = newUrl;
    }
  };
}

function addFieldnameSearchBtn() {
  const url = new URL(window.location.href);
  const params = url.searchParams;
  document.getElementById('admin-fieldname-search-btn').onclick = () => {
    const inputText = document.getElementById('admin-fieldname-input').value;
    if (inputText !== '') {
      params.delete('fieldname');
      params.delete('username');
      params.append('fieldname', inputText);
      params.delete('page');
      params.append('page', 0);
      const newUrl = url.toString();
      window.location = newUrl;
    }
  };
}

function filterByDate(filterDiv) {
  const dateRegexp = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[0-9]|1[0-9]|2[0-9]|3[0-1])(T| )(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
  const url = new URL(window.location.href);
  const params = url.searchParams;
  const startInputText = document.getElementById('start-date-input').value;
  const endInputText = document.getElementById('end-date-input').value;
  const startDate = new Date(startInputText);
  const endDate = new Date(endInputText);
  if (dateRegexp.test(startInputText) && dateRegexp.test(endInputText) && startDate < endDate) {
    params.delete('startDate');
    params.delete('endDate');
    params.delete('day');
    params.delete('startHour');
    params.delete('endHour');
    params.append('startDate', startInputText);
    params.append('endDate', endInputText);
    params.delete('page');
    params.append('page', 0);
    const newUrl = url.toString();
    window.location = newUrl;
  } else {
    const noMatchSpan = document.createElement('span');
    noMatchSpan.setAttribute('id', 'wage-span');
    noMatchSpan.innerText = 'Incorrect syntax.';
    filterDiv.appendChild(noMatchSpan);
  }
}

function filterByHour(filterDiv) {
  const timeRegexp = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  const url = new URL(window.location.href);
  const params = url.searchParams;
  const startInputText = document.getElementById('start-hour-input').value;
  const endInputText = document.getElementById('end-hour-input').value;
  const daySelected = document.getElementById('day-select').value;

  if (timeRegexp.test(startInputText) && timeRegexp.test(endInputText)
  && startInputText < endInputText) {
    params.delete('startDate');
    params.delete('endDate');
    params.delete('day');
    params.delete('startHour');
    params.delete('endHour');
    params.append('day', daySelected);
    params.append('startHour', startInputText);
    params.append('endHour', endInputText);
    params.delete('page');
    params.append('page', 0);
    const newUrl = url.toString();
    window.location = newUrl;
  } else {
    const noMatchSpan = document.createElement('span');
    noMatchSpan.setAttribute('id', 'wage-span');
    noMatchSpan.innerText = 'Incorrect syntax.';
    filterDiv.appendChild(noMatchSpan);
  }
}

function showIntervals() {
  const url = new URL(window.location.href);
  const params = url.searchParams;
  const filterDiv = document.getElementById('filter-elements-div');
  clearDiv(filterDiv);

  const startDateLabel = document.createElement('label');
  startDateLabel.setAttribute('id', 'start-date-label');
  startDateLabel.innerText = 'START DATE';

  const endDateLabel = document.createElement('label');
  endDateLabel.setAttribute('id', 'end-date-label');
  endDateLabel.innerText = 'END DATE';

  const startDateInput = document.createElement('input');
  startDateInput.setAttribute('id', 'start-date-input');
  startDateInput.setAttribute('type', 'datetime-local');
  startDateInput.setAttribute('class', 'text-input');
  startDateInput.setAttribute('pattern', '^[0-9]{4}-(0[1-9]|1[0-2])-(0[0-9]|1[0-9]|2[0-9]|3[0-1])(T| )(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$');
  startDateInput.setAttribute('placeholder', 'YYYY-MM-DD HH:MM');

  const endDateInput = document.createElement('input');
  endDateInput.setAttribute('id', 'end-date-input');
  endDateInput.setAttribute('type', 'datetime-local');
  endDateInput.setAttribute('class', 'text-input');
  endDateInput.setAttribute('pattern', '^[0-9]{4}-(0[1-9]|1[0-2])-(0[0-9]|1[0-9]|2[0-9]|3[0-1])(T| )(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$');
  endDateInput.setAttribute('placeholder', 'YYYY-MM-DD HH:MM');

  const dateButton = document.createElement('button');
  dateButton.setAttribute('id', 'date-btn');
  dateButton.innerText = 'SEARCH';
  dateButton.addEventListener('click', () => filterByDate(filterDiv));

  filterDiv.appendChild(startDateLabel);
  filterDiv.appendChild(startDateInput);
  filterDiv.appendChild(endDateLabel);
  filterDiv.appendChild(endDateInput);
  filterDiv.appendChild(dateButton);

  if (params.get('startDate') && params.get('endDate')) {
    const clearButton = document.createElement('button');
    clearButton.setAttribute('id', 'clear-filter-btn');
    clearButton.innerText = 'CLEAR FILTER';
    clearButton.addEventListener('click', () => {
      params.delete('startDate');
      params.delete('endDate');
      url.search = params.toString();
      const newUrl = url.toString();
      window.location = newUrl;
    });
    filterDiv.appendChild(clearButton);
  }
}

function getDayOption(day) {
  const option = document.createElement('option');
  option.setAttribute('value', day);
  option.innerText = day;
  return option;
}

function showRecurrent() {
  const url = new URL(window.location.href);
  const params = url.searchParams;
  const filterDiv = document.getElementById('filter-elements-div');
  clearDiv(filterDiv);

  const dayLabel = document.createElement('label');
  dayLabel.setAttribute('id', 'day-label');
  dayLabel.innerText = 'DAY';

  const startHourLabel = document.createElement('label');
  startHourLabel.setAttribute('id', 'start-hour-label');
  startHourLabel.innerText = 'START HOUR';

  const endHourLabel = document.createElement('label');
  endHourLabel.setAttribute('id', 'end-hour-label');
  endHourLabel.innerText = 'END HOUR';

  const daySelect = document.createElement('select');
  daySelect.setAttribute('id', 'day-select');
  daySelect.appendChild(getDayOption('monday'));
  daySelect.appendChild(getDayOption('tuesday'));
  daySelect.appendChild(getDayOption('wednesday'));
  daySelect.appendChild(getDayOption('thursday'));
  daySelect.appendChild(getDayOption('friday'));
  daySelect.appendChild(getDayOption('saturday'));
  daySelect.appendChild(getDayOption('sunday'));

  const startHourInput = document.createElement('input');
  startHourInput.setAttribute('id', 'start-hour-input');
  startHourInput.setAttribute('type', 'time');
  startHourInput.setAttribute('class', 'text-input');
  startHourInput.setAttribute('pattern', '^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$');

  const endHourInput = document.createElement('input');
  endHourInput.setAttribute('id', 'end-hour-input');
  endHourInput.setAttribute('type', 'time');
  endHourInput.setAttribute('class', 'text-input');
  endHourInput.setAttribute('pattern', '^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$');

  const hourButton = document.createElement('button');
  hourButton.setAttribute('id', 'date-btn');
  hourButton.innerText = 'SEARCH';
  hourButton.addEventListener('click', () => filterByHour(filterDiv));

  filterDiv.appendChild(dayLabel);
  filterDiv.appendChild(daySelect);
  filterDiv.appendChild(startHourLabel);
  filterDiv.appendChild(startHourInput);
  filterDiv.appendChild(endHourLabel);
  filterDiv.appendChild(endHourInput);
  filterDiv.appendChild(hourButton);

  if (params.get('day') && params.get('startHour') && params.get('endHour')) {
    const clearButton = document.createElement('button');
    clearButton.setAttribute('id', 'clear-filter-btn');
    clearButton.innerText = 'CLEAR FILTER';
    clearButton.addEventListener('click', () => {
      params.delete('day');
      params.delete('startHour');
      params.delete('endHour');
      url.search = params.toString();
      const newUrl = url.toString();
      window.location = newUrl;
    });
    filterDiv.appendChild(clearButton);
  }
}

function addFilterBtn() {
  document.getElementById('admin-filter-btn').onclick = () => {
    const filterBy = document.getElementById('admin-filter-field-select').value;
    if (filterBy === 'all') {
      window.location = 'check_reservations.html';
    }
    if (filterBy === 'interval') {
      showIntervals();
    }
    if (filterBy === 'recurrent') {
      showRecurrent();
    }
  };
}

document.body.onload = async () => {
  addUsernameSearchBtn();
  addFieldnameSearchBtn();
  addFilterBtn();
  addPaging();
};
