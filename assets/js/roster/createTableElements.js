import createModalElements from './createModalElements.js';

function createTableElements(response) {


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
    val === 'Image' || val === 'Bio' || val === 'Intended Major' || val === 'High School Coach' || val === 'Parents' || val === 'Siblings' ? th.classList.add('none') // Add DataTable's 'all' & 'none' classes.
    : val === 'Jersey' || val === 'player' ? th.classList.add('all') // Add DataTable's 'all' & 'none' classes.
    : null;
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

  function createBodyRow(tbody, data, id) {
    const tr = document.createElement('tr');
    tbody.appendChild(tr);
    //const rowData = tableData[i];
    //const targetModalId = data[2];
    //console.log('targetModalId = ' + targetModalId);
    for (var i = 0; i < data.length; i++) {
      createCells(tr, data[i], id);
    }
    return tr;
  }

  function createCells(tr, val, id) {
    const td = document.createElement('td');
    tr.appendChild(td);
    td.innerHTML = val;
    return td;
  }


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

  //
  //
  createModalElements(response);
  //
  //

  //console.log(tableData);
  createHeadingRow(thead, headingData);

  for (let i = 0; i < tableData.length; i++) {
    let rowData = tableData[i];
    //console.log(headingData[i]);
    let name = rowData[2];
    let id = name.replace(/[\W_]+/g, '');
    let targetModalId = id + 'Modal';
    //console.log('targetModalId = ' + targetModalId);
    rowData[2] = '<button type="button" class="btn btn-link buttons__roster--name" data-toggle="modal" data-target="#' + targetModalId + '" >' + name + '</button>';
    createBodyRow(tbody, tableData[i], id);
  }
}
export default createTableElements;
