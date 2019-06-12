function createTableParts(response, resolve) {
  const parent = document.getElementById('Data');
  const table = createTableElement(parent);
  const thead = createTableHeadingElement(table);
  const tbody = createTableBodyElement(table);
  // Handle the results here (response.result has the parsed body).
  //console.log("Response", response.result);
  let sheetData = response.result.values;
  let arrayLength = sheetData.length;
  let headingData = sheetData[0];
  let tableData = sheetData.slice(1, arrayLength); // is an array of arrays
  //console.log(tableData);
  createHeadingRow(thead, headingData);

  for (let i = 0; i < tableData.length; i++) {
    createBodyRow(tbody, tableData[i]);
  }

  function createTableElement(parent) {
    const table = document.createElement('table');
    table.classList.add('display', 'table', 'table-striped', 'table-hover');
    table.setAttribute('width', '100%');
    table.setAttribute('id', 'responsiveTable');
    parent.appendChild(table);
    return table;
  }

  function createTableHeadingElement(table) {
    const thead = document.createElement('thead');
    table.appendChild(thead);
    return thead;
  }

  function createTableBodyElement(table) {
    const tbody = document.createElement('tbody');
    table.appendChild(tbody);
    return tbody;
  }

  function createHeadingCells(tr, val) {
    const th = document.createElement('th');
    let classes;
    if (val == 'Description' || val == 'Followup') {
      classes = 'none';
      th.classList.add(classes);
    }
    if (val == 'TargetX Link') {
      val = 'Link';
      //th.appendChild('<i class="material-icons positioning__align-btm">link</i>&nbsp;');
    } else if (val == 'Date') {
      val = '<i class="material-icons positioning__align-btm">calendar_today</i>&nbsp;' + val;
    } else if (val == 'Start' || val == 'End') {
      val = '<i class="material-icons positioning__align-btm">access_time</i>&nbsp;' + val;
    }

    tr.appendChild(th);
    val = val + ':';
    th.innerHTML = val;
    return th;
  }

  function createHeadingRow(thead, data) {
    const tr = document.createElement('tr');
    thead.appendChild(tr);
    for (var i = 0; i < data.length; i++) {
      createHeadingCells(tr, data[i]);
    }
    return tr;
  }

  function createBodyRow(tbody, data) {
    const tr = document.createElement('tr');
    tbody.appendChild(tr);
    for (var i = 0; i < data.length; i++) {
      createCells(tr, data[i]);
    }
    return tr;
  }

  function createCells(tr, val) {
    const td = document.createElement('td');
    const isTargetXLink = /http:\/\/kcc\.force\.com\/events\//g;
    tr.appendChild(td);
    val.match(isTargetXLink) ? val = '<a class="btn btn-primary" target="_blank" rel="noopener norefferer" href="' + val + '">Select</a>' : null;
    td.innerHTML = val;
    return td;
  }
}

export default createTableParts;
