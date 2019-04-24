function parseSheet(json, parent) {
  let spData = json.feed.entry;
  //console.log(spData);
  let data = spData;
  const table = drawTable(parent);
  const thead = drawHead(table);
  const tbody = drawBody(table);
  let rowData = [];

  for(var r=0; r<data.length; r++) {
    var cell = data[r]['gs$cell'];
    var val = cell['$t'];
    var a = document.createElement('a');
    var modalHref;
    if ( val == '#NA!' ) {
      val = ' ';
    }
    if ( cell.col == 3 && val !== 'Player' ) {
      modalHref = '#' + val.replace(/[\W_]+/g, '');
      a.setAttribute('href', modalHref);
      a.setAttribute('data-toggle', 'modal');
      a.append(val);
      rowData.push(a);
    }
    if ( cell.row == 2 ) {
      if ( cell.col == 1 ) {
        drawHeadRow(thead, rowData);
        rowData = [];
      }
    } else {
      if ( cell.col == 1 ) {
        drawBodyRow(tbody, rowData);
        rowData = [];
      }
    }
    if ( cell.col != 3 ) {
      rowData.push(val);
    }
    if ( cell.row == 1 && cell.col == 3 ) {
      rowData.push(val);
    }
  }
  drawBodyRow(tbody, rowData);
}
function drawCell(tr, val) {
  var td = document.createElement('td');
  tr.append(td);
  td.append(val);
  return td;
}
function drawTh(tr, val) {
  var th = document.createElement('th');
  var classes;
  var hideBio;
  if ( val == 'Intended Major' || val == 'High School Coach' || val == 'Parents' || val == 'Siblings' || val == 'Bio' ) {
    classes = 'never';
  }
  th.classList.add(classes);
  tr.append(th);
  th.append(val);
  return th;
}
function drawHeadRow(thead, rowData) {
  if (rowData == null) return null;
  if (rowData.length == 0) return null;
  var tr = document.createElement('tr');
  thead.append(tr);
  for(var c=0; c<rowData.length; c++) {
    drawTh(tr, rowData[c]);
  }
  return tr;
}
function drawBodyRow(tbody, rowData) {
  if (rowData == null) return null;
  if (rowData.length == 0) return null;
  var tr = document.createElement('tr');
  tbody.append(tr);
  for(var c=0; c<rowData.length; c++) {
    drawCell(tr, rowData[c]);
  }
  return tr;
}
function drawTable(parent) {
  var table = document.createElement('table');
  table.classList.add('display', 'table', 'table-striped', 'table-hover');
  table.setAttribute('width', '100%');
  table.setAttribute('id', 'responsiveTable');
  parent.append(table);
  return table;
}
function drawHead(table) {
  var thead = document.createElement('thead');
  table.append(thead);
  return thead;
}
function drawBody(table) {
  var tbody = document.createElement('tbody');
  table.append(tbody);
  return tbody;
}
module.exports = parseSheet;
