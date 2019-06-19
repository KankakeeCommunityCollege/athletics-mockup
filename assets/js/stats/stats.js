import start from './statsSheetsAPI.js';

document.addEventListener('DOMContentLoaded', function() {
  gapi.load('client', start);
});
