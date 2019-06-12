function createMonth(date) {
  const monthNames = [ // Define an array of the months to convert JS # value of month into short text version
    'Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'
  ];
  let dateArray = date.split('/');
  const jsMonth = dateArray[0] - 1;
  const month = monthNames[jsMonth];
  return month;
}

function setColorCode(where) {
  const red = '#c61f48';
  const blue = '#0f3b63';
  let color;
  const gameIsAtHome = where === 'Home';
  gameIsAtHome ? color = red : color = blue;
  return color;
}

function createDay(date) {
  let day;
  const dateArray = date.split('/');
  dateArray[1] <= 9 ? day = 0 + dateArray[1] : day = dateArray[1];
  return day;
}

function createScheduleElements(response) {
  const noGamesHtml = '<div class="schedule-slider"><div><div class="row schedule-slider__row"><div class="schedule-slider__l text-center col-2" style="background-color:#999"></div><div class="schedule-slider__r col-10"><div class="schedule-slider__sport--wrapper"><span class="schedule-slider__sport d-block">&nbsp;</span></div><br><span class="schedule-slider__where d-block">Check back for upcoming games closer to the season.</span></div></div></div><div><div class="row schedule-slider__row"><div class="schedule-slider__l text-center col-2" style="background-color:#999"></div><div class="schedule-slider__r col-10"><div class="schedule-slider__sport--wrapper"><span class="schedule-slider__sport d-block">&nbsp;</span></div></div></div></div><div><div class="row schedule-slider__row"><div class="schedule-slider__l text-center col-2" style="background-color:#999"></div><div class="schedule-slider__r col-10"><div class="schedule-slider__sport--wrapper"><span class="schedule-slider__sport d-block">&nbsp;</span></div></div></div></div></div>';
  let values = response.result.values;
  let valuesLength =  values.length;
  let data = values.slice(1, valuesLength);
  let html = '';

  data[0].toString() === '#N/A' ? html += noGamesHtml : createSlides();

  function createSlides() {
    html += '<div class="schedule-slider">';
    for (var r = 0; r < data.length; r++) {
      //console.log('Rows = ' + data[r]);
      let rowData = data[r];
        //rowData[i];
        const start = rowData[0];
        const end = rowData[1];
        const opponent = rowData[2];
        const time = rowData[3];
        const timezone  = rowData[4];
        const where  = rowData[5];
        const status = rowData[6];
        const summary  = rowData[7];
        const sport = rowData[8];
        const monthText = createMonth(start);
        const day = createDay(start);
        const color = setColorCode(where);

        html += '<div><div class="row schedule-slider__row">';
        html += '<div class="schedule-slider__l text-center col-2" style="background-color:' + color + '">';
        html += '<span class="schedule-slider__m d-block">' + monthText + '</span><span class="schedule-slider__day d-block">' + day + '</span>';
        html += '</div><div class="schedule-slider__r col-10">';
        html += '<div class="schedule-slider__sport--wrapper"><span class="schedule-slider__sport d-block">' + sport + '</span></div>';
        html += '<span class="schedule-slider__opponent d-block">vs. ' + opponent + '</span>';
        html += '<span class="schedule-slider__where d-block">' + where + '</span>';
        html += '<span class="schedule-slider__time d-block">' + time + timezone + '</span>';
        html += '</div></div></div>';
    }

    html += '</div>';
  }

  const hostElement = document.getElementById('scheduleDiv');
  hostElement.innerHTML = html;
}
export default createScheduleElements;
