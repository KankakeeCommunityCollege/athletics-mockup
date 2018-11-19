document.addEventListener('DOMContentLoaded', function() {
  // Define some deferred variables of things to do later.
  var deferSpreadsheetTable = $.Deferred(),
    deferSearchForm = $.Deferred(),
    deferSlick = $.Deferred();
  var currentUrl = window.location.href,  // Defin currentUrl as the user's current browser URL
    noProto = currentUrl.replace(/(^\w+:|^)\/\//, ''),  // Remove the http(s):// protocol from that URL
    url = setSheetUrl(url);  // Define the variable url as: the function setSheetUrl() and passing the variable url through it.
    console.log(noProto);
  var monthNames = [ // Define an array of the months to convert JS # value of month into short text version
    'Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'
  ];
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
        html += '</tr>';
        html += '</thead>';
        html += '<tbody>';
      }
      buildTableHead();
      // loop to build html output for each row (build the data into the table)
      var entry = data.feed.entry;  // Define 'entry' var from Google Sheet
      entry.forEach(function(entry) { // Run a 'forEach()' loop on the entrys:
        // Set the background color for the first column in the table:
        function setColor(colorCode) { // Home games get a red background and away games get a blue background
          var red = '#c61f48',  // Define 'red' as the KCC Primary Red...
            blue = '#0f3b63';  // and 'blue' as the KCC Primary Blue hex-code.
          if ( entry['gsx$where']['$t'] == 'Home' ) {  // If the game location ('where' column) is Home:
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
          var d = new Date(startDate), // Define 'd' as a JS date object created from the dates in the 'start' column
            m = monthNames[d.getMonth()], // Define 'm' as the start date converted to text (e.g. Apr.) by running it throught he monthNames[] array
            day = d.getDate(), // Define 'day' as the date for the game
            sortingDate = d.getTime(); // Define 'sortingDate' as the JS getTime() values of the dates
          html += '<tr>';  // Begin the row
          html += '<td>' + sortingDate + '</td>';  // Opponent Column
          html += '<td align="center" class="mx-auto" style="vertical-align:top;background-color:' + color + ';color:#ffffff;">' + m + ' ' + day + endDate + '</td>'; // Date Column: gets the appropriate background color and an end-date tacked-on if it exists.
          html += '<td align="left">' + entry['gsx$opponent']['$t'] + '</td>';  // Opponent Column
          html += '<td>' + entry['gsx$time']['$t'] + timeZone + '</td>';  // Time  Column: If there is a timezone other than CST, add the timezone in parenthesis
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
      // output the html:
      $('#theTable').html(html);  // Inject the var 'html' into div w/ id="theTable".  (Var 'html' = string of text that makes up the table markup)
      deferSpreadsheetTable.resolve();  // Resolve the deferSpreadsheetTable deferrement
    });
  }
  // Function to build-out the 'Upcoming Games' slider:
  function sliderSchedule() {
    $.getJSON(url, function(data) {  // make JSON call to Google Data API
      var html = '';  // set html variable as empty string:
      html += '<div class="schedule-slider">'; // Add the start to the slider's outermost div to the 'html' variable
      // loop to build html output for each row
      var entry = data.feed.entry;  // Define 'entry' var from Google Sheet
      var games = []; // Degine 'games' var as an empty array
      // run a forEach() loop on the entries...
      entry.forEach(function(entry) { // ...go determine if the game has happened already:
        var gameDate = entry['gsx$start']['$t'], // Define 'gameDate' as the dates in the 'start' column
          d = new Date(), // Get the current Date/Time
          gd = new Date(gameDate), // Make a new JS Date object from those dates in the 'start' column
          dt = d.getTime(), // define 'dt' as the current date/time in the JS getTime() format
          gdt = gd.getTime(); // define 'gdt' as the games date in the 'start' column in the JS getTime() format
        if ( gdt >= dt ) { // If the games date is greater than today (i.e. If the games hasn't happened yet)
          games.push(entry); // Push those entry's dates into the 'games' array
        }
        return games; // Return the 'games' array out of the sliderSchedule() function
      }); // We now have all the games that haven't happened yet.
      // Run a 'forEach()' loop on the 'games' array created above:
      games.forEach(function(entry) {
        // Function to set the background color for the first column in the table...
        function setColor(colorCode) { // Home games get a red background and away games get a blue background
          var red = '#c61f48',  // Define 'red' as the KCC Primary Red...
            blue = '#0f3b63';  // and 'blue' as the KCC Primary Blue hex-code.
          if ( entry['gsx$where']['$t'] == 'Home' ) {  // If the game location ('where' column) is @ Home:
            colorCode = red;  // Set the color to primary red
          } else {  // If not, then:
            colorCode = blue;  // Set the color to primary blue
          }
          return colorCode; // Return the colorCodes for the games out of the setColor function
        }
        var color = setColor(entry); // Define 'color' as passing 'entry' through the setColor() function
        // Function to add an ending date if there is one:
        function checkEndDate(endDateValue) {
          endDateValue = entry['gsx$end']['$t']; // Define the var 'endDate' as the data in the 'end' column of the Google Sheet
          if ( endDateValue !== '' ) {  // If an endDate exists (is not a blank cell in the sheet) then do this:
            var d = new Date(endDateValue), // Define 'd' as a new JS date object from the games 'end' column dates
              m = monthNames[d.getMonth()], // Define 'm' as the game end-date's month in short-text form
              day = d.getDate(); // Define day as the date for the games in the 'end' column
            endDateValue = '<span class="schedule-slider__dash d-block">&nbsp;-&nbsp;</span>' + '<span class="schedule-slider__m2 d-block">' + m + '</span><span class="schedule-slider__day2 d-block">' + day + '</span>';  // Redefine 'endDate' as the html for adding in the end-date
          }
          return endDateValue; // Return the 'end' column dates out of the checkEndDate() function
        }
        var endDate = checkEndDate(entry); // Defin 'endDate' as passing 'entry' through the checkEndDate() function
        // Function to check for a timezone and add the html for it if there is one other than 'CST':
        function checkForTimezone(timeZone) {
          timeZone = entry['gsx$timezone']['$t'];  // Define the var 'timeZone' as the data in the 'timezone' column of the Google Sheet
          if ( timeZone == '' || timeZone == 'CST' ) {  // If the timezone is empty or equal to 'CST' then do:
            timeZone = '';  // Set timezone as nothing
          } else {  // For everything else, do:
            timeZone = ' (' + timeZone + ')';  // Set timezone as the timezone value surrounded by brackets.
          }
          return timeZone; // Return the timezones out of the checkEndDate() function
        }
        var timeZone = checkForTimezone(entry); // Define 'timeZone' as 'entry' passed-through the checkForTimezone() function
        // Function to build the html for the individual div elements for each game:
        function buildSliderDivs() {
          var startDate = entry['gsx$start']['$t']; // 'startDate' = start column
          var sport; // sport = 'undefined'
          var d = new Date(startDate), // Make a new JS Date from the start column dates
            m = monthNames[d.getMonth()], // Make 'm' the month in shor-text form
            day = d.getDate(); // Make 'day' the games Date
          if ( day <= 9 ) { // If the Date is more than a single digit (i.e. 0-9)
            day = '0' + day; // Preceed it with a zero (0)
          } // Set the Name of the sport based on which page the user is on:
          if ( noProto.indexOf('/mens-basketball') > -1 ) {
            sport = 'Men&apos;s Basketball';
          } else if ( noProto.indexOf( '/baseball' ) > -1 ) {
            sport = 'Baseball';
          } else if ( noProto.indexOf('/womens-basketball') > -1 ) {
            sport = 'Women&apos;s Basketball';
          } else if ( noProto.indexOf('/softball') > -1 ) {
            sport = 'Softball';
          } else if ( noProto.indexOf('/soccer') > -1 ) {
            sport = 'Soccer';
          } else if ( noProto.indexOf('/volleyball') > -1 ) {
            sport = 'Volleyball';
          }
          // Build-out internall parts of each slider slide:
          html += '<div><div class="row schedule-slider__row">';  // Begin a the slider div
          html += '<div class="schedule-slider__l text-center col-2" style="background-color:' + color + '">'; // Start the left-side of the slider w/ the appropriate background-color
          html += '<span class="schedule-slider__m d-block">' + m + '</span><span class="schedule-slider__day d-block">' + day + '</span>' + endDate; // Date column w/ end-date added if it exists.
          html += '</div><div class="schedule-slider__r col-10">'; // Close left-side and start the right portion of the slider-slide
          html += '<div class="schedule-slider__sport--wrapper"><span class="schedule-slider__sport d-block">' + sport + '</span></div>'; // Label it w/ the sport name
          html += '<span class="schedule-slider__opponent d-block">vs. ' + entry['gsx$opponent']['$t'] + '</span>';  // Opponent Column
          html += '<span class="schedule-slider__where d-block">' + entry['gsx$where']['$t'] + '</span>';  // Where Column
          html += '<span class="schedule-slider__time d-block">' + entry['gsx$time']['$t'] + timeZone + '</span>';  // Time  Column: If there is a timezone other than CST add the timezone in parenthesis
          html += '</div></div></div>'; // End divs
        }
        buildSliderDivs();
      });  // End of forEach loop
      html += '</div>'; // Tack-on the closing div tag for the slider's wrapper
      // output the html
      $('#scheduleDiv').html(html);  // Inject the var 'html' into div w/ id="theTable".  (Var 'html' = string of text that makes up the table markup)
      deferSlick.resolve(); // Resolve the deferSlick deferrement
    });
  }
  // Function that initiates the Slick Slider only after its html content has been generated from the Google Sheet
  $.when(deferSlick).done(function() {
    initSliderSchedule();
  });
  // Unleash Slick Slider
  function initSliderSchedule() {
    $('.schedule-slider').slick({
      dots: false, // No dots bellow the slider
      infinite: false, // No infinite scrolling of slides
      autoplay: false, // No autoplaying the slides
      slidesToShow: 3, // 3 visible
      slidesToScroll: 1, // scroll one at a time
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
  //  A function that fires the spreadsheetTable() function IF the user is on a schedule page and fires the sliderSchedule() function if the user is on a sport's landing page:
  function checkPageLocation() {
    var h = 'athletics.kcc.edu/', // Set h as the domain of the site
      lh = 'localhost:3000/'; // Set lh as the local domain of the site is when in dev.
    if ( noProto.indexOf('/schedule') > -1 ) {  // If user's current URL contains '/schedule' in it, do:
      spreadsheetTable();  // Go-go gadget spreadsheetTable()!
    } else if ( noProto.indexOf( lh + 'mens-basketball' ) > -1 || noProto.indexOf( h + 'mens-basketball' ) > -1 ) {
      sliderSchedule();
    } else if ( noProto.indexOf( lh + 'baseball' ) > -1 || noProto.indexOf( h + 'baseball' ) > -1 ) {
      sliderSchedule();
    } else if ( noProto.indexOf( lh + 'womens-basketball' ) > -1 || noProto.indexOf( h + 'womens-basketball' ) > -1 ) {
      sliderSchedule();
    } else if ( noProto.indexOf( lh + 'softball' ) > -1 || noProto.indexOf( h + 'softball' ) > -1 ) {
      sliderSchedule();
    } else if ( noProto.indexOf( lh + 'soccer' ) > -1 || noProto.indexOf( h + 'soccer' ) > -1 ) {
      sliderSchedule();
    } else if ( noProto.indexOf( lh + 'volleyball' ) > -1 || noProto.indexOf( h + 'volleyball' ) > -1 ) {
      sliderSchedule();
    } else if ( noProto == h || noProto == lh ) {
      console.log('MONKEYS');
      sliderSchedule();
    }
  }
  checkPageLocation();  // Fire the nuclear missiles!
});
