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
function drawTh(tr, val) {
  var th = document.createElement('th'); // Create an empty <td></td> element
  var classes;
  if ( val == 'Intended Major' || val == 'High School Coach' || val == 'Parents' || val == 'Siblings' || val == 'Bio' ) {
    classes = 'none';
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
  table.classList.add('display');
  table.classList.add('table');
  table.classList.add('table-striped');
  table.classList.add('table-hover');
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


document.addEventListener('DOMContentLoaded', function() {
  //var deferDataTables = $.Deferred();
  function fun() {

    readData(document.getElementById('data'));
    function dataTablesGo() {
      var deferSearch = $.Deferred();
      $.when(deferSearch).done(function() {
        $('input[type="search"].form-control').attr('placeholder', 'Search Roster...');
      });
      function addData() {
        $('#responsiveTable').DataTable( {
          responsive: true, // Activate responsive powers GO!
          paging: false, // Don't paginate. Schedule schould all be on one page
          'order': [], // Initial column ordering
          'columnDefs': [
            { 'visible': false, 'targets': 0 }
          ]
        } );
        deferSearch.resolve();
      }
      addData();
    }
    dataTablesGo();
  }
  function toRosterOrNotToRosterThatIsTheQuestion() {
    var currentUrl = window.location.href,  // Defin currentUrl as the user's current browser URL
      noProto = currentUrl.replace(/(^\w+:|^)\/\//, '');  // Remove the http(s):// protocol from that URL
    if ( noProto.indexOf('/roster') > -1 ) {
      fun();
    }
  }
  toRosterOrNotToRosterThatIsTheQuestion();
});

// Source: https://github.com/jserz/js_piece/blob/master/DOM/ParentNode/append()/append().md
(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('append')) {
      return;
    }
    Object.defineProperty(item, 'append', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function append() {
        var argArr = Array.prototype.slice.call(arguments),
          docFrag = document.createDocumentFragment();

        argArr.forEach(function (argItem) {
          var isNode = argItem instanceof Node;
          docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
        });

        this.appendChild(docFrag);
      }
    });
  });
})([Element.prototype, Document.prototype, DocumentFragment.prototype]);
