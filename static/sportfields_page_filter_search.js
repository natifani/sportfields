// Nagy Tifani - Franciska 523 ntim1937

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

function paramExists(type, params, fieldType) {
  const allTypes = params.getAll(type);
  for (let i = 0; i < allTypes.length; i += 1) {
    if (allTypes[i] === fieldType) {
      return true;
    }
  }
  return false;
}

function clearParamsAndAddType(params, fieldType) {
  params.delete('name');
  params.delete('sortBy');
  params.delete('sortMode');
  params.append('type', fieldType);
}

function filterFieldsByType(nr) {
  const checkbox = document.getElementById(`cb-type-${nr}`);
  const url = new URL(window.location.href);
  const params = url.searchParams;
  const fieldType = document.getElementById(`label-type-${nr}`).innerText;
  if (checkbox.checked) {
    if (params.get('type')) {
      if (!paramExists('type', params, fieldType)) {
        params.append('type', fieldType);
      }
    } else {
      clearParamsAndAddType(params, fieldType);
    }
  } else {
    const allTypes = params.getAll('type');
    params.delete('type');
    for (let i = 0; i < allTypes.length; i += 1) {
      if (allTypes[i] !== fieldType) {
        params.append('type', allTypes[i]);
      }
    }
  }
  params.delete('page');
  params.append('page', 0);
  url.search = params.toString();
  const newUrl = url.toString();
  window.location = newUrl;
}

function addCheckboxes(fieldTypes) {
  const filterDiv = document.getElementById('filter-elements-div');
  const url = new URL(window.location.href);
  const params = url.searchParams;
  clearDiv(filterDiv);
  for (let i = 0; i < fieldTypes.length; i += 1) {
    const filterCheckbox = document.createElement('input');
    filterCheckbox.setAttribute('type', 'checkbox');
    filterCheckbox.setAttribute('id', `cb-type-${i}`);
    const filterLabel = document.createElement('label');
    filterLabel.setAttribute('id', `label-type-${i}`);
    filterLabel.innerText = fieldTypes[i].fieldType;
    filterDiv.appendChild(filterCheckbox);
    filterDiv.appendChild(filterLabel);
    if (paramExists('type', params, fieldTypes[i].fieldType)) {
      filterCheckbox.checked = true;
    }
    filterCheckbox.addEventListener('change', () => filterFieldsByType(i));
  }
}

async function showTypes() {
  const response = await fetch('/fieldApi/getFieldTypes');
  const body = await response.json();
  if (response.status === 200) {
    addCheckboxes(body.fields);
  } else {
    const filterDiv = document.getElementById('filter-elements-div');
    filterDiv.innerText = 'Unable to load filters.';
  }
}

function filterFieldsByOthers(index) {
  const url = new URL(window.location.href);
  const params = url.searchParams;
  const checkbox = document.getElementById(`cb-other-${index}`);
  if (checkbox.checked) {
    params.delete('indoor');
    params.delete('name');
    params.delete('sortBy');
    params.delete('sortMode');
    if (index === 0) {
      params.append('indoor', 1);
    }
    if (index === 1) {
      params.append('indoor', 0);
    }
  } else {
    params.delete('indoor');
  }

  params.delete('page');
  params.append('page', 0);

  url.search = params.toString();
  const newUrl = url.toString();
  window.location = newUrl;
}

function showOtherInformation() {
  const url = new URL(window.location.href);
  const params = url.searchParams;
  const filterDiv = document.getElementById('filter-elements-div');
  clearDiv(filterDiv);

  const indoorFieldCheckbox = document.createElement('input');
  indoorFieldCheckbox.setAttribute('type', 'checkbox');
  indoorFieldCheckbox.setAttribute('id', 'cb-other-0');
  const indoorFieldLabel = document.createElement('label');
  indoorFieldLabel.setAttribute('id', 'label-other-0');
  indoorFieldLabel.innerText = 'Indoor Fields';
  indoorFieldCheckbox.addEventListener('change', () => filterFieldsByOthers(0));
  if (paramExists('indoor', params, '1')) {
    indoorFieldCheckbox.checked = true;
  }
  filterDiv.appendChild(indoorFieldCheckbox);
  filterDiv.appendChild(indoorFieldLabel);

  const outdoorFieldCheckbox = document.createElement('input');
  outdoorFieldCheckbox.setAttribute('type', 'checkbox');
  outdoorFieldCheckbox.setAttribute('id', 'cb-other-1');
  const outdoorFieldLabel = document.createElement('label');
  outdoorFieldLabel.setAttribute('id', 'label-other-1');
  outdoorFieldLabel.innerText = 'Outdoor Fields';
  outdoorFieldCheckbox.addEventListener('change', () => filterFieldsByOthers(1));
  if (paramExists('indoor', params, '0')) {
    outdoorFieldCheckbox.checked = true;
  }
  filterDiv.appendChild(outdoorFieldCheckbox);
  filterDiv.appendChild(outdoorFieldLabel);

  const bothCheckbox = document.createElement('input');
  bothCheckbox.setAttribute('type', 'checkbox');
  bothCheckbox.setAttribute('id', 'cb-other-2');
  const bothFieldLabel = document.createElement('label');
  bothFieldLabel.setAttribute('id', 'label-other-2');
  bothFieldLabel.innerText = 'Both';
  bothCheckbox.addEventListener('change', () => filterFieldsByOthers(2));
  if (!paramExists('indoor', params, '0') && !paramExists('indoor', params, '1')) {
    bothCheckbox.checked = true;
  }
  filterDiv.appendChild(bothCheckbox);
  filterDiv.appendChild(bothFieldLabel);
}

