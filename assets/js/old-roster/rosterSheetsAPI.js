//import createTableParts from './createTableParts.js';
//import createScheduleElements from './createScheduleElements.js';
import setSheetParameters from '../shared/setSheetParameters.js';

function start() {
  console.log('START');
  const params = {
    'apiKey': 'AIzaSyCEBsbXfFcdbkASlg-PodD1rT_Fe3Nw62A',
    'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/sheets/v4/rest']
  };
  console.log('LOG');
  const sheetParams = setSheetParameters();
  //console.log(sheetParams);
  let headingData, rowData;
  // Initializes the client with the API key and the Translate API.
  gapi.client.init(params).then(function() {
    // Executes an API request, and returns a Promise.
    function execute() {
      return gapi.client.sheets.spreadsheets.values.get(sheetParams)
        .then(function(response) {
          let createTablePromise = new Promise((resolve, reject) => {
            console.log(response);
            // Create the HTML to inject into the DOM here
            createScheduleElements(response);
            //createTableParts(response);
            resolve();

          });
          createTablePromise.then(() => {
            // Do Slick Slider Stuff here

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
