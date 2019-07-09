function addColSpan(tr, td, val, reg, span) {
  val = val.replace(reg, '');
  td.setAttribute('colspan', span);
  tr.appendChild(td);
  td.innerHTML = val;
  return td;
}

function appendRow(tr, td, val) {
  tr.appendChild(td);
  td.innerHTML = val;
  return td;
}

function testColSpanAmount(tr, td, val) {
  const colSpanTest = {
    '^\\*\\*\\s': '2',
    '^\\*\\*\\*\\s': '3',
    '^\\*\\*\\*\\*\\s': '4',
    '^\\*\\*\\*\\*\\*\\s': '5'
  };
  for (var test in colSpanTest) {
    if (colSpanTest.hasOwnProperty(test)) {
      let reg = new RegExp(test, 'g');
      let matchIsTrue = reg.test(val);
      matchIsTrue ?
        addColSpan(tr, td, val, reg, colSpanTest[test])
      : null;
    }
  }
  return td;
}

function createCells(tr, val) {
  const colSpanRegExp = /^\*\*.+/g;
  const valTest = val.search(colSpanRegExp);
  const valContainsColSpan = valTest != -1;
  const td = document.createElement('td');
  valContainsColSpan ?
    testColSpanAmount(tr, td, val)
  : appendRow(tr, td, val);
  return td;
}

function createTableRow(data, table) {
  const tr = document.createElement('tr');
  table.appendChild(tr);
  for (var i = 0; i < data.length; i++) {
    createCells(tr, data[i]);
  }
  return table;
}

function createTableElement(parent) {
  const table = document.createElement('table');
  table.classList.add('table', 'table-striped', 'table-hover');
  table.setAttribute('width', '100%');
  table.setAttribute('id', 'responsiveTable');
  parent.appendChild(table);
  return table;
}

function createTabTable(parent, tableData, tabName) {
  //console.log(parent);
  const table = createTableElement(parent);
  //console.log(table);
  for (let i = 0; i < tableData.length; i++) {
    let rowData = tableData[i];
    const tr = createTableRow(rowData, table);
    //createBodyRow(tbody, tableData[i], id);
  }
  //console.log(parent);
  return parent;
}
export default createTabTable;
