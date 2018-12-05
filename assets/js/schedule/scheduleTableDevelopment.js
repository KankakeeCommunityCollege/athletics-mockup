document.addEventListener('DOMContentLoaded', function() {

  // Define some deferred variables of things to do later.
  var deferSpreadsheetTable = $.Deferred();
  var deferSearchForm = $.Deferred();

  var currentUrl = window.location.href;  // Defin currentUrl as the user's current browser URL
  var noProto = currentUrl.replace(/(^\w+:|^)\/\//, '');  // Remove the http(s):// protocol from that URL
  var url = setSheetUrl(url);  // Define the variable url as: the function setSheetUrl() and passing the variable url through it.

  console.log(noProto);

  var monthNames = [
    'Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'
  ];

  $.when(deferSpreadsheetTable).done(function() {  // Once deferSpreadsheetTable is resolved, do this function:
    // Unleash the DataTables JS library for functional/sortable tables:
    // (found at datatables.net)
    $('#Data').DataTable( {
      responsive: true,
      paging: false,
      'order': []
    } );
    deferSearchForm.resolve();  // Resolve the deferSearchForm deferrement
  });

  $.when(deferSearchForm).done(function() {  // Once deferSearchForm is resolved, do this function:
    $('input[aria-controls="Data"]').attr('placeholder', 'Search Schedule...');  // Set the dataTable's search field placeholder as "Search Schedule"
  });

  // Function to set the url of the Google Sheet to use:
  // Pass the variable 'urlString' through
  function setSheetUrl(urlString) {
    var spreadsheetID = '13cd6P3Ze7bBJugzlQ2Uk2dFWc677wE68ghL94JZcnmI';  // ID of the Google Sheets Spreadsheet
    // Sheet # within the Spreadsheet
    // (Sheet # corresponds to the order of the sheets as they appear in Google--the left-most sheet being # '1')
    var sheetNumber; // Defined as an empty variable

    // Set the sheet # based on which page the user is on:
    if ( noProto.indexOf('/baseball/schedule') > -1 ) {
      sheetNumber = 1;  // If on Baseball Schedule page set to '1'
    } else if ( noProto.indexOf('/mens-basketball/schedule') > -1 ) {
      sheetNumber = 2;  // If on Men's Basketball Schedule page set to '2'
    } else if ( noProto.indexOf('/womens-basketball/schedule') > -1 ) {
      sheetNumber = 3;  // If on Women's Basketball Schedule page set to '3'
    } else if ( noProto.indexOf('/softball/schedule') > -1 ) {
      sheetNumber = 4;  // If on Women's Basketball Schedule page set to '3'
    }
    // Make sure the Google Sheet is public or set to Anyone with link can view
    // Go to File > Publish
    urlString = 'https://spreadsheets.google.com/feeds/list/' + spreadsheetID + '/' + sheetNumber + '/public/values?alt=json'; // build the url
    return urlString; // Kick-out the urlString variable as the URL to the appropriate Sheet.
  }

  // A function to build-out the HTML for the table...
  // pulling from the URL of the appropriate Google Sheet:
  function spreadsheetTable() {
    $.getJSON(url, function(data) {  // make JSON call to Google Data API
      var html = '';  // set html variable as empty string:

      function buildTableHead() {
        html += '<table id="Data" class="display table table-striped table-hover" style="width:100%">';
        html += '<thead>';
        html += '<tr>';
        html += '<th class="all">Date</th>';
        html += '<th class="all">Opponent</th>';
        html += '<th class="all">Time</th>';
        html += '<th class="all">Where</th>';
        html += '<th class="all">Status</th>';
        html += '<th class="all">Summary</th>';
        html += '</tr>';
        html += '</thead>';
        html += '<tbody>';
      }
      buildTableHead();

      // loop to build html output for each row
      var entry = data.feed.entry;  // Define 'entry' var from Google Sheet
      entry.forEach(function(entry) { // Run a 'forEach()' loop on the entrys:

        function setColor(colorCode) {
          // Set the background color for the first column in the table...
          var red = '#c61f48',  // Define 'red' as the KCC Primary Red...
            blue = '#0f3b63';  // and 'blue' as the KCC Primary Blue hex-code.
          // Home games get a red background and away games get a blue background
          if ( entry['gsx$where']['$t'] == 'Home' ) {  // If the game location ('where' column) is == Home:
            colorCode = red;  // Set the color to primary red
          } else {  // If not, then:
            colorCode = blue;  // Set the color to primary blue
          }
          return colorCode;
        }
        var color = setColor(entry);

        function checkEndDate(endDateValue) {
          // Add an ending date if there is one:
          endDateValue = entry['gsx$end']['$t']; // Define the var 'endDate' as the data in the 'end' column of the Google Sheet
          if ( endDateValue !== '' ) {  // If an endDate exists (is not a blank cell in the sheet) then do this:
            var d = new Date(endDateValue),
              m = monthNames[d.getMonth()],
              day = d.getDate();
            endDateValue = ' - ' + m + ' ' + day;  // Redefine 'endDate' as the cell's value
          }
          return endDateValue;
        }
        var endDate = checkEndDate(entry);

        function checkForTimezone(timeZone) {
          // Add a timezone if there is one, or if it is NOT the central timezone
          timeZone = entry['gsx$timezone']['$t'];  // Define the var 'timeZone' as the data in the 'timezone' column of the Google Sheet
          if ( timeZone == '' || timeZone == 'CST' ) {  // If the timezone is empty or equal to 'CST' then do:
            timeZone = '';  // Set timezone as nothing
          } else {  // For everything else, do:
            timeZone = ' (' + timeZone + ')';  // Set timezone as the timezone value surrounded by brackets.
          }
          return timeZone;
        }
        var timeZone = checkForTimezone(entry);

        function buildTableRows() {
          var startDate = entry['gsx$start']['$t'];
          var d = new Date(startDate),
            m = monthNames[d.getMonth()],
            day = d.getDate();
          // Build-out rows of the table:
          html += '<tr>';  // Begin the row
          html += '<td align="center" class="mx-auto" style="vertical-align:top;background-color:' + color + ';color:#ffffff;">' + m + ' ' + day + endDate + '</td>'; // Date Column: gets the appropriate background color and an end-date added if it exists.
          html += '<td align="left">' + entry['gsx$opponent']['$t'] + '</td>';  // Opponent Column
          html += '<td>' + entry['gsx$time']['$t'] + timeZone + '</td>';  // Time  Column: If there is a timezone other than CST add the timezone in parenthesis
          html += '<td align="left">' + entry['gsx$where']['$t'] + '</td>';  // Where Column
          html += '<td>' + entry['gsx$status']['$t'] + '</td>';  // Status Column
          html += '<td>' + entry['gsx$summary']['$t'] + '</td>';  // Summary Column
          html += '</tr>'; // End the row
        }
        buildTableRows();
      });  // End of forEach loop

      // Tack on the closing table tags
      html += '</tbody>';
      html += '</table>';

      // output the html
      $('#theTable').html(html);  // Inject the var 'html' into div w/ id="theTable".  (Var 'html' = string of text that makes up the table markup)
      deferSpreadsheetTable.resolve();  // Resolve the deferSpreadsheetTable deferrement
    });
  }



  function sliderSchedule() {
    $.getJSON(url, function(data) {  // make JSON call to Google Data API
      var html = '';  // set html variable as empty string:
      html += '<div class="schedule-slider">';

      // loop to build html output for each row
      var entry = data.feed.entry;  // Define 'entry' var from Google Sheet
      entry.forEach(function(entry) { // Run a 'forEach()' loop on the entrys:

        function setColor(colorCode) {
          // Set the background color for the first column in the table...
          var red = '#c61f48',  // Define 'red' as the KCC Primary Red...
            blue = '#0f3b63';  // and 'blue' as the KCC Primary Blue hex-code.
          // Home games get a red background and away games get a blue background
          if ( entry['gsx$where']['$t'] == 'Home' ) {  // If the game location ('where' column) is == Home:
            colorCode = red;  // Set the color to primary red
          } else {  // If not, then:
            colorCode = blue;  // Set the color to primary blue
          }
          return colorCode;
        }
        var color = setColor(entry);

        function checkEndDate(endDateValue) {
          // Add an ending date if there is one:
          endDateValue = entry['gsx$end']['$t']; // Define the var 'endDate' as the data in the 'end' column of the Google Sheet
          if ( endDateValue !== '' ) {  // If an endDate exists (is not a blank cell in the sheet) then do this:
            endDateValue = ' - ' + endDateValue;  // Redefine 'endDate' as the cell's value
          }
          return endDateValue;
        }
        var endDate = checkEndDate(entry);

        function checkForTimezone(timeZone) {
          // Add a timezone if there is one, or if it is NOT the central timezone
          timeZone = entry['gsx$timezone']['$t'];  // Define the var 'timeZone' as the data in the 'timezone' column of the Google Sheet
          if ( timeZone == '' || timeZone == 'CST' ) {  // If the timezone is empty or equal to 'CST' then do:
            timeZone = '';  // Set timezone as nothing
          } else {  // For everything else, do:
            timeZone = ' (' + timeZone + ')';  // Set timezone as the timezone value surrounded by brackets.
          }
          return timeZone;
        }
        var timeZone = checkForTimezone(entry);

        function buildSliderDivs() {
          // Build-out rows of the table:
          html += '<div>';  // Begin a the slider div
          html += '<div style="background-color:' + color + ';color:#ffffff;">' + entry['gsx$start']['$t'] + endDate + '</td>'; // Date Column: gets the appropriate background color and an end-date added if it exists.
          html += '<td align="left">' + entry['gsx$opponent']['$t'] + '</td>';  // Opponent Column
          html += '<td>' + entry['gsx$time']['$t'] + timeZone + '</td>';  // Time  Column: If there is a timezone other than CST add the timezone in parenthesis
          html += '<td align="left">' + entry['gsx$where']['$t'] + '</td>';  // Where Column
          html += '<td>' + entry['gsx$status']['$t'] + '</td>';  // Status Column
          html += '<td>' + entry['gsx$summary']['$t'] + '</td>';  // Summary Column
          html += '</tr>'; // End the row
        }
        buildSliderDivs();
      });  // End of forEach loop

      // Tack on the closing table tags
      html += '</tbody>';
      html += '</table>';

      // output the html
      $('#theTable').html(html);  // Inject the var 'html' into div w/ id="theTable".  (Var 'html' = string of text that makes up the table markup)
      deferSpreadsheetTable.resolve();  // Resolve the deferSpreadsheetTable deferrement
    });
  }



  //  A function that fires the spreadsheetTable() function IF the user is on a schedule page.
  function checkPageLocation() {
    if ( noProto.indexOf('/schedule') > -1 ) {  // If user's current URL contains '/schedule' in it, do:
      spreadsheetTable();  // Go-go gadget spreadsheetTable()!
    }
  }
  checkPageLocation();  // Fire the nuclear missiles!
});
