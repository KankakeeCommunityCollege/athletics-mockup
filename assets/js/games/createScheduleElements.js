const PARENT = document.getElementById('scheduleDiv');

function createTime(status, time, timezone) {
  let timeString;

  status === 'Cancelled' ?
    timeString = 'Cancelled'
  : time === 'TBD' || time === 'TBA' || time === 'tba' || time === 'tbd' || time === '' ?
    timeString = 'TBD'
  : timeString = time + ' ' + timezone;
  
  return timeString;
}

function setColorCode(status, where) {
  const red = '#c61f48';
  const blue = '#0f3b63';
  const grey = '#666';
  let color;

  status === 'Cancelled' ? color = grey
  : where === 'Home' ? color = red
  : color = blue;
  
  return color;
}

function createMonth(date) {
  const monthNames = [ // Define an array of the months to convert JS # value of month into short text version
    'Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'
  ];
  const dateArray = date.split('/');

  return monthNames[dateArray[0] - 1];
}

function createDay(date) {
  const dateArray = date.split('/');
  let day;
  
  return dateArray[1] <= 9 ? day = 0 + dateArray[1] : day = dateArray[1];
}

function createSlideInfo(row, html) {
  let [start, , opponent, time, timezone, location, status, , sport] = row;

  html += `
<div class="schedule-slider__l text-center col-2" style="background-color:${setColorCode(status, location)};">
  <span class="schedule-slider__m d-block">${createMonth(start)}</span>
  <span class="schedule-slider__day d-block">${createDay(start)}</span>
</div>
<div class="schedule-slider__r col-10">
  <div class="schedule-slider__sport--wrapper">
    <span class="schedule-slider__sport d-block">${sport}</span>
  </div>
  <span class="schedule-slider__opponent d-block">vs. ${opponent}</span>
  <span class="schedule-slider__where d-block">${location}</span>
  <span class="schedule-slider__time d-block">${createTime(status, time, timezone)}</span>
</div>`;
  return html;
}

function createSlide(row, html) {
  html += `
<div>
  <div class="row schedule-slider__row">
    ${createSlideInfo(row, html)}
  </div>
</div>`;
  return html;
}

function createSlidesInit(data) {
  let html = '';
  let htmlArray = data.map(row => createSlide(row, html));
  let slides = htmlArray.join('');

  html += '<div class="schedule-slider">';
  html += slides;
  html += '</div>';
  
  PARENT.innerHTML = html;
}

function createScheduleElements(response) {
  const values = response.result.values;
  const valuesLength =  values.length;
  const data = values.slice(1, valuesLength);
  const noGamesHtml = '<div class="schedule-slider"><div><div class="row schedule-slider__row"><div class="schedule-slider__l text-center col-2" style="background-color:#999"></div><div class="schedule-slider__r col-10"><div class="schedule-slider__sport--wrapper"><span class="schedule-slider__sport d-block">&nbsp;</span></div><br><span class="schedule-slider__where d-block">Check back for upcoming games closer to the season.</span></div></div></div><div><div class="row schedule-slider__row"><div class="schedule-slider__l text-center col-2" style="background-color:#999"></div><div class="schedule-slider__r col-10"><div class="schedule-slider__sport--wrapper"><span class="schedule-slider__sport d-block">&nbsp;</span></div></div></div></div><div><div class="row schedule-slider__row"><div class="schedule-slider__l text-center col-2" style="background-color:#999"></div><div class="schedule-slider__r col-10"><div class="schedule-slider__sport--wrapper"><span class="schedule-slider__sport d-block">&nbsp;</span></div></div></div></div></div>';

  PARENT.innerHTML = '';
  data[0].toString() === '#N/A' ? PARENT.innerHTML = noGamesHtml : createSlidesInit(data);
}

export default createScheduleElements;
