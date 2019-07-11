import createTabTable from './createTabTable.js';
import testForMarkdown from './markdownify.js';

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
  //console.log(response); // response the JS Object containing Sheet workbook's data that's returned from the Sheets API.
  // 'response' is actually a batchResponse from API's `.batchGet()` method
  let sheetData = response.result.valueRanges; // Array of JS Objects. Each Object represents a Sheet tab.
  const parent = document.getElementById('data');
  const ul = createTabsUl();
  const tabContent = createTabContent();

  for (let i = 0; i < sheetData.length; i++) {
    let tabData = sheetData[i]; // JS Object
    //console.log(tabData);
    let tabName = tabData.range.match(/^'.+'!/g).toString().replace(/'|!/g, ''); // Extract the Name from the A1 Range ('Sheet 1',!A1-H999) notation in the Object.
    let tabValues = tabData.values; // Is an array of arrays respresented in the comment below...
    //
    // tabValues is an array containing 1 array for each row:
    //
    // tabvalues = [
    //                ['<cell-value>', '<cell-value>', '<cell-value>'], // row
    //                ['<cell-value>', '<cell-value>', '<cell-value>'], // row
    //                ['<cell-value>', '<cell-value>', '<cell-value>'] // row
    //            ]
    //
    //console.log(tabValues);
    //
    let tableData;
    let blurb = null;
    let firstRow = tabValues[0].toString();
    //console.log(firstRow);
    let tabValuesLength = tabValues.length;
    let reg = /^>>>/g;
    if ( firstRow.search(reg) !== -1 ) {
      tableData = tabValues.splice(1, tabValuesLength);
      blurb = tabValues.splice(0,1);
    } else {
      tableData = tabValues;
    }
    const blurbIsNotNull = blurb !== null;

    blurbIsNotNull ?
      blurb = testForMarkdown(blurb)
    : null;

    let ulWithTabs = createTabLinks(tabName, ul, i);
    let tabPane = createTabPane(tabName, i);
    let tabPaneWithTable = createTabTable(tabPane, tableData, tabName, blurb);

    assembleTabbedNav(parent, ulWithTabs, tabContent, tabPaneWithTable); // Wonder twins UNITE!
  }
}
export default createTabHTML;
