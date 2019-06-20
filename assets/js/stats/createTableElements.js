function createTableElements(response) {

  function createTabList(parent) {
    const tabList = document.createElement('ul');
    tabList.classList.add('nav', 'nav-tabs');
    tabList.setAttribute('id', 'statisticTabs');
    tabList.setAttribute('role', 'tablist');
    console.log(parent);
    parent.appendChild(tabList);
    return tabList;
  }

  function createTabContent(parent) {
    const tabContent = document.createElement('div');
    tabContent.classList.add('tab-content');
    tabContent.setAttribute('id', 'statisticTabContent');
    return tabContent;
  }

  function createTabPane(tabContent, tabName, tabCount) {
    const tabLabel = tabName.toLowerCase().replace(/\s|\//g, '-')
    const tabId = tabLabel + '-tab';
    const tabPane = document.createElement('div');
    tabPane.classList.add('tab-pane', 'fade');
    tabPane.setAttribute('id', tabLabel);
    tabContent.appendChild(tabPane);
  }

  function createTabLink(tabName, tabList, tabCount) {
    const tabLabel = tabName.toLowerCase().replace(/\s|\//g, '-')
    const tabId = tabLabel + '-tab';
    let ariaSelected;
    const li = document.createElement('li');
    const a = document.createElement('a');
    console.log(tabId);
    tabCount == 0 ? ariaSelected = 'true' : ariaSelected = 'false';
    li.classList.add('nav-tabs');
    a.classList.add('nav-link');
    a.setAttribute('href', '#' + tabLabel);
    a.setAttribute('data-toggle', 'tab');
    a.setAttribute('aria-selected', ariaSelected);
    a.setAttribute('id', tabId);
    a.setAttribute('role', 'tab');
    a.setAttribute('aria-controls', tabLabel);
    li.appendChild(a);
    tabList.appendChild(li);
    return li;
  }

  function createTableElement(parent) {
    const table = document.createElement('table');
    table.classList.add('table', 'table-striped', 'table-hover');
    table.setAttribute('width', '100%');
    table.setAttribute('id', 'responsiveTable');
    parent.innerHTML = '';
    parent.appendChild(table);
    return table;
  }

  function createTableHeadingElement(table) {
    const thead = document.createElement('thead');
    table.appendChild(thead);
    return thead;
  }

  function createTableBodyElement(table) {
    const tbody = document.createElement('tbody');
    table.appendChild(tbody);
    return tbody;
  }

  function createHeadingCells(tr, val) {
    const th = document.createElement('th');
    tr.appendChild(th);
    val === 'Image' || val === 'Bio' || val === 'Intended Major' || val === 'High School Coach' || val === 'Parents' || val === 'Siblings' ? th.classList.add('none') // Add DataTable's 'all' & 'none' classes.
    : val === 'Jersey' || val === 'player' ? th.classList.add('all') // Add DataTable's 'all' & 'none' classes.
    : null;
    val = val + ':';
    th.innerHTML = val;
    return th;
  }

  function createHeadingRow(thead, data) {
    const tr = document.createElement('tr');
    thead.appendChild(tr);
    for (var i = 0; i < data.length; i++) {
      createHeadingCells(tr, data[i]);
    }
    return tr;
  }

  function createBodyRow(tbody, data, id) {
    const tr = document.createElement('tr');
    tbody.appendChild(tr);
    for (var i = 0; i < data.length; i++) {
      createCells(tr, data[i], id);
    }
    return tr;
  }

  function createCells(tr, val, id) {
    const td = document.createElement('td');
    tr.appendChild(td);
    td.innerHTML = val;
    return td;
  }
  // Handle the results here (response.result has the parsed body).
  //console.log("Response", response.result);
  let sheetData = response.result.valueRanges;
  const parent = document.getElementById('data');
  const tabList = createTabList(parent);
  console.log(sheetData);

  for (let i = 0; i < sheetData.length; i++) {
    let tabData = sheetData[i];
    let tabName = tabData.range.match(/^'.+'!/g).toString().replace(/'|!/g, '');
    let tabValues = tabData.values;
    let tabCount = i;

    const tabLink = createTabLink(tabName, tabList, tabCount);

    const tabContent = createTabContent(parent);
    const tabPane = createTabPane(tabContent, tabName, tabCount)
    //const table = createTableElement(parent);
    //const thead = createTableHeadingElement(table);
    //const tbody = createTableBodyElement(table);

    //console.log(tabData);
    for (var r = 0; r < tabValues.length; r++) {
      let row = tabValues[r];
      //console.log(row);
    }
    //createBodyRow(tbody, tableData[i], id);
  }
}
export default createTableElements;
