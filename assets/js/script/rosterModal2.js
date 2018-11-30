var spData = null; // Set to null in-case the data is not there
function doData(json) { // There's a callback on this function ( 'https://...&callback=doData' ) the end of the spreadsheet URL inside a script tag in the page
  spData = json.feed.entry; // Set it to the json feed of the sheet
}
function drawWSpan(div) {
  var wspan = document.createElement('span');
  div.append(wspan);
  return wspan;
}
function drawCatSpan(wspan, val) {
  var span = document.createElement('span'); // Create an empty <td></td> element
  span.classList.add('roster__modal--category');
  wspan.append(span);
  span.append(val);
  return span;
}
function drawValSpan(wspan, val) {
  var span = document.createElement('span'); // Create an empty <td></td> element
  span.classList.add('roster__modal--value');
  wspan.append(span);
  span.append(val);
  return span;
}
function drawBodyRow(mbody, mData) {
  if (mData == null) return null;
  if (mData.length == 0) return null;
  var span = document.createElement('span');
  mbody.append(span);
  for(var c=0; c<mData.length; c++) {
    drawSpan(span, mData[c]);
  }
  return tr;
}
function drawDiv(parent) {
  var div = document.createElement('div');
  div.classList.add('modal-body');
  parent.append(div);
  return div;
}
function readData(parent) {
  var data = spData;
  var div = drawDiv(parent);
  var wspan = drawWSpan(div);
  var mData = [];
  var hData = [];

  for(var r=0; r<data.length; r++) {
    var cell = data[r]["gs$cell"];
    var val = cell["$t"];

    if ( cell.row == 2 ) {
      if ( cell.col == 1 ) {
        drawCatSpan(wspan, hData);
        hData = [];
      }
    } else {
      if ( cell.col == 1 ) {
        drawBodyRow(tbody, mData);
        mData = [];
      }
    }
  }
  drawBodyRow(tbody, mData);
}


document.addEventListener('DOMContentLoaded', function() {
  //var deferDataTables = $.Deferred();
  function fun() {
    readData(document.getElementById('data'));
    var th = document.querySelectorAll('th');
    th.forEach(function(element) {
      if ( element.innerHTML == 'Jersey' || element.innerHTML == 'Player' || element.innerHTML == 'Position' ) {
        element.classList.add('all');
      } else if ( element.innerHTML == 'Class' ) {
        element.classList.add('min-tablet-l');
      } else if ( element.innerHTML == 'Hometown' || element.innerHTML == 'High School' || element.innerHTML == 'Height' || element.innerHTML == 'Weight' ) {
        element.classList.add('desktop');
      } else if ( element.innerHTML == 'High School Coach' || element.innerHTML == 'Parents' || element.innerHTML == 'Siblings' || element.innerHTML == 'Intended Major' ) {
        element.classList.add('none');
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
