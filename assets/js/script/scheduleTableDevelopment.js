document.addEventListener('DOMContentLoaded', function() {

  // Define some deferred variables of things to do later.
  var deferSpreadsheetTable = $.Deferred();
  var deferSearchForm = $.Deferred();
  var deferSlick = $.Deferred();

  var currentUrl = window.location.href;  // Defin currentUrl as the user's current browser URL
  var noProto = currentUrl.replace(/(^\w+:|^)\/\//, '');  // Remove the http(s):// protocol from that URL
  var url = setSheetUrl(url);  // Define the variable url as: the function setSheetUrl() and passing the variable url through it.

  var monthNames = [
    'Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'
  ];

  $.when(deferSpreadsheetTable).done(function() {  // Once deferSpreadsheetTable is resolved, do this function:
    // Unleash the DataTables JS library for functional/sortable tables:
    // (found at datatables.net)
    $('#Data').DataTable( {
      responsive: true,
      paging: false,
      'order': [],
      'columnDefs': [
        { 'orderData':[0], 'targets': [1] },
        {
          'targets': [0],
          'visible': false,
          'searchable': false
        },
      ]
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
    if ( noProto.indexOf('/baseball') > -1 ) {
      sheetNumber = 1;  // If on Baseball Schedule page set to '1'
    } else if ( noProto.indexOf('/mens-basketball') > -1 ) {
      sheetNumber = 2;  // If on Men's Basketball Schedule page set to '2'
    } else if ( noProto.indexOf('/womens-basketball') > -1 ) {
      sheetNumber = 3;  // If on Women's Basketball Schedule page set to '3'
    } else if ( noProto.indexOf('/softball') > -1 ) {
      sheetNumber = 4;  // If on Women's Basketball Schedule page set to '3'
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

      function buildTableHead() {
        html += '<table id="Data" class="display table table-striped table-hover" style="width:100%">';
        html += '<thead>';
        html += '<tr>';
        html += '<th class="all">Sort</th>';
        html += '<th class="all">Date</th>';
        html += '<th class="min-tablet-l">Opponent</th>';
        html += '<th class="all">Time</th>';
        html += '<th class="all">Where</th>';
        html += '<th class="desktop">Status</th>';
        html += '<th class="desktop">Summary</th>';
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
            day = d.getDate(),
            sortingDate = d.getTime();
          // Build-out rows of the table:
          html += '<tr>';  // Begin the row
          html += '<td>' + sortingDate + '</td>';  // Opponent Column
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

      var games = [];
      entry.forEach(function(entry) {
        var gameDate = entry['gsx$start']['$t'],
          d = new Date(),
          gd = new Date(gameDate),
          dt = d.getTime(),
          gdt = gd.getTime();
        if ( gdt >= dt ) {
          games.push(entry);
        }
        return games;
      });

      games.forEach(function(entry) { // Run a 'forEach()' loop on the entrys:

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
            endDateValue = '<span class="schedule-slider__dash d-block">&nbsp;-&nbsp;</span>' + '<span class="schedule-slider__m2 d-block">' + m + '</span><span class="schedule-slider__day2 d-block">' + day + '</span>';  // Redefine 'endDate' as the cell's value
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
          var startDate = entry['gsx$start']['$t'];
          var sport;
          var d = new Date(startDate),
            m = monthNames[d.getMonth()],
            day = d.getDate();
          if ( day <= 9 ) {
            day = '0' + day;
          }
          if ( noProto.indexOf('/mens-basketball') > -1 ) {
            sport = 'Men&apos;s Basketball';
          } else if ( noProto.indexOf( '/baseball' ) > -1 ) {
            sport = 'Baseball';
          } else if ( noProto.indexOf('/womens-basketball') > -1 ) {
            sport = 'Women&apos;s Basketball';
          } else if ( noProto.indexOf('/softball') > -1 ) {
            sport = 'Softball';
          }
          // Build-out rows of the table:
          html += '<div><div class="row schedule-slider__row">';  // Begin a the slider div
          html += '<div class="schedule-slider__l text-center col-2" style="background-color:' + color + '">';
          html += '<span class="schedule-slider__m d-block">' + m + '</span><span class="schedule-slider__day d-block">' + day + '</span>' + endDate; // Date Column: gets the appropriate background color and an end-date added if it exists.
          html += '</div><div class="schedule-slider__r col-10">';
          html += '<div class="schedule-slider__sport--wrapper"><span class="schedule-slider__sport d-block">' + sport + '</span></div>';
          html += '<span class="schedule-slider__opponent d-block">vs. ' + entry['gsx$opponent']['$t'] + '</span>';  // Opponent Column
          html += '<span class="schedule-slider__where d-block">' + entry['gsx$where']['$t'] + '</span>';  // Where Column
          html += '<span class="schedule-slider__time d-block">' + entry['gsx$time']['$t'] + timeZone + '</span>';  // Time  Column: If there is a timezone other than CST add the timezone in parenthesis
          html += '</div></div></div>'; // End the row
        }
        buildSliderDivs();
      });  // End of forEach loop
      html += '</div>';
      // output the html
      $('#scheduleDiv').html(html);  // Inject the var 'html' into div w/ id="theTable".  (Var 'html' = string of text that makes up the table markup)
      deferSlick.resolve();
    });
  }

  $.when(deferSlick).done(function() {
    initSliderSchedule();
  });

  function initSliderSchedule() {
    $('.schedule-slider').slick({
      dots: false,
      infinite: false,
      autoplay: false,
      slidesToShow: 3,
      slidesToScroll: 1,
      adaptiveHeight: false,
      prevArrow:'<img class="a-left control-c prev slick-prev" src="../assets/img/blue-prev.svg">',
      nextArrow:'<img class="a-right control-c next slick-next" src="../assets/img/blue-next.svg">',
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        },
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        },
      ]
    });
  }

  //  A function that fires the spreadsheetTable() function IF the user is on a schedule page.
  function checkPageLocation() {
    var h = 'althetics.kcc.edu',
      lh = 'localhost:3000';
    if ( noProto.indexOf('/schedule') > -1 ) {  // If user's current URL contains '/schedule' in it, do:
      spreadsheetTable();  // Go-go gadget spreadsheetTable()!
    } else if ( noProto.indexOf( lh + '/mens-basketball' ) > -1 || noProto.indexOf( h + '/mens-basketball' ) > -1 ) {
      sliderSchedule();
    } else if ( noProto.indexOf( lh + '/baseball' ) > -1 || noProto.indexOf( h + '/baseball' ) > -1 ) {
      sliderSchedule();
    } else if ( noProto.indexOf( lh + '/womens-basketball' ) > -1 || noProto.indexOf( h + '/womens-basketball' ) > -1 ) {
      sliderSchedule();
    } else if ( noProto.indexOf( lh + '/softball' ) > -1 || noProto.indexOf( h + '/softball' ) > -1 ) {
      sliderSchedule();
    }
  }
  checkPageLocation();  // Fire the nuclear missiles!
});
