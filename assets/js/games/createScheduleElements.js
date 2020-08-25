const PARENT = document.getElementById('scheduleDiv');

function appendCreatedElToParent(parentElement, tagString) {
  const el = document.createElement(tagString);

  parentElement.appendChild(el);
  return el;
}

function checkTime(time, timezone) {
  let timeIsTBD = time === 'TBD' || time === 'TBA' || time === 'tba' || time === 'tbd' || time === '';
  if (timeIsTBD) {
    return timezone = '';
  } else {
    return timezone;
  }
}

function createMonth(date) {
  const monthNames = [ // Define an array of the months to convert JS # value of month into short text version
    'Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'
  ];
  let dateArray = date.split('/');
  const jsMonth = dateArray[0] - 1;
  const month = monthNames[jsMonth];
  return month;
}

function createDay(date) {
  let day;
  const dateArray = date.split('/');
  dateArray[1] <= 9 ? day = 0 + dateArray[1] : day = dateArray[1];
  return day;
}

function setColorCode(status, where) {
  const red = '#c61f48';
  const blue = '#0f3b63';
  const grey = '#666';
  let color;
  const gameIsAtHome = where === 'Home';

  if (status === 'Cancelled') {
    color = grey;
  } else {
    gameIsAtHome ? color = red : color = blue;
  }
  return color;
}

function createLeftCol(parentEl, monthText, dayText, color) {
  const leftCol = document.createElement('div');
  const month = document.createElement('span');
  const day = document.createElement('span');
  const backgroundcolor = 'background-color:' + color + ';';

  month.classList.add('schedule-slider__m', 'd-block');
  day.classList.add('schedule-slider__day', 'd-block');
  leftCol.classList.add('schedule-slider__l', 'text-center', 'col-2');
  leftCol.setAttribute('style', backgroundcolor);
  month.innerHTML = monthText;
  day.innerHTML = dayText;
  leftCol.appendChild(month);
  leftCol.appendChild(day);
  parentEl.appendChild(leftCol);
  return leftCol;
}

function createTime(status, time, timezone) {

  let timeString;
  if ( status === 'Cancelled' ) {
    return timeString = 'Cancelled';
  } else {
    return timeString = time + ' ' + timezone;
  }
}

function createRightCol(parentEl, sportString, opponentTeam, where, timeString) {
  const rightCol = document.createElement('div');
  const sportWrapper = document.createElement('div');
  const sport = document.createElement('span');
  const opponent = document.createElement('span');
  const location = document.createElement('span');
  const time = document.createElement('span');

  rightCol.classList.add('schedule-slider__r', 'col-10');
  sportWrapper.classList.add('schedule-slider__sport--wrapper');
  sport.classList.add('schedule-slider__sport', 'd-block');
  opponent.classList.add('schedule-slider__opponent', 'd-block');
  location.classList.add('schedule-slider__where', 'd-block');
  time.classList.add('schedule-slider__time', 'd-block');
  sport.innerHTML = sportString;
  opponent.innerHTML = 'vs. ' + opponentTeam;
  location.innerHTML = where;
  time.innerHTML = timeString;
  sportWrapper.appendChild(sport);
  parentEl.appendChild(rightCol);
  rightCol.appendChild(sportWrapper);
  rightCol.appendChild(opponent);
  rightCol.appendChild(location);
  rightCol.appendChild(time);
  return rightCol;
}

function createSlidesInit(data) {
  const scheduleSlider = appendCreatedElToParent(PARENT, 'div');

  scheduleSlider.classList.add('schedule-slider');

  for (let i = 0, len = data.length; i < len; i++) {
    let rowData = data[i];
    const start = rowData[0];
    const end = rowData[1];
    const opponent = rowData[2];
    const status = rowData[6];
    const timezone = checkTime(rowData[3],rowData[4]);
    const time = createTime(status, rowData[3], timezone);
    const where  = rowData[5];
    const sport = rowData[8];
    const monthText = createMonth(start);
    const day = createDay(start);
    const color = setColorCode(status, where);

    const div = document.createElement('div');
    const slideRow = document.createElement('div');
    const leftCol = createLeftCol(slideRow, monthText, day, color);
    const rightCol = createRightCol(slideRow, sport, opponent, where, time);

    slideRow.classList.add('row', 'schedule-slider__row');

    div.appendChild(slideRow);
    scheduleSlider.appendChild(div);
  }
}

function createScheduleElements(response) {

  if ( ! document.getElementById('scheduleDiv') )
    return;

  const values = response.result.values;
  const valuesLength =  values.length;
  const data = values.slice(1, valuesLength);
  const noGamesHtml = '<div class="schedule-slider"><div><div class="row schedule-slider__row"><div class="schedule-slider__l text-center col-2" style="background-color:#999"></div><div class="schedule-slider__r col-10"><div class="schedule-slider__sport--wrapper"><span class="schedule-slider__sport d-block">&nbsp;</span></div><br><span class="schedule-slider__where d-block">Check back for upcoming games closer to the season.</span></div></div></div><div><div class="row schedule-slider__row"><div class="schedule-slider__l text-center col-2" style="background-color:#999"></div><div class="schedule-slider__r col-10"><div class="schedule-slider__sport--wrapper"><span class="schedule-slider__sport d-block">&nbsp;</span></div></div></div></div><div><div class="row schedule-slider__row"><div class="schedule-slider__l text-center col-2" style="background-color:#999"></div><div class="schedule-slider__r col-10"><div class="schedule-slider__sport--wrapper"><span class="schedule-slider__sport d-block">&nbsp;</span></div></div></div></div></div>';

  PARENT.innerHTML = '';

  data[0].toString() === '#N/A' ? PARENT.innerHTML = noGamesHtml : createSlidesInit(data);
}

export default createScheduleElements;
