const camelCaseMe = require('./camelCase.js');
// Creates Bootstrap 4 tabed naviation w/ content from the JSON feed of a google sheet

function drawTabPanel(tabPanelDiv, tabTitle) {
  const tabPanel = document.createElement('div');
  const tHeading = document.createElement('h2');
  let tabTarget = camelCaseMe(tabTitle);
  tHeading.classList.add('main-heading');
  tHeading.classList.add('typography__main-heading--margin-top');
  tHeading.classList.add('text-center');
  tabPanel.classList.add('tab-pane');
  tabPanel.classList.add('fade');
  tabPanel.setAttribute('id', tabTarget);
  tabPanel.setAttribute('role', 'tabpanel');
  tabPanel.setAttribute('aria-labelledby', tabTarget + '-tab');
  tabPanel.append(tHeading);
  tabPanelDiv.append(tabPanel);
  return tabPanel;
}

function drawTable(parent) {
  var table = document.createElement('table');
  table.classList.add('display', 'table', 'table-striped', 'table-hover');
  table.setAttribute('width', '100%');
  table.setAttribute('id', 'responsiveTable');
  parent.append(table);
  return table;
}

function drawBody(table) {
  var tbody = document.createElement('tbody');
  table.append(tbody);
  return tbody;
}

function drawRow(tbody, cellData) {
  if (cellData == null) return null;
  if (cellData.length == 0) return null;
  var tr = document.createElement('tr');
  tbody.append(tr);
  for(var c=0; c<cellData.length; c++) {
    drawCell(tr, cellData[c]);
  }
  return tr;
}

function drawCell(tr, val) {
  const td = document.createElement('td');
  const valueNeedsColSpan = val.match(/^\*+\s/g);
  if (valueNeedsColSpan) {
    let asterisks = valueNeedsColSpan.join().trim();
    let asteriskArray = asterisks.split(/\*/g);
    let colSpan = asteriskArray.length;
    td.setAttribute('col-span', colSpan);
  }
  tr.append(td);
  td.append(val);
  return td;
}

function createTabContent(json, tabPanelDiv) {
  let spData = null;
  spData = json.feed.entry;
  let tabTitle = json.feed.title['$t'];
  let data = spData;
  let cellData = [];
  const tabPanel = drawTabPanel(tabPanelDiv, tabTitle);
  const table = drawTable(tabPanel);
  const tbody = drawBody(table);

  for(var r=0; r<data.length; r++) {
    const cell = data[r]['gs$cell'];
    const value = cell['$t'];
    const td = document.createElement('td');
    const valueNeedsColSpan = value.match(/^\*+\s/g);

    if ( value == '#NA!' ) { // if the cell is blank, put a space in it.
      value = ' ';
    }
    if ( cell.col == 1) {
      drawRow(tbody, cellData);
    }
  }
  cellData.push(value);
  return tabPanelDiv;
}
module.exports = createTabContent;
