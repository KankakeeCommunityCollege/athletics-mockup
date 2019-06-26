function createTableElements(response) {
  //console.log(response);
  const monthNames = [ // Define an array of the months to convert JS # value of month into short text version
    'Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'
  ];
  var winCount = 0;
  var lossCount = 0;
  var tieCount;
  var tieCountValue = 0;

  const parent = document.getElementById('data');
  const table = createTableElement(parent);
  const thead = createTableHeadingElement(table);
  const tbody = createTableBodyElement(table);
  // Handle the results here (response.result has the parsed body).
  //console.log("Response", response.result);
  let sheetData = response.result.values;
  let arrayLength = sheetData.length;
  let headingData = sheetData[0];
  let tableData = sheetData.slice(1, arrayLength); // is an array of arrays

  headingData[9] = 'Record';

  createHeadingRow(thead, headingData);

  for (let i = 0; i < tableData.length; i++) { // Iterates over the spreadsheets rows
    let rowData = tableData[i];
    //console.log(headingData[i]);
    let start = rowData[0];
    let end = rowData[1];
    let endDate = '';

    function formatDate(date) {
      let dateArray = date.split(/\//);
      console.log(dateArray);
      let day = dateArray[1];
      let monthNumber = dateArray[0] - 1;
      let month = monthNames[ monthNumber ];
      let formatedDate = month + ' ' + day;
      return formatedDate;
    }
    end ? endDate = ' - ' + formatDate(end)
    : null;
    rowData[0] = formatDate(start) + endDate;

    createBodyRow(tbody, tableData[i]);
    //console.log(end);
  }

  function createTableElement(parent) {
    const table = document.createElement('table');
    table.classList.add('display', 'table', 'table-striped', 'table-hover');
    table.setAttribute('width', '100%');
    table.setAttribute('id', 'responsiveTable');
    parent.innerHTML = '';
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

  function createCells(tr, val) {
    const td = document.createElement('td');
    tr.appendChild(td);
    td.innerHTML = val;
    return td;
  }

  function createDateCells(tr, val, location) {
    const td = document.createElement('td');
    const red = '#c61f48';
    const blue = '#0f3b63';
    const gameIsAtHome = location.trim() == 'Home';
    let color;
    tr.appendChild(td);
    gameIsAtHome ? color = red
    : color = blue;
    td.setAttribute('align', 'center');
    td.style.cssText = 'color:#ffffff;background-color:' + color + ';'
    td.innerHTML = val;
    return td;
  }

  function createBodyRow(tbody, data) {
    const tr = document.createElement('tr');
    let record;
    let status = data[6].trim();
    console.log(status);
    status == 'W' ? winCount += 1
    : status == 'L' ? lossCount += 1
    : status == 'T' ? tieCountValue += 1
    : null;

    tieCountValue === 0 ? tieCount = ''
    : tieCount = ' - ' + tieCountValue;

    status == '' ? record = '' : record = winCount + ' - ' + lossCount + tieCount;
    //console.log('RECORD = ' + record);

    data[9] = record;

    tbody.appendChild(tr);
    for (var i = 0; i < data.length; i++) {
      let location = data[5];

      data[i] === data[0] ? createDateCells(tr, data[i], location)
      : createCells(tr, data[i]);

    }
    return tr;
  }


}
export default createTableElements;
