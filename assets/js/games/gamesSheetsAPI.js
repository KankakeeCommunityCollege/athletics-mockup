import createScheduleElements from './createScheduleElements.js';
import setSheetParameters from '../shared/setSheetParameters.js'; // In the `assets/js/shared/` folder -- module is used by other bundles
import slickParamsObject from './createSlickParamsObject.js';

function catchUndefinedResponses(response) {
  const FIRST_ROW_OF_DATA = response.result.values[1]; // Top row is the header, second row is our data
  const RESPONSE_IS_BAD_RESPONSE = FIRST_ROW_OF_DATA[0] == "#N/A"; // What Sheets shows while calculating a spreadsheet
  const reloadGAPIClienOnce = (function () {
    let executed = false;
    return function () {
      if (!executed) {
        executed = true;
        gapi.load('client', start);
      }
    };
  })();

  if (RESPONSE_IS_BAD_RESPONSE) {
    reloadGAPIClienOnce();
    return console.error(`Bad response from Google Sheets:\n${response}`);
  }
}

function start() {
  const params = {
    'apiKey': 'AIzaSyCEBsbXfFcdbkASlg-PodD1rT_Fe3Nw62A',
    'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/sheets/v4/rest']
  };
  //const t0 = performance.now();
  const sheetParams = setSheetParameters();
  //console.log(sheetParams);
  // Initializes the client with the API key
  // No O Auth is needed for read-only public sheets.
  gapi.client.init(params).then( () => {
    return gapi.client.sheets.spreadsheets.values.get(sheetParams);
  }).then((response) => {
    catchUndefinedResponses(response);
    createScheduleElements(response);
  }).then(() => {
    $('.schedule-slider').slick(slickParamsObject());
  },
  function(err) {
    console.error("Execute error", err);
  });
}
// Loads the JavaScript client library and invokes `start` afterwards.
//    Usage:
//  gapi.load('client', start);
export default start;