function filterFieldsByWage(filterDiv) {
  const pattern = /^[1-9]+[0-9]*(\.[0-9])*[0-9]*$/;
  const url = new URL(window.location.href);
  const params = url.searchParams;
  const inputValue = document.getElementById('wage-input').value;

  if (!pattern.test(inputValue)) {
    const noMatchSpan = document.createElement('span');
    noMatchSpan.setAttribute('id', 'wage-span');
    noMatchSpan.innerText = 'Incorrect syntax.';
    filterDiv.appendChild(noMatchSpan);
  } else {
    params.delete('name');
    params.delete('sortBy');
    params.delete('sortMode');
    params.delete('wage');
    params.append('wage', inputValue);
    params.delete('page');
    params.append('page', 0);
    url.search = params.toString();
    const newUrl = url.toString();
    window.location = newUrl;
  }
}

function showWages() {
  const url = new URL(window.location.href);
  const params = url.searchParams;
  const filterDiv = document.getElementById('filter-elements-div');
  clearDiv(filterDiv);

  const wageLabel = document.createElement('label');
  wageLabel.setAttribute('id', 'wage-label');
  wageLabel.innerText = 'ADD LIMIT';
  const wageInput = document.createElement('input');
  wageInput.setAttribute('id', 'wage-input');
  wageInput.setAttribute('type', 'text');
  wageInput.setAttribute('class', 'text-input');
  wageInput.setAttribute('pattern', '^[1-9]+[0-9]*(.[0-9])*[0-9]*$');
  const wageButton = document.createElement('button');
  wageButton.setAttribute('id', 'wage-btn');
  wageButton.innerText = 'SEARCH';
  wageButton.addEventListener('click', () => filterFieldsByWage(filterDiv));
  filterDiv.appendChild(wageLabel);
  filterDiv.appendChild(wageInput);
  filterDiv.appendChild(wageButton);
  if (params.get('wage')) {
    const clearButton = document.createElement('button');
    clearButton.setAttribute('id', 'clear-filter-btn');
    clearButton.innerText = 'CLEAR FILTER';
    clearButton.addEventListener('click', () => {
      params.delete('wage');
      url.search = params.toString();
      const newUrl = url.toString();
      window.location = newUrl;
    });
    filterDiv.appendChild(clearButton);
  }
}

document.body.onload = () => {
  document.getElementById('search-btn').onclick = () => {
    const inputText = document.getElementById('fieldname-input').value;
    if (inputText !== '') {
      window.location = `sportfields.html?name=${inputText}&page=0`;
    }
  };

  document.getElementById('asc-btn').onclick = () => {
    const sortKey = document.getElementById('sort-fields-select').value;
    window.location = `sportfields.html?sortBy=${sortKey}&sortMode=a&page=0`;
  };

  document.getElementById('desc-btn').onclick = () => {
    const sortKey = document.getElementById('sort-fields-select').value;
    window.location = `sportfields.html?sortBy=${sortKey}&sortMode=d&page=0`;
  };

  document.getElementById('filter-btn').onclick = () => {
    const filterBy = document.getElementById('filter-field-select').value;
    if (filterBy === 'all') {
      window.location = 'sportfields.html';
    }
    if (filterBy === 'type') {
      showTypes();
    }
    if (filterBy === 'wage') {
      showWages();
    }
    if (filterBy === 'others') {
      showOtherInformation();
    }
  };
  addPaging();
};
