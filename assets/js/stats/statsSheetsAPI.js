import setSheetParameters from '../shared/setSheetParameters.js';
import setStatsParameters from './setStatsParameters.js';
import createTabHTML from './createTabHTML.js';

function start() {
  const params = {
    'apiKey': 'AIzaSyCEBsbXfFcdbkASlg-PodD1rT_Fe3Nw62A',
    'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/sheets/v4/rest']
  };
  const sheetParams = setSheetParameters();
  //console.log(sheetParams);
  //console.log(sheetParams);
  gapi.client.init(params).then(function() {
    // Executes an API request, and returns a Promise.
    function execute() {
      return gapi.client.sheets.spreadsheets.get(sheetParams)
        .then(function(response) {
          let createTablePromise = new Promise((resolve, reject) => {
            let statsRange = [];
            //console.log(response.result.sheets);
            let sheetsResults = response.result.sheets;
            for (var i = 0; i < sheetsResults.length; i++) {
              let sheetsObject = sheetsResults[i];
              //console.log(sheetsObject.properties.title);
              let sheetTitle = sheetsObject.properties.title;

              statsRange.push(sheetTitle);
            }
            //console.log(statsRange);
            let statsParams = setStatsParameters(statsRange);

            return gapi.client.sheets.spreadsheets.values.batchGet(statsParams)
              .then(function(batchResponse) {
                //console.log(batchResponse);
                createTabHTML(batchResponse);
              },
              function(error) {
                console.error("Execute error", error);
              });

            resolve();
          });
          createTablePromise.then(() => {
            let dataTablesPromise = new Promise((resolve, reject) => {
              // Do Slick Slider Stuff here
              $('#responsiveTable').DataTable( {
                responsive: true, // Activate responsive powers GO!
                paging: false, // Don't paginate. Schedule schould all be on one page
                'order': [[1, 'asc']]//, // Initial column ordering
                //'columnDefs': [
                //  { 'visible': false, 'targets': [0,10] }
                //]
              });
              resolve();
            });
            dataTablesPromise.then(() => {
              document.querySelector('input[type="search"].form-control').setAttribute('placeholder', 'Search roster...');
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
