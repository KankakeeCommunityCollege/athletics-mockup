document.addEventListener('DOMContentLoaded', function() {
  // Define some deferred variables of things to do later.
  var deferSlick = $.Deferred();
  var currentUrl = window.location.href,  // Defin currentUrl as the user's current browser URL
    noProto = currentUrl.replace(/(^\w+:|^)\/\//, ''),  // Remove the http(s):// protocol from that URL
    url = setSheetUrl(url);  // Define the variable url as: the function setSheetUrl() and passing the variable url through it.
    //console.log(noProto);
  var monthNames = [ // Define an array of the months to convert JS # value of month into short text version
    'Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'
  ];
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
    } else if ( noProto == 'athletics.kcc.edu/' || noProto == 'localhost:3000/' ) {
      sheetNumber = 7;
    }
    // Make sure the Google Sheet is public or set to Anyone with link can view
    // Go to File > Publish
    urlString = 'https://spreadsheets.google.com/feeds/list/' + spreadsheetID + '/' + sheetNumber + '/public/values?alt=json'; // build the url
    return urlString; // Kick-out the urlString variable as the URL to the appropriate Sheet.
  }
  //console.log(url);
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
          time = entry['gsx$time']['$t'],
          gameTime;
        if ( time !== 'TBA' || time !== undefined || time !== null || time !== '' || time !== ' ' ) {
          gameTime = time;
        } else {
          gameTime = 'TBA';
        }
        var tzh;
        if ( gameTime.indexOf('PM') > -1 ) {
          tzh = 12;
        } else if ( gameTime == 'TBA' ) {
          tzh = '';
        } else {
          tzh = 0;
        }
        if ( gameTime !== 'TBA' ) {
          var noAmPm = gameTime.replace(' PM', '').replace(' AM', '');
          var splitTime = noAmPm.split(':');
          var hh;
          var mm;
          var tz = entry['gsx$timezone']['$t'];
          for ( var i=0; i<splitTime.length; i++ ) {
            hh = splitTime[0]*1+tzh;
            mm = splitTime[1];
          }
          var hours;
          if ( tz !== null || tz !== ' ' || tz !== undefined || tz !== '' || tz == 'CST' ) {
            hours = hh + 6;
          } else if ( tz == 'EST' ) {
            hours = hh + 5;
          }
          gd.setHours(hours - 1);
          gd.setMinutes(mm - 1);
        }
        var dt = d.getTime(), // define 'dt' as the current date/time in the JS getTime() format
          gdt = gd.getTime(); // define 'gdt' as the games date in the 'start' column in the JS getTime() format
        entry['dateString'] = gdt;
        if ( gdt > dt ) { // If the games date is greater than today (i.e. If the games hasn't happened yet)
          games.push(entry); // Push those entry's dates into the 'games' array
        }
        return games; // Return the 'games' array out of the sliderSchedule() function
      }); // We now have all the games that haven't happened yet.
      function compare(a,b) {
        if (a.dateString < b.dateString)
          return -1;
        if (a.dateString > b.dateString)
          return 1;
        return 0;
      }
      games.sort(compare);
      //console.log(games);
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
          var sport = entry['gsx$sport']['$t'];
          var d = new Date(startDate), // Make a new JS Date from the start column dates
            m = monthNames[d.getMonth()], // Make 'm' the month in shor-text form
            day = d.getDate(); // Make 'day' the games Date
          if ( day <= 9 ) { // If the Date is more than a single digit (i.e. 0-9)
            day = '0' + day; // Preceed it with a zero (0)
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
    if ( noProto.indexOf( lh + 'mens-basketball' ) > -1 || noProto.indexOf( h + 'mens-basketball' ) > -1 ) {
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
      sliderSchedule();
    }
  }
  checkPageLocation();  // Fire the nuclear missiles!
});
