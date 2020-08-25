const SCHEDULES_SHEET_ID = "13cd6P3Ze7bBJugzlQ2Uk2dFWc677wE68ghL94JZcnmI";
const SHEET_NAME = 'All Current';
const RANGE = '!A1:I7';

function setParameter(parameter, value, params) {
  return params.parameter = value;
}

function setGamesParameters() {

  if ( ! document.getElementById('scheduleDiv'))
    return;

  const parameters = {};
  const path = window.location.pathname
  
  setParameter('spreadsheetId', SCHEDULES_SHEET_ID, parameters);
  
  path == '/' ? setParameter('range', SHEET_NAME + RANGE, parameters)
  : path.indexOf('baseball') !== -1 ? setParameter('range', 'Baseball Current') : null;
}

export default setGamesParameters;