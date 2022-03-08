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
// eslint-disable-next-line no-unused-vars
async function setblockedFieldUser(userID, userName, blocked) {
  const response = await fetch('userApi/setblockedFieldUser', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      isBlocked: blocked,
      username: userName,
    }),
  });
  if (response.status === 204) {
    window.location = 'check_users.html';
  } else {
    const body = await response.json();
    console.log(body.message);
    document.getElementById(`${userID}-error-div`).innerText = body.message;
  }
}

// eslint-disable-next-line no-unused-vars
async function acceptUser(userID, userName) {
  const response = await fetch('userApi/acceptUser', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: userName,
    }),
  });
  if (response.status === 204) {
    window.location = 'check_users.html';
  } else {
    const body = await response.json();
    console.log(body.message);
    document.getElementById(`${userID}-error-div`).innerText = body.message;
  }
}

// eslint-disable-next-line no-unused-vars
async function rejectUser(userID, userName) {
  const response = await fetch('userApi/rejectUser', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: userName,
    }),
  });
  if (response.status === 204) {
    window.location = 'check_users.html';
  } else {
    const body = await response.json();
    console.log(body.message);
    document.getElementById(`${userID}-error-div`).innerText = body.message;
  }
}

function filterNotApprovedUsers() {
  const checkbox = document.getElementById('not-approved-cb');
  const url = new URL(window.location.href);
  const params = url.searchParams;
  params.delete('notApproved');
  params.delete('blocked');
  if (checkbox.checked) {
    params.append('notApproved', 1);
  }
  params.delete('page');
  params.append('page', 0);
  url.search = params.toString();
  const newUrl = url.toString();
  window.location = newUrl;
}

function filterBlockedUsers() {
  const checkbox = document.getElementById('blocked-cb');
  const url = new URL(window.location.href);
  const params = url.searchParams;
  params.delete('notApproved');
  params.delete('blocked');
  if (checkbox.checked) {
    params.append('blocked', 1);
  }
  params.delete('page');
  params.append('page', 0);
  url.search = params.toString();
  const newUrl = url.toString();
  window.location = newUrl;
}

function filterUnblockedUsers() {
  const checkbox = document.getElementById('unblocked-cb');
  const url = new URL(window.location.href);
  const params = url.searchParams;
  params.delete('notApproved');
  params.delete('blocked');
  if (checkbox.checked) {
    params.append('blocked', 0);
  }
  params.delete('page');
  params.append('page', 0);
  url.search = params.toString();
  const newUrl = url.toString();
  window.location = newUrl;
}

document.body.onload = () => {
  const url = new URL(window.location.href);
  const params = url.searchParams;

  const notApprovedCheckbox = document.getElementById('not-approved-cb');
  const blockedCheckbox = document.getElementById('blocked-cb');
  const unblockedCheckbox = document.getElementById('unblocked-cb');
  const allCheckbox = document.getElementById('all-cb');

  if (params.get('notApproved')) {
    notApprovedCheckbox.checked = true;
  }

  if (params.get('blocked') === '0') {
    unblockedCheckbox.checked = true;
  }

  if (params.get('blocked') === '1') {
    blockedCheckbox.checked = true;
  }

  notApprovedCheckbox.addEventListener('change', filterNotApprovedUsers);
  blockedCheckbox.addEventListener('change', filterBlockedUsers);
  unblockedCheckbox.addEventListener('change', filterUnblockedUsers);
  allCheckbox.addEventListener('change', () => {
    params.delete('notApproved');
    params.delete('blocked');
    params.delete('page');
    params.append('page', 0);
    url.search = params.toString();
    const newUrl = url.toString();
    window.location = newUrl;
  });
  addPaging();
};
