
function setRangesValue(rangesValue) {
  return rangesValue.push('Baseball','Mens Basketball', 'Soccer', 'Womens Basketball', 'Softball', 'Volleyball');
}

function setRanges(params) {
  let rangesValue = [];
  setRangesValue(rangesValue);
  params.ranges = rangesValue;
  return params;
}

function setSpreadsheetId(params) {
  return params.spreadsheetId = '13cd6P3Ze7bBJugzlQ2Uk2dFWc677wE68ghL94JZcnmI';
}

function setValueRenderOption(params) {
  return params.valueRenderOption = 'FORMATTED_VALUE';
}

function setBatchGetParameters() {
  let params = {};

  setSpreadsheetId(params);
  setRanges(params);
  setValueRenderOption(params);
  return params;
}

export default setBatchGetParameters;
