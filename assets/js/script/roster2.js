var spData = null; // Set to null in-case the data is not there
function doData(json) { // There's a callback on this function ( 'https://...&callback=doData' ) the end of the spreadsheet URL inside a script tag in the page
  spData = json.feed.entry; // Set it to the json feed of the sheet
}

function drawCell(tr, val) {
  var td = document.createElement('td'); // Create an empty <td></td> element
  tr.append(td);
  td.append(val);
  return td;
}
//function drawLinkCell(tr, val) {
  //var td = document.createElement('td'); // Create an empty <td></td> element
  //var a = document.createElement('a');
  //var modalLink = val.replace(/[\W_]+/g, '');
  //a.setAttribute('href', modalLink);
  //tr.append(td);
  //td.append(a);
  //a.append(val);
  //return td;
//}
function drawTh(tr, val) {
  var th = document.createElement('th'); // Create an empty <td></td> element
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
  var table = document.createElement("table");
  table.classList.add('display', 'table', 'table-striped', 'table-hover');
  table.setAttribute('id', 'responsiveTable');
  table.setAttribute('width', '100%');
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

function readData(parent) {
  var data = spData;
  var table = drawTable(parent);
  var thead = drawHead(table);
  var tbody = drawBody(table);
  var rowData = [];

  for(var r=0; r<data.length; r++) {
    var cell = data[r]["gs$cell"];
    var val = cell["$t"];
    var a = document.createElement('a');
    var modalHref;
    if ( cell.col == 3 && val !== 'Player' ) {
      modalHref = '#' + val.replace(/[\W_]+/g, '');
      a.setAttribute('href', modalHref);
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

// Create Modals Dynamically:
// ==========================
function drawSpan(div, val) {
  var span = document.createElement('span'); // Create an empty <span></span> element
  div.append(span);
  span.append(val);
  return span;
}

function drawMBody(mBody, mData) {
  if (mData == null) return null;
  if (mData.length == 0) return null;
  var div = document.createElement('div');
  div.classList.add('modal-body');
  mBody.append(div);
  for(var s=0; s<mData.length; s++) {
    drawSpan(div, mData[s]);
  }
  return div;
}

function drawModalWrap(parent) {
  var htmlObject = {};
  var modalConfig = [
    {name: 'modalWrap', element: 'div', class: ['modal', 'fade'], attribute: {id: '', tabindex: '-1', role: 'dialog', 'aria-labelledby': '', 'aria-hidden': 'true'} },
    {name: 'modalDialog', element: 'div', class: ['modal-dialog', 'modal-dialog-centered'], attribute: {role: 'document'}},
    {name: 'modalContent', element: 'div', class: 'modal-content'},
    {name: 'modalHeader', element: 'div', class: 'modal-header'},
    {name: 'modalTitle', element: 'h5', class: 'close', attribute: {type: 'button', 'data-dismiss': 'modal', 'aria-label': 'Close'}},
    {name: 'modalClose', element: 'button', class: 'close', attribute: {'data-dismiss': 'modal', 'aria-label': 'Close'}},
    {name: 'modalX', element: 'span', attribute: {'aria-hidden': 'true'}},
    {name: 'modalFooter', element: 'div', class: 'modal-footer'},
    {name: 'footerClose', element: 'button', class: ['btn', 'btn-secondary'], attribute: {type: 'button'}}
  ];
  var mapElements = modalConfig.map(obj =>{
    var bsClass = obj.class;
    var element = obj.element;
    var attributes = obj.attribute;
    var htmlElements = document.createElement(element);
    htmlElements.classList.add(bsClass);
    for ( var key in attributes ) {
      htmlElements.setAttribute(key, attributes[key]);
    }
    htmlObject[obj.name] = htmlElements;
    console.log(htmlElements);
    return htmlElements;
  });
  htmlObject.push(htmlElements);
  console.log(htmlObjet);
}
function readMData(parent) {
  var data = spData;
  //var table = drawTable(parent);
  //var thead = drawHead(table);
  //var tbody = drawBody(table);
  var modalWrap = drawModalWrap(parent);
  var mBody = drawMBody(modalWrap);
  var mData = [];
  //var rowData = [];

  for(var x=0; x<data.length; x++) {
    var span = data[x]["gs$cell"];
    var val = span["$t"];
    //var mId;
    //if ( span.col == 1 ) {
      //mId = val.replace(/[\W_]+/g, '');
      //mData.push()
    //}
    if ( span.col == 1 ) {
      drawMBody(mBody, mData);
      mData = [];
    }
    mData.push(val);
  }
}


document.addEventListener('DOMContentLoaded', function() {
  //var deferDataTables = $.Deferred();
  readData(document.getElementById('data'));
  readMData(document.getElementById('modalDiv'))
  var th = document.querySelectorAll('th');
  th.forEach(function(element) {
    if ( element.innerHTML == 'Jersey' || element.innerHTML == 'Player' || element.innerHTML == 'Position' ) {
      element.classList.add('all');
    } else if ( element.innerHTML == 'Class' ) {
      element.classList.add('min-tablet-l');
    } else if ( element.innerHTML == 'Hometown' || element.innerHTML == 'High School' || element.innerHTML == 'Height' || element.innerHTML == 'Weight' ) {
      element.classList.add('desktop');
    }
  });
  $('#responsiveTable').DataTable( {
    responsive: true, // Activate responsive powers GO!
    paging: false, // Don't paginate. Schedule schould all be on one page
    'order': [], // Initial column ordering
    'columnDefs': [
      { 'visible': false, 'targets': 0 }
    ]
  } );
});
