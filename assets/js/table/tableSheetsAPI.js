//import createTableParts from './createTableParts.js';
//import createScheduleElements from './createScheduleElements.js';
import setSheetParameters from '../shared/setSheetParameters.js';
import createTableElements from './createTableElements.js';

function start() {
  const params = {
    'apiKey': 'AIzaSyCEBsbXfFcdbkASlg-PodD1rT_Fe3Nw62A',
    'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/sheets/v4/rest']
  };
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
            //console.log(response);
            createTableElements(response);
            resolve();
          });
          createTablePromise.then(() => {
            let dataTablesPromise = new Promise((resolve, reject) => {
              // Do Slick Slider Stuff here
              $('#responsiveTable').DataTable( {
                responsive: true, // Activate responsive powers GO!
                paging: false, // Don't paginate. Schedule schould all be on one page
                'order': [], // Do not order = 'order': []
                'columnDefs': [
                  { 'visible': false, 'targets': [1,8] }
                ]
              });
              resolve();
            });
            dataTablesPromise.then(() => {
              document.querySelector('input[type="search"].form-control').setAttribute('placeholder', 'Search schedule...');
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
