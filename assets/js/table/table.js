import start from './tableSheetsAPI.js';
//import './scheduleTable.js';

document.addEventListener('DOMContentLoaded', function() {
  gapi.load('client', start);
});
