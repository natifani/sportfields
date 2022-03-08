// Nagy Tifani Franciska  523 ntim1937

let reservCheckbox,
  intervalDiv,
  recurrentDiv,
  listboxDiv,
  selectField,
  reservDiv;

function clearList(list) {
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
}

function changeVisibility(element) {
  if (element.style.display === 'none') {
    // eslint-disable-next-line no-param-reassign
    element.style.display = 'block';
  } else {
    // eslint-disable-next-line no-param-reassign
    element.style.display = 'none';
  }
}

function changeReservationType() {
  changeVisibility(intervalDiv);
  changeVisibility(recurrentDiv);
}

function buildListOfReservations(data, list) {
  clearList(list);
  for (let i = 0; i < data.length; i += 1) {
    const listItem = document.createElement('li');
    listItem.setAttribute('class', 'reservations-li');
    if (data[i].startDate !== null && data[i].endDate !== null) {
      const startDate = new Date(data[i].startDate).toLocaleString();
      const endDate = new Date(data[i].endDate).toLocaleString();
      listItem.innerText = `${startDate} - ${endDate}`;
    } else {
      listItem.innerText = `${data[i].day} - ${data[i].startHour} - ${data[i].endHour}`;
    }
    list.appendChild(listItem);
  }
}

async function showReservations() {
  const selectValue = document.getElementById('field-select').value;
  if (selectValue === 'select') {
    listboxDiv.style.display = 'none';
    reservDiv.style.display = 'none';
  } else {
    const response = await fetch(`reservationApi/getReservations/${selectValue}`);
    const body = await response.json();
    if (response.status === 200) {
      listboxDiv.style.display = 'block';
      reservDiv.style.display = 'block';
      const reservSpan = document.getElementById('listbox-title-span');
      const list = document.getElementById('reservations-ul');
      if (body.reservations.length > 0) {
        list.style.display = 'block';
        reservSpan.innerText = 'Reserved dates:';
        buildListOfReservations(body.reservations, list);
      } else {
        list.style.display = 'none';
        reservSpan.innerText = 'No reservations yet.';
      }
    } else {
      const errDiv = document.getElementById('err-div');
      errDiv.innerText = 'Server error occured.';
    }
  }
}

document.body.onload = () => {
  reservCheckbox = document.getElementById('reserv-checkbox');
  intervalDiv = document.getElementById('interval-div');
  recurrentDiv = document.getElementById('recurrent-div');
  listboxDiv = document.getElementById('listbox-div');
  selectField = document.getElementById('field-select');
  reservDiv = document.getElementById('reservations');

  if (reservCheckbox.checked) {
    intervalDiv.style.display = 'none';
    recurrentDiv.style.display = 'block';
  } else {
    intervalDiv.style.display = 'block';
    recurrentDiv.style.display = 'none';
  }

  selectField.value = 'select';
  listboxDiv.style.display = 'none';
  reservDiv.style.display = 'none';

  reservCheckbox.addEventListener('change', changeReservationType);
  document.getElementById('field-select').addEventListener('change', showReservations);
};
