import getJsonSheetSources from '../old-roster/getJsonSheetSources.js'; // Returns an array of the URLs of all the Sheets JSON feeds script tags in the page.
import createTabs from './createTabs.js';
import createTabContent from './createTabContent.js';

function assembleTabs(parent, tabList, tabContent) {
  parent.append(tabList);
    parent.append(tabContent);
}

function requestJson(url, parent) {
  const ul = document.createElement('ul');
  const tabPanelDiv = document.createElement('div');
  let json;
  ul.classList.add('nav');
  ul.classList.add('nav-tabs');
  ul.setAttribute('id', 'baseballStatsTab');
  ul.setAttribute('role', 'tablist');
  tabPanelDiv.classList.add('tab-content');
  tabPanelDiv.setAttribute('id', 'baseballStatsTabContent');
  let request = new XMLHttpRequest();
  request.open("GET", url);
  request.onreadystatechange = function() {
    if(request.readyState === XMLHttpRequest.DONE && request.status === 200) {
      json = JSON.parse(request.responseText);
      //console.log(json);
      let tabList = createTabs(json, ul);
      let tabContent = createTabContent(json, tabPanelDiv);
      assembleTabs(parent, tabList, tabContent);
    }
  }
  request.send();
}

function loadJson(a, parent) {
  for (var i = 0, len = a.length; i < len; i++) {
    //console.log(a[i]);
    requestJson(a[i], parent);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const parent = document.getElementById('tabData');
  loadJson(getJsonSheetSources(), parent);
});
