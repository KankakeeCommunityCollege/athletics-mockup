// Polluting the global variables
var deferSpreadsheetTable = $.Deferred();
var deferSearchForm = $.Deferred();
var deferPopovers = $.Deferred();
 $.when(deferSpreadsheetTable).done(function() {
  $('#Data').DataTable( {
    responsive: true,
    paging: false,
    'order': []
  } );
  deferSearchForm.resolve();
});
 $.when(deferSearchForm).done(function() {
  $('input[aria-controls="Data"]').attr('placeholder', 'Search Schedule...');
  deferPopovers.resolve();
});
 $.when(deferPopovers).done(function() {
  $('[data-toggle="popover"]').popover();
});
 function spreadsheetTable() {
   var currentUrl = window.location.href;
  // Remove the http(s):// protocol
  var noProto = currentUrl.replace(/(^\w+:|^)\/\//, '');
   var spreadsheetID = '1TiSs5L7Ta3hBWXjUcgQlNn_JAXF6N5jEmleiAlAmSvw';
  var sheetNumber;
  if ( noProto.indexOf('baseball/schedule') > -1 ) {
    sheetNumber = 1;
  } else if ( noProto.indexOf('mens-basketball/schedule') > -1 ) {
    sheetNumber = 2;
  } else if ( noProto.indexOf('womens-basketball/schedule') > -1 ) {
    sheetNumber = 3;
  }
   // Make sure it is public or set to Anyone with link can view
  var url = 'https://spreadsheets.google.com/feeds/list/' + spreadsheetID + '/' + sheetNumber + '/public/values?alt=json';
   // make JSON call to Google Data API
  $.getJSON(url, function(data) {
     // set global html variable
    var html = '';
     // build table headings
    html += '<table id="Data" class="display table table-striped table-hover" style="width:100%">';
    html += '<thead>';
    html += '<tr>';
    html += '<th class="all">Date</th>';
    html += '<th class="all">Opponent</th>';
    html += '<th class="all">Time</th>';
    // html += '<th class="min-tablet-l">Category:</th>';
    html += '<th class="all">Where</th>';
    html += '<th class="all">Status</th>';
    html += '<th class="all">Summary</th>';
    html += '</tr>';
    html += '</thead>';
    html += '<tbody>';
     // loop to build html output for each row
    var entry = data.feed.entry;
     /**
          ** Change to descending order
          ** for (var i = entry.length - 1; i >= 0; i -= 1) {
           */
    for (var i = 0; i < entry.length; i++) {
      var color,
        red = '#c61f48',
        blue = '#0f3b63';
      if ( entry[i]['gsx$where']['$t'] == 'Home' ) {
        color = red;
      } else {
        color = blue;
      }
      html += '<tr>';
      html += '<td class="mx-auto" style="vertical-align:top;background-color:' + color + ';color:#ffffff;">' + entry[i]['gsx$date']['$t'] + '</td>';
      html += '<td align="left">' + entry[i]['gsx$opponent']['$t'] + '</td>';
      html += '<td>' + entry[i]['gsx$time']['$t'] + '</td>';
      // html += '<td>' + entry[i]['gsx$category']['$t'] + '</td>';
      html += '<td align="left">' + entry[i]['gsx$where']['$t'] + '</td>';
      html += '<td>' + entry[i]['gsx$status']['$t'] + '</td>';
      html += '<td>' + entry[i]['gsx$summary']['$t'] + '</td>';
      //html += '<td><button type="button" class="btn btn-lg btn-danger" data-toggle="popover" title="Other Special Requirements" data-content="' + entry[i]['gsx$otherspecialrequirements']['$t'] + '">Special Requirements</button></td>';
       html += '</tr>';
    }
    html += '</tbody>';
    html += '</table>';
     // output html
    $('#theTable').html(html);
    deferSpreadsheetTable.resolve();
  });
}
spreadsheetTable();
