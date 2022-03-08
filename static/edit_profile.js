// Nagy Tifani Franciska 523 ntim1937

function changeVisibility(element) {
  if (element.style.display === 'none') {
    // eslint-disable-next-line no-param-reassign
    element.style.display = 'block';
  } else {
    // eslint-disable-next-line no-param-reassign
    element.style.display = 'none';
  }
}

let fullname,
  birthdate,
  education,
  viewFullname,
  viewBirthdate,
  viewEducation,
  editFullname,
  editEducation,
  editBirthdate;

function hideFullname() {
  document.getElementById('edit-name-message').innerText = '';
  document.getElementById('edit-name-input').value = fullname.innerText;
  changeVisibility(editFullname);
  changeVisibility(viewFullname);
  document.getElementById('edit-name-input').focus();
}

function hideBirthdate() {
  document.getElementById('edit-birthdate-message').innerText = '';
  document.getElementById('edit-birthdate-input').value = birthdate.innerText;
  changeVisibility(editBirthdate);
  changeVisibility(viewBirthdate);
  document.getElementById('edit-birthdate-input').focus();
}

function hideEducation() {
  document.getElementById('edit-institute-message').innerText = '';
  document.getElementById('edit-education-input').value = education.innerText;
  changeVisibility(editEducation);
  changeVisibility(viewEducation);
  document.getElementById('edit-education-input').focus();
}

// eslint-disable-next-line no-unused-vars
async function saveName(userName) {
  const newName = document.getElementById('edit-name-input').value;
  const response = await fetch('/userApi/setName', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      newname: newName,
      username: userName,
    }),
  });
  if (response.status === 204) {
    fullname.innerText = newName;
    changeVisibility(editFullname);
    changeVisibility(viewFullname);
  } else if (response.status === 400) {
    const body = await response.json();
    document.getElementById('edit-name-message').innerText = body.message;
  } else {
    const body = await response.json();
    console.log(body.message);
  }
}

// eslint-disable-next-line no-unused-vars
async function saveBirthdate(userName) {
  const newBirthdate = document.getElementById('edit-birthdate-input').value;
  const response = await fetch('/userApi/setBirthdate', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      newbirthdate: newBirthdate,
      username: userName,
    }),
  });
  if (response.status === 204) {
    birthdate.innerText = newBirthdate;
    changeVisibility(editBirthdate);
    changeVisibility(viewBirthdate);
  } else if (response.status === 400) {
    const body = await response.json();
    document.getElementById('edit-birthdate-message').innerText = body.message;
  } else {
    const body = await response.json();
    console.log(body.message);
  }
}

// eslint-disable-next-line no-unused-vars
async function saveInstitute(userName) {
  const newInstitute = document.getElementById('edit-education-input').value;
  const response = await fetch('/userApi/setEducation', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      newinstitute: newInstitute,
      username: userName,
    }),
  });
  if (response.status === 204) {
    education.innerText = newInstitute;
    changeVisibility(editEducation);
    changeVisibility(viewEducation);
  } else if (response.status === 400) {
    const body = await response.json();
    document.getElementById('edit-institute-message').innerText = body.message;
  } else {
    const body = await response.json();
    console.log(body.message);
  }
}

document.body.onload = () => {
  fullname = document.getElementById('name-div');
  birthdate = document.getElementById('birthdate-div');
  education = document.getElementById('education-div');

  viewFullname = document.getElementById('view-name-div');
  viewBirthdate = document.getElementById('view-birthdate-div');
  viewEducation = document.getElementById('view-education-div');

  editFullname = document.getElementById('edit-name-div');
  editBirthdate = document.getElementById('edit-birthdate-div');
  editEducation = document.getElementById('edit-education-div');

  document.getElementById('edit-name-message').innerText = '';
  document.getElementById('edit-birthdate-message').innerText = '';
  document.getElementById('edit-institute-message').innerText = '';

  changeVisibility(editFullname);
  changeVisibility(editBirthdate);
  changeVisibility(editEducation);

  document.getElementById('edit-name-a').addEventListener('click', hideFullname);
  document.getElementById('edit-birthdate-a').addEventListener('click', hideBirthdate);
  document.getElementById('edit-education-a').addEventListener('click', hideEducation);
};
