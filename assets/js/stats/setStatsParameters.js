function setStatsParameters(rangeArray) {
  let sheetParams = {}; // The thing we are here for
  const host = window.location.host + '/';
  const url = window.location.href.replace(/(^\w+:|^)\/\//, '');
  // Conditions
  const urlIsBaseball = url.indexOf('/baseball') > -1;
  const urlIsMensBasketball = url.indexOf('/mens-basketball') > -1;
  const urlIsWomensSoccer = url.indexOf('/womens-soccer') > -1;
  const urlIsSoccer = url.indexOf('/soccer') > -1;
  const urlIsWomensBasketball = url.indexOf('/womens-basketball') > -1;
  const urlIsSoftball = url.indexOf('/softball') > -1;
  const urlIsVolleyball = url.indexOf('/volleyball') > -1;
  const urlIsStats = url.indexOf('/stats') > -1;
  // Sheet Keys
  const baseballStatsId = '1CjI-KFAmasBUipURvXRtGuu6kWYbrNmo49VPeg7d6Os';
  const mensBasketballStatsId = '1zBMYYFRJLLgUu9XKR8voz37o5Nz1dMVAdfy3cj3W_PI';
  const womensSoccerStatsId = '1kh9ordjrIok0lrh8hcl8vE6TFUJIORU4T-sC_UC4STQ';
  const soccerStatsId = '1CR7waySsJVjNEq7OuWGA7y1-FXWnE4hsvybYUg9l8cw';
  const softballStatsId = '1qZHyYT_fJE6jajEUjFJK8Z8yKYbu76YnJ9ec3Vzk-KM';
  const volleyballStatsId = '1tzACDaWtF9Vohd20ooWsTxSyRaAxAKvpnvxmoO6biAI';
  const womensBasketballStatsId = '1-RkDZ4YpX4XGFvOL7jgXuCm_rLD843NjzPoWJ-Otnf8';

  function setId(i) {
    sheetParams.spreadsheetId = i;
  }

  function setRange(r) {
    sheetParams.ranges = r;
  }

  function setStatsId() {
    urlIsBaseball ? setId(baseballStatsId)
    : urlIsMensBasketball ? setId(mensBasketballStatsId)
    : urlIsWomensSoccer ? setId(womensSoccerStatsId)
    : urlIsSoccer ? setId(soccerStatsId)
    : urlIsWomensBasketball ? setId(womensBasketballStatsId)
    : urlIsSoftball ? setId(softballStatsId)
    : urlIsVolleyball ? setId(volleyballStatsId)
    : null;
  }

  function setParams(r) {
    setStatsId();
    setRange(r);
  }

  setParams(rangeArray); // AAAaaahhhh, the first actual call to anything

  //console.log(sheetParams);
  return sheetParams;
}
//
//  USAGE:
//    const sheetParams = setSheetParameters();
//
export default setStatsParameters;
