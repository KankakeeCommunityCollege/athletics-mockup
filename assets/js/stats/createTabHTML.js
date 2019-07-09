import createTabTable from './createTabTable.js'

function createTabsUl() {
  const ul = document.createElement('ul');
  ul.classList.add('nav', 'nav-tabs');
  ul.setAttribute('id', 'statisticTabs');
  ul.setAttribute('role', 'tablist');
  return ul;
}

function createTabContent() {
  const tabContent = document.createElement('div');
  tabContent.classList.add('tab-content');
  tabContent.setAttribute('id', 'statisticTabContent');
  return tabContent;
}

function createTabPane(tabName, i) {
  const tabPane = document.createElement('div');
  const h2 = document.createElement('h2');
  const tabLabel = tabName.toLowerCase().replace(/\s|\//g, '-')
  const tabId = tabLabel + '-tab';
  const tabIsFirstTab = i == 0;
  h2.classList.add('main-heading', 'typography__main-heading--margin-top', 'text-center');
  h2.innerHTML = tabName;
  tabIsFirstTab ? tabPane.classList.add('show', 'active') : null;
  tabPane.classList.add('tab-pane', 'fade');
  tabPane.setAttribute('id', tabLabel);
  tabPane.setAttribute('role', 'tabpanel');
  tabPane.setAttribute('aria-labelledby', tabId);
  tabPane.appendChild(h2);
  return tabPane;
}

function createTabLinks(tabName, ul, i) {
  function setActive() {
    ariaSelected = 'true';
    a.classList.add('active');
  }
  const tabLabel = tabName.toLowerCase().replace(/\s|\//g, '-')
  const tabId = tabLabel + '-tab';
  let ariaSelected;
  const li = document.createElement('li');
  const a = document.createElement('a');
  const tabIsFirstTab = i == 0;
  //console.log(tabId);
  li.classList.add('nav-tabs');
  a.classList.add('nav-link');
  tabIsFirstTab ? setActive() : ariaSelected = 'false';
  a.setAttribute('href', '#' + tabLabel);
  a.setAttribute('data-toggle', 'tab');
  a.setAttribute('aria-selected', ariaSelected);
  a.setAttribute('id', tabId);
  a.setAttribute('role', 'tab');
  a.setAttribute('aria-controls', tabLabel);
  a.innerHTML = tabName;
  li.appendChild(a);
  ul.appendChild(li);
  return ul;
}

function assembleTabbedNav(parent, ulWithTabs, tabContent, tabPaneWithTable) {
  parent.innerHTML = '';
  parent.appendChild(ulWithTabs);
  tabContent.appendChild(tabPaneWithTable);
  parent.appendChild(tabContent);
}

function createTabHTML(response) {
  let sheetData = response.result.valueRanges;
  const parent = document.getElementById('data');
  const ul = createTabsUl();
  const tabContent = createTabContent();

  for (let i = 0; i < sheetData.length; i++) {
    let tabData = sheetData[i];
    let tabName = tabData.range.match(/^'.+'!/g).toString().replace(/'|!/g, '');
    let tabValues = tabData.values;
    //
    // tabValues is an array of arrays for each row
    //
    //  i.e.
    //      [
    //        ['cell', 'cell', 'cell'], // row
    //        ['cell', 'cell', 'cell'], // row
    //        ['cell', 'cell', 'cell'] // row
    //      ]
    //
    //console.log(tabValues);
    //
    let ulWithTabs = createTabLinks(tabName, ul, i);
    let tabPane = createTabPane(tabName, i);
    let tabPaneWithTable = createTabTable(tabPane, tabValues, tabName);
    //console.log(tabPaneWithTable);
    assembleTabbedNav(parent, ulWithTabs, tabContent, tabPaneWithTable); // Wonder twins UNITE!
  }
}
export default createTabHTML;
