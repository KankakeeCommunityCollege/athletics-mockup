function createModal(parent, id) {
  const modal = document.createElement('div');
  const modalId = id + 'Modal';
  modal.classList.add('modal', 'fade');
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-hidden', 'true');
  modal.setAttribute('tabindex', '-1');
  modal.setAttribute('aria-labelledby', id);
  modal.setAttribute('id', modalId);
  parent.appendChild(modal);
  return modal;
}

function createDoc(modal) {
  const doc = document.createElement('div');
  doc.classList.add('modal-dialog', 'modal-dialog-centered');
  doc.setAttribute('role', 'document');
  modal.appendChild(doc);
  return doc;
}

function createContent(doc) {
  const content = document.createElement('div');
  content.classList.add('modal-content');
  doc.appendChild(content);
  return content;
}

function createHeader(content) {
  const header = document.createElement('div');
  header.classList.add('modal-header');
  content.appendChild(header);
  return header;
}

function createButton() {
  const button = document.createElement('button');
  const x = document.createElement('span');
  x.setAttribute('aria-hidden', 'true');
  x.innerHTML = '&times;';
  button.classList.add('close');
  button.setAttribute('type', 'button');
  button.setAttribute('data-dismiss', 'modal');
  button.setAttribute('aria-label', 'close');
  button.appendChild(x);
  return button;
}

function createTitle(header, name, id) {
  const title = document.createElement('h5');
  const button = createButton();
  title.classList.add('modal-title');
  title.setAttribute('id', id);
  title.innerHTML = name + ' Bio';
  header.appendChild(title);
  header.appendChild(button);
  return title;
}

function createBody(content, name, modalContent) {
  const body = document.createElement('div');
  body.classList.add('modal-body');
  body.innerHTML = modalContent.join('');
  content.appendChild(body);
  return body;
}


function createPlayerImage(name, src, body) {
  const div = document.createElement('div');
  const img = document.createElement('img');
  let alt = 'Photo of player ' + name;
  let source = 'https://cdn.kcc.edu/athletics/roster-img/' + src + '.jpg';
  div.classList.add('text-center', 'float-md-left');
  img.setAttribute('alt', alt);
  img.setAttribute('src', source);
  img.classList.add('roster__img');
  div.appendChild(img);
  body.appendChild(div);
  return body;
}

function createNameHeading(name, jersey, body) {
  const h6 = document.createElement('h6');
  h6.classList.add('roster__player');
  const jerseyIsNotBlank = jersey !== '_na_';
  jerseyIsNotBlank ?
    h6.innerHTML = '#' + jersey + ' ' + name
    : h6.innerHTML = name;
  body.appendChild(h6);
  return body;
}

function createPlayerStats(cellCol, cellData) {
  const p = document.createElement('p');
  const cellIsBlank = cellData == ' ' || cellData === '_na_';

  function createStat(cellCol, cellData) {
    const span = document.createElement('span');
    const strong = document.createElement('strong');
    p.classList.add('mb-0'); //Bootstrap Class (margin-bottom: 0)
    strong.innerHTML = cellCol + ':';
    p.appendChild(strong);
    span.innerHTML = '&nbsp' + cellData;
    p.appendChild(span);
    return p;
  }

  cellIsBlank ? p.innerHTML = ''
  : createStat(cellCol, cellData);
  return p;
}

function createModalFooter(content) {
  const div = document.createElement('div');
  const button = document.createElement('button');
  div.classList.add('modal-footer');
  button.setAttribute('type', 'button');
  button.setAttribute('data-dismiss', 'modal');
  button.classList.add('btn', 'btn-secondary');
  button.innerHTML = 'Close';
  div.appendChild(button);
  content.appendChild(div);
  return content;
}

function createModalElements(response) {
  //console.log(response);
  const parent = document.getElementById('modalDiv');

  const data = response.result.values;
  const headingData = data[1];
  const dataLength = data.length;
  const validData = data.slice(2, dataLength);

  for (var i = 0; i < validData.length; i++) {
    let rowData = validData[i];
    let modalContent = [];
    let stat = headingData[i];
    let src = rowData[0].trim();
    let jersey = rowData[1].trim();
    let name = rowData[2].trim();

    const isNotFirstThreeColumns = i >= 4;

    let id = name.replace(/[\W_]+/g, '');
    const modal = createModal(parent, id);
    const doc = createDoc(modal);
    const content = createContent(doc);
    const header = createHeader(content);
    const title = createTitle(header, name, id);
    const body = createBody(content, name, modalContent);
    const playerImg =  createPlayerImage(name, src, body)
    const nameHeading = createNameHeading(name, jersey, body);
    let playerStatsArray = [];

    for (var r = 2; r < rowData.length; r++) {
      let cellData = rowData[r];
      let cellCol = headingData[r];
      const playerStats = createPlayerStats(cellCol, cellData);
      playerStatsArray.push(playerStats);
    }

    function wrapStats(playerStatsArray, body) {
      const p = document.createElement('p');
      for (var x = 0; x < playerStatsArray.length; x++) {
        let statItem = playerStatsArray[x];
        p.appendChild(statItem);
      }
      body.appendChild(p);
      return body;
    }
    wrapStats(playerStatsArray, body);
    const footer = createModalFooter(content);

  }

}
export default createModalElements;
