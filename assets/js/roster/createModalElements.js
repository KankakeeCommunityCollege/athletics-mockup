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

function createModalElements(response) {
  //console.log(response);
  const parent = document.getElementById('modalDiv');


  const data = response.result.values;
  const headingData = data[0];
  const dataLength = data.length;
  //const headingDataCopy = headingData.slice(0);
  const validData = data.slice(1, dataLength);



  for (var i = 0; i < validData.length; i++) {
    //console.log('headingDataCopy ' + headingDataCopy);
    let modalContent = [];
    let playerStats = [];
    let rowData = validData[i];
    let stat = headingData[i];
    let src = rowData[0].trim();
    let jersey = rowData[1].trim();
    let name = rowData[2].trim();

    let playerStat = '<span><strong>' + rowData + '</strong>&nbsp;' + headingData + '</span>'
    let img = '<div class="text-center float-md-left"><img alt="Photo of player ' + name + '" class="roster__img" src="/uploads/roster-img/' + src + '.jpg"></div>';
    let nameH6 = '<h6 class="roster__player">#' + jersey + ' ' + name + '</h6>';
    let statistic = '<span><strong>' + stat + '</strong>&nbsp;' + rowData + '</span><br>';
    const isNotFirstThreeColumns = i >= 4;
    playerStats.push(statistic);
    modalContent.push(img, nameH6);
    console.log('STATISTIC ' + playerStats);

    // ==================================================================================
    //  \   /\   / - e - s
    // ==================================================================================
    //   \/   \/
    // ==================================================================================
    //
    // ==================================================================================
    //
    // ==================================================================================
    // TODO: Create modal's content containing list of player's stats.
    //==================================================================================
    //
    //==================================================================================
    //
    //==================================================================================
    //
    //==================================================================================
    //
    //==================================================================================

    console.log('headingData: ' + headingData[i]);



    //console.log('STATS' + playerStats);
    //playerStatsHTML = '<p>' + playerStats.join('') + '</p>';
    //modalContent.push(playerStatsHTML);
    //modalContent = modalContent.join('');

    //name ? console.log('Name -> ' + name): null;
    //const modalContent = '<p>Modal content....</p>';
    //console.log('modalContent => ' + modalContent);

    //let position = '<span><strong>Position: </strong>' + rowData[3].trim() + '</span><br>';
    //let height = '<span><strong>Height: </strong>' + rowData[4].trim() + '</span><br>';
    //let weight = '<span><strong>Weight: </strong>' + rowData[5].trim() + '</span><br>';
    //let bat = '<span><strong>Bat-Throw: </strong>' + rowData[6].trim() + '</span><br>';
    //let year = '<span><strong>Class: </strong>' + rowData[7].trim() + '</span><br>';
    //let hs = '<span><strong>High School: </strong>' + rowData[8].trim() + '</span><br>';
    //let town = '<span><strong>Hometown: </strong>' + rowData[9].trim() + '</span><br>';
    //let bio = '<span><strong>Bio: </strong>' + rowData[10].trim() + '</span>';
    //let modalContent = imgHTML + '<p>' + nameH6 + year + weight + height + town + hs + bio + '</p>'
    //console.log(playerStats);
    let id = name.replace(/[\W_]+/g, '');
    const modal = createModal(parent, id);
    const doc = createDoc(modal);
    const content = createContent(doc);
    const header = createHeader(content);
    const title = createTitle(header, name, id);
    const body = createBody(content, name, modalContent);
  }

}
module.exports = createModalElements;
