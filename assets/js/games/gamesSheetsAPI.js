import createScheduleElements from './createScheduleElements.js';
import setSheetParameters from '../shared/setSheetParameters.js';
import initSlickSlider from './initSlickSlider.js';

const GAPI_PARAMS = {
  'apiKey': 'AIzaSyCEBsbXfFcdbkASlg-PodD1rT_Fe3Nw62A',
  'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/sheets/v4/rest']
};
const SHEET_PARAMS = setSheetParameters();
const errorMessage = `
    <div class="p-3">
      <p><strong>There was an issue getting the requested scedule</strong></p>
      <p>You can try 
      <button role="button" aria-label="reload the page" onclick="window.location.reload();" class="btn btn-outline-primary">reloading the page</button> 
      or checking back at a later date.</p>
    </div>
    `;
const reloadGAPIClientOnce = (function () {
  let executed = false;
  return function () {
    if (!executed) {
      executed = true;
      start();
    } else {
      throw new Error('The requested sheet could not be found or permissions are not correct.')
    }
  };
})();

function catchUndefinedResponses(response) {
  const FIRST_ROW_OF_DATA = response.result.values[1]; // Top row is the header, second row is our data
  const RESPONSE_IS_BAD = FIRST_ROW_OF_DATA[0] == 'Loading...' || FIRST_ROW_OF_DATA[0] == '#N/A'; // These are the two common errors

  if ( RESPONSE_IS_BAD ) {
    reloadGAPIClientOnce();
    return console.error(`Attempting to fetch Sheet again... \nBad response from Google Sheets: \n${response}`);
  }
}

function start() {
  const t0 = performance.now();
  gapi.client.init(GAPI_PARAMS).then(() => {
      return gapi.client.sheets.spreadsheets.values.get(SHEET_PARAMS);
  }).then( response => {
    catchUndefinedResponses(response);
    createScheduleElements(response);
  }).then(() => {
    initSlickSlider();
  }, err => {  // Catch errors thrown by googleapi or a failed attempt at getting the sheet.
    console.error("Execute error", err);
    return document.getElementById('scheduleDiv').innerHTML = errorMessage;
  });
}
// Loads the JavaScript client library and invokes `start` afterwards.
//    Usage:
//  gapi.load('client', start);
export default start;
