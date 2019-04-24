import getJsonSheetSources from './getJsonSheetSources.js';
import requestJson from './requestJson.js';

function loadJson(a) {
  for (var i = 0, len = a.length; i < len; i++) {
      return requestJson(a[i]);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  loadJson(getJsonSheetSources());
});
