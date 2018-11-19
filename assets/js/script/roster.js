document.addEventListener('DOMContentLoaded', function() {
  // Define some deferred variables of things to do later.
  var deferSpreadsheetTable = $.Deferred(),
    deferSearchForm = $.Deferred();
  var currentUrl = window.location.href,  // Defin currentUrl as the user's current browser URL
    noProto = currentUrl.replace(/(^\w+:|^)\/\//, ''),  // Remove the http(s):// protocol from that URL
    url = setSheetUrl(url);  // Define the variable url as: the function setSheetUrl() and passing the variable url through it.
    console.log(noProto);
  // Once deferSpreadsheetTable is resolved, do this function:
  $.when(deferSpreadsheetTable).done(function() {
    // Unleash the DataTables JS library for functional/sortable tables:
    // (found at datatables.net)
    $('#Data').DataTable( {
      responsive: true, // Activate responsive powers GO!
      paging: false, // Don't paginate. Schedule schould all be on one page
      'order': [] // Initial column ordering
    } );
    deferSearchForm.resolve();  // Resolve the deferSearchForm deferrement
  });
  // Once deferSearchForm is resolved, do this function:
  $.when(deferSearchForm).done(function() {
    $('input[aria-controls="Data"]').attr('placeholder', 'Search Roster...');  // Set the dataTable's search field placeholder as "Search Schedule"
  });
  // Function to set the url of the Google Sheet to use:
  function setSheetUrl(urlString) { // Pass the variable 'urlString' through
    var spreadsheetID = '14pczY6IjNEy3zdqyNRhCZFLfWLEP4Uv3EGwIp7uXrLo';  // ID of the Google Sheets Spreadsheet
    // Sheet # within the Spreadsheet
    // (Sheet # corresponds to the order of the sheets as they appear in Google--the left-most sheet being # '1')
    var sheetNumber; // Defined as an empty variable
    // Set the sheet # based on which page the user is on:
    if ( noProto.indexOf('/baseball') > -1 ) {
      sheetNumber = 1;  // If on Baseball Schedule page set to '1'
    } else if ( noProto.indexOf('/mens-basketball') > -1 ) {
      sheetNumber = 2;  // If on Men's Basketball Schedule page set to '2'
    } else if ( noProto.indexOf('/soccer') > -1 ) {
      sheetNumber = 3;  // If on Women's Basketball Schedule page set to '3'
    } else if ( noProto.indexOf('/womens-basketball') > -1 ) {
      sheetNumber = 4;  // If on Women's Basketball Schedule page set to '3'
    } else if ( noProto.indexOf('/softball') > -1 ) {
      sheetNumber = 5;  // If on Women's Basketball Schedule page set to '3'
    } else if ( noProto.indexOf('/volleyball') > -1 ) {
      sheetNumber = 6;  // If on Women's Basketball Schedule page set to '3'
    }
    // Make sure the Google Sheet is public or set to Anyone with link can view
    // Go to File > Publish
    urlString = 'https://spreadsheets.google.com/feeds/list/' + spreadsheetID + '/' + sheetNumber + '/public/values?alt=json'; // build the url
    return urlString; // Kick-out the urlString variable as the URL to the appropriate Sheet.
  }
  //console.log(url);
  // A function to build-out the HTML for the table...
  // pulling from the URL of the appropriate Google Sheet:
  function rosterTable() {
    $.getJSON(url, function(data) {  // make JSON call to Google Data API
      var html = '';  // set html variable as empty string:
      // Funcrion to build the static table head:
      function buildTableHead() {
        html += '<table id="Data" class="display table table-striped table-hover" style="width:100%">';
        html += '<thead>';
        html += '<tr>';
        html += '<th class="all">Jersey</th>'; // Invisible 'Sort' column
        html += '<th class="all">Player</th>'; // Display on all devices
        html += '<th class="min-tablet-l">Position</th>'; // Display on large tablets and up
        html += '<th class="desktop">Height</th>'; // Display on all devices
        html += '<th class="desktop">Weight</th>'; // Display on all devices
        html += '<th class="desktop">Class</th>'; // Display on desktop and large devices only
        html += '<th class="all">Hometown</th>'; // Display on desktop and large devices only
        html += '</tr>';
        html += '</thead>';
        html += '<tbody>';
      }
      buildTableHead();
      // loop to build html output for each row (build the data into the table)
      var entry = data.feed.entry;  // Define 'entry' var from Google Sheet
      entry.forEach(function(entry) { // Run a 'forEach()' loop on the entrys:
        // Function to wrap the incoming data in HTML table markup:
        function buildTableRows() {
          var nameId = entry['gsx$player']['$t'].replace(/\W/g, '').toLowerCase();
          html += '<tr>';  // Begin the row
          html += '<td align="middle">' + entry['gsx$jersey']['$t'] + '</td>';  // Opponent Column
          html += '<td><a class="roster__link" href="#' + nameId + '" data-toggle="modal">' + entry['gsx$player']['$t'] + '</a></td>'; // Date Column: gets the appropriate background color and an end-date tacked-on if it exists.
          html += '<td>' + entry['gsx$position']['$t'] + '</td>';  // Opponent Column
          html += '<td>' + entry['gsx$height']['$t'] + '</td>';  // Time  Column: If there is a timezone other than CST, add the timezone in parenthesis
          html += '<td>' + entry['gsx$weight']['$t'] + '</td>';  // Where Column
          html += '<td>' + entry['gsx$class']['$t'] + '</td>';  // Status Column
          html += '<td>' + entry['gsx$hometown']['$t'] + '</td>';  // Summary Column
          html += '</tr>'; // End the row
        }
        buildTableRows();
      });  // End of forEach loop
      // Tack on the closing table tags
      html += '</tbody>';
      html += '</table>';
      // output the html:
      $('.the-table').html(html);  // Inject the var 'html' into div w/ id="theTable".  (Var 'html' = string of text that makes up the table markup)
      deferSpreadsheetTable.resolve();  // Resolve the deferSpreadsheetTable deferrement
    });
  }

  function modals() {
    $.getJSON(url, function(data) {  // make JSON call to Google Data API
      var html = '';  // set html variable as empty string:
      // loop to build html output for each row (build the data into the table)
      var entry = data.feed.entry;  // Define 'entry' var from Google Sheet
      entry.forEach(function(entry) { // Run a 'forEach()' loop on the entrys:
        // Function to wrap the incoming data in HTML table markup:
        function buildTableRows() {
          var nameId = entry['gsx$player']['$t'].replace(/\W/g, '').toLowerCase();
          html += '<div class="modal fade" id="' + nameId + '" tabindex="-1" role="dialog" aria-labelledby="' + nameId + '" aria-hidden="true"><div class="modal-dialog modal-dialog-centered" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalCenterTitle">' + entry['gsx$player']['$t'] + '</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body mx-auto mx-sm-0">';
          html += '<img class="img-fluid float-none float-sm-left roster__img" src="../../uploads/roster-img/' + entry['gsx$image']['$t'] + '.jpg">';
          html += '<p><strong>Name: </strong>' + entry['gsx$player']['$t'] + '<br>';
          html += '<strong>Class: </strong>' + entry['gsx$class']['$t'] + '<br>';
          html += '<strong>Height: </strong>' + entry['gsx$height']['$t'] + '<br>';
          html += '<strong>Weight: </strong>' + entry['gsx$weight']['$t'] + '<br>';
          html += '<strong>Hometown: </strong>' + entry['gsx$hometown']['$t'] + '<br>';
          html += '<strong>High School: </strong>' + entry['gsx$highschool']['$t'] + '</p>';
          html += '</div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div>';  // Begin the row
        }
        buildTableRows();
      });  // End of forEach loop
      // Tack on the closing table tags
      // output the html:
      $('.modal-div').html(html);  // Inject the var 'html' into div w/ id="theTable".  (Var 'html' = string of text that makes up the table markup)
    });
  }

  //  A function that fires the spreadsheetTable() function IF the user is on a schedule page and fires the sliderSchedule() function if the user is on a sport's landing page:
  function checkPageLocation() {
    if ( noProto.indexOf('/roster') > -1 ) {  // If user's current URL contains '/schedule' in it, do:
      rosterTable();  // Go-go gadget spreadsheetTable()!
    }
  }
  checkPageLocation();  // Fire the nuclear missiles!
  modals();
});
