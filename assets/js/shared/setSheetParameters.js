// Sheet Keys
const SCHEDULES_SHEET_ID = "13cd6P3Ze7bBJugzlQ2Uk2dFWc677wE68ghL94JZcnmI";
const ROSTER_SHEET_ID = "1odoxnNnm3ldZFpND9SDj6JhPXIct60FVJSFvcshX2aw";
const BASEBALL_STATS_SHEET_ID = '1CjI-KFAmasBUipURvXRtGuu6kWYbrNmo49VPeg7d6Os';
const MENS_BASKETBALL_STATS_SHEET_ID = '1zBMYYFRJLLgUu9XKR8voz37o5Nz1dMVAdfy3cj3W_PI';
const WOMENS_SOCCER_STATS_SHEET_ID = '1kh9ordjrIok0lrh8hcl8vE6TFUJIORU4T-sC_UC4STQ';
const SOCCER_STATS_SHEET_ID = '1CR7waySsJVjNEq7OuWGA7y1-FXWnE4hsvybYUg9l8cw';
const SOFTBALL_STATS_SHEET_ID = '1qZHyYT_fJE6jajEUjFJK8Z8yKYbu76YnJ9ec3Vzk-KM';
const VOLLEYBALL_STATS_ID = '1tzACDaWtF9Vohd20ooWsTxSyRaAxAKvpnvxmoO6biAI';
const WOMENS_BASKETBALL_STATS_SHEET_ID = '1-RkDZ4YpX4XGFvOL7jgXuCm_rLD843NjzPoWJ-Otnf8';
// Conditions
const urlIsBaseball = checkUrlForString('/baseball');
const urlIsMensBasketball = checkUrlForString('/mens-basketball');
const urlIsWomensSoccer = checkUrlForString('/womens-soccer');
const urlIsSoccer = checkUrlForString('/soccer');
const urlIsWomensBasketball = checkUrlForString('/womens-basketball');
const urlIsSoftball = checkUrlForString('/softball');
const urlIsVolleyball = checkUrlForString('/volleyball');
const urlIsRoster = checkUrlForString('/roster');
const urlIsSchedule = checkUrlForString('/schedule');
const urlIsStats = checkUrlForString('/stats');
const urlIsIndex = window.location.pathname === '/';

function checkUrlForString(string) {
  const url = window.location.href.replace(/(^\w+:|^)\/\//, '');

  return url.indexOf(string) !== -1 ? true : false;
}

function setId(params, i) {
  return params.spreadsheetId = i;  // `spreadsheetId` setting is specific to Google Sheets API
}

function setRange(params, r) {
  return params.range = r;  // `range` setting is specific to Google Sheets API
}

function setStatParams(params) {
  setRange(params, []);  // This is to set the range it all data in all the sheets of the workbook
  return params.includeGridData = false;  // `includeGridData' setting is specific to Google Sheets API
}

function checkIds(params, i) {
  urlIsRoster ? setId(params, ROSTER_SHEET_ID)
  : urlIsSchedule ? setId(params, SCHEDULES_SHEET_ID)
  : urlIsStats ? setStatsId(params)
  : setId(params, SCHEDULES_SHEET_ID);

  return params;
}

function checkRanges(params, r) {
  urlIsRoster || urlIsSchedule ? setRange(params, r)
  : urlIsStats ? setStatParams(params)
  : urlIsIndex ? setRange(params, r + ' Current')
  : setRange(params, r + ' Current');

  return params;
}

function setStatsId(params) {
  urlIsBaseball ? setId(params, BASEBALL_STATS_SHEET_ID)
  : urlIsMensBasketball ? setId(params, MENS_BASKETBALL_STATS_SHEET_ID)
  : urlIsWomensSoccer ? setId(params, WOMENS_SOCCER_STATS_SHEET_ID)
  : urlIsSoccer ? setId(params, SOCCER_STATS_SHEET_ID)
  : urlIsWomensBasketball ? setId(params, WOMENS_BASKETBALL_STATS_SHEET_ID)
  : urlIsSoftball ? setId(params, SOFTBALL_STATS_SHEET_ID)
  : urlIsVolleyball ? setId(params, VOLLEYBALL_STATS_ID)
  : null;

  return params;
}

function setParams(params, r) {
  checkIds(params, r);
  checkRanges(params, r);
}

function setSheetParameters() {
  let sheetParams = {}; // The thing we are here for

  urlIsBaseball ? setParams(sheetParams, 'Baseball')
  : urlIsMensBasketball ? setParams(sheetParams, 'Mens Basketball')
  : urlIsWomensBasketball ? setParams(sheetParams, 'Womens Basketball')
  : urlIsSoccer ? setParams(sheetParams, 'Soccer')
  : urlIsWomensSoccer ? setParams(sheetParams, 'Womens Soccer')
  : urlIsSoftball ? setParams(sheetParams, 'Softball')
  : urlIsVolleyball ? setParams(sheetParams, 'Volleyball')
  : setParams(sheetParams, 'All');
  console.log(sheetParams);
  return sheetParams;
}
//
//  USAGE:
//    const sheetParams = setSheetParameters();
//
module.exports = setSheetParameters;
