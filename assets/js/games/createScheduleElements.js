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

function createSlides(html, data) {
  let newHtml = '';
  newHtml += '<div class="schedule-slider">';
  for (var r = 0; r < data.length; r++) {
    //console.log('Rows = ' + data[r]);
    let rowData = data[r];
      //rowData[i];
      const start = rowData[0];
      if ( start !== 'Start' && start !== undefined ) { // Filter out header cells (e.g. Start, End, Time, etc.) & empty cells (undefined) coming in from the sheet

      const end = rowData[1];
      const opponent = rowData[2];
      const time = rowData[3];
      const where  = rowData[5];
      const status = rowData[6];
      const summary  = rowData[7];
      const sport = rowData[8];
      const timezone = checkTime(rowData[3],rowData[4]);
      const monthText = createMonth(start);
      const day = createDay(start);
      const color = setColorCode(where);

      newHtml += '<div><div class="row schedule-slider__row">';
      newHtml += '<div class="schedule-slider__l text-center col-2" style="background-color:' + color + '">';
      newHtml += '<span class="schedule-slider__m d-block">' + monthText + '</span><span class="schedule-slider__day d-block">' + day + '</span>';
      newHtml += '</div><div class="schedule-slider__r col-10">';
      newHtml += '<div class="schedule-slider__sport--wrapper"><span class="schedule-slider__sport d-block">' + sport + '</span></div>';
      newHtml += '<span class="schedule-slider__opponent d-block">vs. ' + opponent + '</span>';
      newHtml += '<span class="schedule-slider__where d-block">' + where + '</span>';
      newHtml += '<span class="schedule-slider__time d-block">' + time + ' ' + timezone + '</span>';
      newHtml += '</div></div></div>';
    }
  }

  newHtml += '</div>';
  return html = newHtml;
}

function setNoGamesHtml(noGamesHtml) {
  return noGamesHtml = '<div class="schedule-slider"><div><div class="row schedule-slider__row"><div class="schedule-slider__l text-center col-2" style="background-color:#999"></div><div class="schedule-slider__r col-10"><div class="schedule-slider__sport--wrapper"><span class="schedule-slider__sport d-block">&nbsp;</span></div><br><span class="schedule-slider__where d-block">Check back for upcoming games closer to the season.</span></div></div></div><div><div class="row schedule-slider__row"><div class="schedule-slider__l text-center col-2" style="background-color:#999"></div><div class="schedule-slider__r col-10"><div class="schedule-slider__sport--wrapper"><span class="schedule-slider__sport d-block">&nbsp;</span></div></div></div></div><div><div class="row schedule-slider__row"><div class="schedule-slider__l text-center col-2" style="background-color:#999"></div><div class="schedule-slider__r col-10"><div class="schedule-slider__sport--wrapper"><span class="schedule-slider__sport d-block">&nbsp;</span></div></div></div></div></div>';
}

function zeroOutTimes(date) {
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
}

function badValuesFilter(value) {
  const THE_CHECK = value[0] === 'Start' || value[0] === '' ;
  if (THE_CHECK) {
    return false;
  } else {
    return true;
  }
}

function pastDatesFilter(value) {
  let today = new Date();
  let comparisonDateArr = value[0].split("/");
  console.log(comparisonDateArr);
  let comparisonDate = new Date(comparisonDateArr[2], comparisonDateArr[0] - 1, comparisonDateArr[1], 0, 0, 0);
  zeroOutTimes(today);
  if ( comparisonDate.getTime() <= today.getTime() ) {
    return true;
  } else {
    return false;
  }
}

function pushTabDataRows(row, valuesArr) {
  if ( row[0] !== 'Start' || row[0] !== undefined ) {
    return valuesArr.push(row);
  } else {
    return valuesArr;
  }
}

function loopOverTabDataRows(tabData, valuesArr) {
  for (var i = 0; i < tabData.length; i++) {
    let row = tabData[i];
    pushTabDataRows(row, valuesArr);
  }
}

function createValuesFromValueRanges(valueRanges) {
  let valuesArr = [];
  for (var i = 0; i < valueRanges.length; i++) {
    let tabData = valueRanges[i].values;
    loopOverTabDataRows(tabData, valuesArr);
  }

  let arrFilteredForBadValues = valuesArr.filter(badValuesFilter);
  let arrFilteredForPastDates = arrFilteredForBadValues.filter(pastDatesFilter);
  return arrFilteredForPastDates;
}

function setValues(response) {
  if (response.result.values) {
    return reponse.result.values;
  } else if (response.result.valueRanges) {
    return createValuesFromValueRanges(response.result.valueRanges);
  }
}

function createScheduleElements(response) {
  const noGamesHtml = '';
  let values = setValues(response);
  console.log(values);
  let data = values;
  let html = '';

  if (data !== undefined) {
    html += createSlides(html, data)
  }

  //setNoGamesHtml(noGamesHtml);

  const hostElement = document.getElementById('scheduleDiv');
  hostElement.innerHTML = html;
}
export default createScheduleElements;
