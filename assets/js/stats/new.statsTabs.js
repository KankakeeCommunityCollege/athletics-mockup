import getJsonSheetSources from '../roster/getJsonSheetSources.js'; // Returns an array of the URLs of all the Sheets JSON feeds script tags in the page.
//import parseSheet from './createTableElements.js';
//import drawModals from './createModalElements.js';
import lazyLoad from '../stats/lazyload.js';

function requestJson(url, parent, resolve, modalParent) {
  let json;
  let request = new XMLHttpRequest();
  request.open("GET", url);
  request.onreadystatechange = function() {
    if(request.readyState === XMLHttpRequest.DONE && request.status === 200) {
      json = JSON.parse(request.responseText);
      const feedIsCells = url.indexOf('/feeds/cells/') > -1;
      if (feedIsCells) {
        parseSheet(json, parent);
      } else {
        drawModals(json, modalParent);
      }
      //console.log(json);
      resolve();
    }
  }
  request.send();
}

function loadJson(a, parent, resolve) {
  for (var i = 0, len = a.length; i < len; i++) {
    return requestJson(a[i], parent, resolve);
  }
}

function makeListFeedUrls(a, modalParent, resolve) {
  for (var i = 0, len = a.length; i < len; i++) {
    let listUrl = a[i].replace('/feeds/cells/', '/feeds/list/');
    //console.log(listUrl);
    return requestJson(listUrl, modalParent, resolve);
  }
}

function addData(resolve) {
  $('#responsiveTable').DataTable( {
    responsive: true, // Activate responsive powers GO!
    paging: false, // Don't paginate. Schedule schould all be on one page
    'order': [[1, 'asc']], // Initial column ordering
    'columnDefs': [
      { 'visible': false, 'targets': 0 }
    ]
  } );
  resolve();
}

document.addEventListener('DOMContentLoaded', function() {
  const parent = document.getElementById('data');
  const modalParent = document.getElementById('modalDiv');
  let buildTablePromise = new Promise(function(resolve, reject) {
    parent.innerHTML = '';
    loadJson(getJsonSheetSources(), parent, resolve);
  });
  buildTablePromise.then(function() {
    let tableSearchPromise = new Promise(function(resolve, reject) {
      addData(resolve);
    });
    tableSearchPromise.then(function() {
      document.querySelector('input[type="search"].form-control').setAttribute('placeholder', 'Search Roster...');
      let lazyLoadPromise = new Promise(function(resolve, reject) {
        makeListFeedUrls(getJsonSheetSources(), modalParent, resolve);
      });
      lazyLoadPromise.then(function() {
        lazyLoad();
      });
    });
  });
  //loadJson(getJsonSheetSources());
  //readData(document.getElementById('data'));
});
