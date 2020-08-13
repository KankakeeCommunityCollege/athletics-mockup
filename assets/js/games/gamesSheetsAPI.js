import createScheduleElements from './createScheduleElements.js';
import setSheetParameters from '../shared/setSheetParameters.js';

// =============================================================================================  //
// =============================================================================================  //
//
//  TODO:
//
//    1.) CHANGE CODE TO MAKE A SMALLER GOOGLE API CALL FIRST (TO FETCH INFO FOR 
//      ONLY 6 OR 9 GAMES-WORTH OF DATA OR SOMETHING SMALL.)
//    2.) BUILD A SMALLER VERISON OF THE UPCOMING GAMES SLIDER (6 OR 9 GAMES) INTO THE PAGE...
//    3.) MAKE THE BIG API CALL FOR THE REMAINING DATA
//    4.) APPEND THE REMAINING DATA TO THE SLIDER USING SLICK'S APPEND METHOD
//
//    THIS SHOULD BOTH IMPROVE PERFORMANCE AND PREVENT THE RESPONSE FROM RETURNING BEFORE 
//    THE SCHEDULE IS FULLY CALCULATED AND READY.
//
// =============================================================================================  //
// =============================================================================================  //

function catchUndefinedResponses(response) {
  const firstArray = response.result.values[0];
  const firstItem = firstArray[0];
  const responseIsUndefined = response === undefined || firstItem === undefined || response === 'undefined' || firstItem === 'undefined';
  if ( responseIsUndefined ) {
    return gapi.load('client', start);
  }
}

function start() {
  const params = {
    'apiKey': 'AIzaSyCEBsbXfFcdbkASlg-PodD1rT_Fe3Nw62A',
    'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/sheets/v4/rest']
  };
  const sheetParams = setSheetParameters();
  //console.log(sheetParams);
  // Initializes the client with the API key
  // No O Auth is needed for read-only public sheets.
  gapi.client.init(params).then(function() {
    // Executes an API request, and returns a Promise.
    function execute() {
      return gapi.client.sheets.spreadsheets.values.get(sheetParams)
        .then(function(response) {
          catchUndefinedResponses(response);
          let createTablePromise = new Promise((resolve, reject) => {
            //console.log(response);
            // Create the HTML to inject into the DOM here
            console.info(response);
            createScheduleElements(response);
            //createTableParts(response);
            resolve();

          });
          createTablePromise.then(() => {
            // Do Slick Slider Stuff here
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
                }
              ]
            });
          });
        },
        function(err) {
          console.error("Execute error", err);
        });
    }
    execute();
  });
}
// Loads the JavaScript client library and invokes `start` afterwards.
//    Usage:
//  gapi.load('client', start);
export default start;
