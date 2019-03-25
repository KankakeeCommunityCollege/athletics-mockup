document.addEventListener('DOMContentLoaded', function() {
  // Define some deferred variables of things to do later.
  var deferSpreadsheetTable = $.Deferred(),
    deferSearchForm = $.Deferred();
  var currentUrl = window.location.href,  // Defin currentUrl as the user's current browser URL
    noProto = currentUrl.replace(/(^\w+:|^)\/\//, ''),  // Remove the http(s):// protocol from that URL
    url = setSheetUrl(url);  // Define the variable url as: the function setSheetUrl() and passing the variable url through it.
    //console.log(noProto);
  var monthNames = [ // Define an array of the months to convert JS # value of month into short text version
    'Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'
  ];
  const host = window.location.host + '/';
  // Once deferSpreadsheetTable is resolved, do this function:
  $.when(deferSpreadsheetTable).done(function() {
    // Unleash the DataTables JS library for functional/sortable tables:
    // (found at datatables.net)
    $('#Data').DataTable( {
      responsive: true, // Activate responsive powers GO!
      paging: false, // Don't paginate. Schedule schould all be on one page
      'order': [], // Initial column ordering
      'columnDefs': [ // Some column definitions:
        { 'orderData':[0], 'targets': [1] }, // Set the Date column's order data as the first column
        {
          'targets': [0],
          'visible': false, // Make the first column hidden
          'searchable': false // Exclude the first column from searching
        },
      ]
    } );
    deferSearchForm.resolve();  // Resolve the deferSearchForm deferrement
  });
  // Once deferSearchForm is resolved, do this function:
  $.when(deferSearchForm).done(function() {
    $('input[aria-controls="Data"]').attr('placeholder', 'Search Schedule...');  // Set the dataTable's search field placeholder as "Search Schedule"
  });
  // Function to set the url of the Google Sheet to use:
  function setSheetUrl(urlString) { // Pass the variable 'urlString' through
    var spreadsheetID = '13cd6P3Ze7bBJugzlQ2Uk2dFWc677wE68ghL94JZcnmI';  // ID of the Google Sheets Spreadsheet
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
    } else if ( noProto === host ) {
      sheetNumber = 7;
    }
    // Make sure the Google Sheet is public or set to Anyone with link can view
    // Go to File > Publish
    urlString = 'https://spreadsheets.google.com/feeds/list/' + spreadsheetID + '/' + sheetNumber + '/public/values?alt=json'; // build the url
    return urlString; // Kick-out the urlString variable as the URL to the appropriate Sheet.
  }
  //console.log(url);
  // A function to build-out the HTML for the table...
  // pulling from the URL of the appropriate Google Sheet:
  function spreadsheetTable() {
    $.getJSON(url, function(data) {  // make JSON call to Google Data API
      var html = '';  // set html variable as empty string:
      // Funcrion to build the static table head:
      function buildTableHead() {
        html += '<table id="Data" class="display table table-striped table-hover" style="width:100%">';
        html += '<thead>';
        html += '<tr>';
        html += '<th class="all">Sort</th>'; // Invisible 'Sort' column
        html += '<th class="all">Date</th>'; // Display on all devices
        html += '<th class="min-tablet-l">Opponent</th>'; // Display on large tablets and up
        html += '<th class="all">Time</th>'; // Display on all devices
        html += '<th class="all">Where</th>'; // Display on all devices
        html += '<th class="desktop">Status</th>'; // Display on desktop and large devices only
        html += '<th class="desktop">Summary</th>'; // Display on desktop and large devices only
        html += '<th class="desktop">Record</th>';
        html += '</tr>';
        html += '</thead>';
        html += '<tbody>';
      }
      buildTableHead();

      var entry = data.feed.entry;  // Define 'entry' var from Google Sheet
      var winCount = 0;
      var lossCount = 0;
      var tieCount;
      var tieCountValue = 0;

      entry.forEach(function(entry) { // Run a 'forEach()' loop on the entrys:
        // Set the background color for the first column in the table:
        function setColor(colorCode) { // Home games get a red background and away games get a blue background
          const red = '#c61f48';
          const blue = '#0f3b63';
          var gameLocation = entry['gsx$where']['$t'].trim();
          if ( gameLocation == 'Home' ) {
            colorCode = red;  // Set the color to primary red
          } else {  // If not, then:
            colorCode = blue;  // Set the color to primary blue
          }
          return colorCode;  // Return the colorCodes out of the setColor() function
        }
        var color = setColor(entry);  // Define var 'color' as passing the var 'entry' through the setColor() function
        // Function to check if the game has an End date and build it out (for games that span multiple days e.g. tournaments & such.)
        function checkEndDate(endDateValue) {
          endDateValue = entry['gsx$end']['$t']; // Define the var 'endDate' as the data in the 'end' column of the Google Sheet
          if ( endDateValue !== '' ) {  // If an endDate exists (is not a blank cell in the sheet) then do this:
            var d = new Date(endDateValue), // Define following variables: Turn the date in the 'end' column into a JS date object
              m = monthNames[d.getMonth()], // Run that date through the monethNames[] array to get the Month in text
              day = d.getDate(); // Set 'day' as that day's #
            endDateValue = ' - ' + m + ' ' + day;  // Redefine 'endDate' as the month and date
          }
          return endDateValue; // Return the formated dates from the 'end' column out of the function
        }
        var endDate = checkEndDate(entry); // Define 'endDate' as running 'entry' through the checkEndDate() function
        // Function to check for a timezone and add it if there is not 'CST'.
        function checkForTimezone(timeZone) {
          timeZone = entry['gsx$timezone']['$t'];  // Define the var 'timeZone' as the data in the 'timezone' column of the Google Sheet
          if ( timeZone == '' || timeZone == 'CST' ) {  // If the timezone is empty or equal to 'CST' then do:
            timeZone = '';  // Set timezone as nothing
          } else {  // For everything else, do:
            timeZone = ' (' + timeZone + ')';  // Set timezone as the timezone value surrounded by parenthesis.
          }
          return timeZone; // Return the timezones out of the checkForTimezone() function
        }
        var timeZone = checkForTimezone(entry); // Define the var 'timeZone' as passing 'entry' through the checkForTimezone() function
        // Function to wrap the incoming data in HTML table markup:
        function buildTableRows() {
          var startDate = entry['gsx$start']['$t'];  // Define vars for: 'start' column
          var status = entry['gsx$status']['$t'];
          var d = new Date(startDate), // Define 'd' as a JS date object created from the dates in the 'start' column
            m = monthNames[d.getMonth()], // Define 'm' as the start date converted to text (e.g. Apr.) by running it throught he monthNames[] array
            day = d.getDate(), // Define 'day' as the date for the game
            sortingDate = d.getTime(); // Define 'sortingDate' as the JS getTime() values of the dates
          if ( status == 'W' ) {
            winCount += 1;
          } else if ( status == 'L' ) {
            lossCount += 1;
          } else if ( status == 'T' ) {
            tieCountValue += 1;
          }

          if ( tieCountValue == 0 ) {
            tieCount = '';
          } else {
            tieCount = ' - ' + tieCountValue;
          }

          html += '<tr>';  // Begin the row
          html += '<td>' + sortingDate + '</td>';  // Opponent Column
          html += '<td align="center" class="mx-auto" style="vertical-align:top;background-color:' + color + ';color:#ffffff;">' + m + ' ' + day + endDate + '</td>'; // Date Column: gets the appropriate background color and an end-date tacked-on if it exists.
          html += '<td align="left">' + entry['gsx$opponent']['$t'] + '</td>';  // Opponent Column
          html += '<td>' + entry['gsx$time']['$t'] + timeZone + '</td>';  // Time  Column: If there is a timezone other than CST, add the timezone in parenthesis
          html += '<td align="left">' + entry['gsx$where']['$t'] + '</td>';  // Where Column
          html += '<td class="schedule-page__align-center--offset" align="center">' + entry['gsx$status']['$t'] + '</td>';  // Status Column
          html += '<td class="schedule-page__align-center--offset" align="center">' + entry['gsx$summary']['$t'] + '</td>';  // Summary Column
          if ( status == 'W' || status == 'L' || status == 'T' || status == 'Canceled' ) {
            html += '<td class="schedule-page__align-center--offset" align="center">' + winCount + ' - ' + lossCount + tieCount + '</td>';
          } else {
            html += '<td class="schedule-page__align-center--offset" align="center">' + ' ' + '</td>';
          }
          html += '</tr>'; // End the row
        }
        buildTableRows();
      });  // End of forEach loop
      // Tack on the closing table tags
      html += '</tbody>';
      html += '</table>';
      // output the html:
      $('#theTable').html(html);  // Inject the var 'html' into div w/ id="theTable".  (Var 'html' = string of text that makes up the table markup)
      deferSpreadsheetTable.resolve();  // Resolve the deferSpreadsheetTable deferrement
    });
  }
  spreadsheetTable();
});
