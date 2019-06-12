function setSheetParameters() {
  let sheetParams = {}; // The thing we are here for
  const host = window.location.host + '/';
  const url = window.location.href.replace(/(^\w+:|^)\/\//, '');
  // Conditions
  const urlIsBaseball = url.indexOf('/baseball') > -1;
  const urlIsMensBasketball = url.indexOf('/mens-basketball') > -1;
  const urlIsSoccer = url.indexOf('/soccer') > -1;
  const urlIsWomensBasketball = url.indexOf('/womens-basketball') > -1;
  const urlIsSoftball = url.indexOf('/softball') > -1;
  const urlIsVolleyball = url.indexOf('/volleyball') > -1;
  const urlIsIndex = url === host;
  let sheet;
  function setSheet() {
    urlIsBaseball ? sheet = "Baseball Current"
    : urlIsMensBasketball ? sheet = "Mens Basketball Current"
    : urlIsSoccer ? sheet = "Soccer Current"
    : urlIsWomensBasketball ? sheet = "Womens Basketball Current"
    : urlIsSoftball ? sheet = "Softball Current"
    : urlIsVolleyball ? sheet = "Volleyball Current"
    : urlIsIndex? sheet = "All Current"
    : sheet = null;
    return sheet;
  }

  sheetParams.spreadsheetId = "13cd6P3Ze7bBJugzlQ2Uk2dFWc677wE68ghL94JZcnmI";
  sheetParams.range = setSheet();
  //console.log(sheetParams);
  return sheetParams;
}
//
//  USAGE:
//    const sheetParams = setSheetParameters();
//
module.exports = setSheetParameters;
