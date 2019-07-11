/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./assets/js/table/table.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/js/shared/setSheetParameters.js":
/*!************************************************!*\
  !*** ./assets/js/shared/setSheetParameters.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function setSheetParameters() {\n  var sheetParams = {}; // The thing we are here for\n\n  var host = window.location.host + '/';\n  var url = window.location.href.replace(/(^\\w+:|^)\\/\\//, ''); // Conditions\n\n  var urlIsBaseball = url.indexOf('/baseball') > -1;\n  var urlIsMensBasketball = url.indexOf('/mens-basketball') > -1;\n  var urlIsSoccer = url.indexOf('/soccer') > -1;\n  var urlIsWomensBasketball = url.indexOf('/womens-basketball') > -1;\n  var urlIsSoftball = url.indexOf('/softball') > -1;\n  var urlIsVolleyball = url.indexOf('/volleyball') > -1;\n  var urlIsRoster = url.indexOf('/roster') > -1;\n  var urlIsSchedule = url.indexOf('/schedule') > -1;\n  var urlIsStats = url.indexOf('/stats') > -1;\n  var urlIsIndex = url === host; // Sheet Keys\n\n  var gamesId = \"13cd6P3Ze7bBJugzlQ2Uk2dFWc677wE68ghL94JZcnmI\";\n  var rosterId = \"1odoxnNnm3ldZFpND9SDj6JhPXIct60FVJSFvcshX2aw\";\n  var baseballStatsId = '1f7iwZCQc5uVmBDiGxmuCp8O4Y_7gT2IybWpIJlYGQbI';\n  var mensBasketballStatsId = '1zBMYYFRJLLgUu9XKR8voz37o5Nz1dMVAdfy3cj3W_PI';\n  var soccerStatsId = '1CR7waySsJVjNEq7OuWGA7y1-FXWnE4hsvybYUg9l8cw';\n  var softballStatsId = '1qZHyYT_fJE6jajEUjFJK8Z8yKYbu76YnJ9ec3Vzk-KM';\n  var volleyballStatsId = '1tzACDaWtF9Vohd20ooWsTxSyRaAxAKvpnvxmoO6biAI';\n  var womensBasketballStatsId = '1-RkDZ4YpX4XGFvOL7jgXuCm_rLD843NjzPoWJ-Otnf8';\n\n  function setStatParams() {\n    setRange([]);\n    sheetParams.includeGridData = false;\n  }\n\n  function checkIds(i) {\n    urlIsRoster ? setId(rosterId) : urlIsSchedule ? setId(gamesId) : urlIsStats ? setStatsId() : setId(gamesId);\n  }\n\n  function checkRanges(r) {\n    urlIsRoster || urlIsSchedule ? setRange(r) : urlIsStats ? setStatParams() : urlIsIndex ? setRange(r + ' Current') : setRange(r + ' Current');\n  }\n\n  function setId(i) {\n    sheetParams.spreadsheetId = i;\n  }\n\n  function setRange(r) {\n    sheetParams.range = r;\n  }\n\n  function setStatsId() {\n    urlIsBaseball ? setId(baseballStatsId) : urlIsMensBasketball ? setId(mensBasketballStatsId) : urlIsSoccer ? setId(soccerStatsId) : urlIsWomensBasketball ? setId(womensBasketballStatsId) : urlIsSoftball ? setId(softballStatsId) : urlIsVolleyball ? setId(volleyballStatsId) : null;\n  }\n\n  function setParams(r) {\n    checkIds(r);\n    checkRanges(r);\n  }\n\n  urlIsBaseball ? setParams('Baseball') : urlIsMensBasketball ? setParams('Mens Basketball') : urlIsSoccer ? setParams('Soccer') : urlIsWomensBasketball ? setParams('Womens Basketball') : urlIsSoftball ? setParams('Softball') : urlIsVolleyball ? setParams('Volleyball') : setParams('All'); //console.log(sheetParams);\n\n  return sheetParams;\n} //\n//  USAGE:\n//    const sheetParams = setSheetParameters();\n//\n\n\nmodule.exports = setSheetParameters;\n\n//# sourceURL=webpack:///./assets/js/shared/setSheetParameters.js?");

/***/ }),

/***/ "./assets/js/table/createTableElements.js":
/*!************************************************!*\
  !*** ./assets/js/table/createTableElements.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction createTableElements(response) {\n  //console.log(response);\n  var monthNames = [// Define an array of the months to convert JS # value of month into short text version\n  'Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];\n  var winCount = 0;\n  var lossCount = 0;\n  var tieCount;\n  var tieCountValue = 0;\n  var parent = document.getElementById('data');\n  var table = createTableElement(parent);\n  var thead = createTableHeadingElement(table);\n  var tbody = createTableBodyElement(table); // Handle the results here (response.result has the parsed body).\n  //console.log(\"Response\", response.result);\n\n  var sheetData = response.result.values;\n  var arrayLength = sheetData.length;\n  var headingData = sheetData[0];\n  var tableData = sheetData.slice(1, arrayLength); // is an array of arrays\n\n  headingData[9] = 'Record';\n  createHeadingRow(thead, headingData);\n\n  for (var i = 0; i < tableData.length; i++) {\n    var formatDate = function formatDate(date) {\n      var dateArray = date.split(/\\//); //console.log(dateArray);\n\n      var day = dateArray[1];\n      var monthNumber = dateArray[0] - 1;\n      var month = monthNames[monthNumber];\n      var formatedDate = month + ' ' + day;\n      return formatedDate;\n    };\n\n    // Iterates over the spreadsheets rows\n    var rowData = tableData[i]; //console.log(headingData[i]);\n\n    var start = rowData[0];\n    var end = rowData[1];\n    var endDate = '';\n    end ? endDate = ' - ' + formatDate(end) : null;\n    rowData[0] = formatDate(start) + endDate;\n    createBodyRow(tbody, tableData[i]); //console.log(end);\n  }\n\n  function createTableElement(parent) {\n    var table = document.createElement('table');\n    table.classList.add('display', 'table', 'table-striped', 'table-hover');\n    table.setAttribute('width', '100%');\n    table.setAttribute('id', 'responsiveTable');\n    parent.innerHTML = '';\n    parent.appendChild(table);\n    return table;\n  }\n\n  function createTableHeadingElement(table) {\n    var thead = document.createElement('thead');\n    table.appendChild(thead);\n    return thead;\n  }\n\n  function createTableBodyElement(table) {\n    var tbody = document.createElement('tbody');\n    table.appendChild(tbody);\n    return tbody;\n  }\n\n  function createHeadingCells(tr, val) {\n    var th = document.createElement('th');\n    tr.appendChild(th);\n    val = val + ':';\n    th.innerHTML = val;\n    return th;\n  }\n\n  function createHeadingRow(thead, data) {\n    var tr = document.createElement('tr');\n    thead.appendChild(tr);\n\n    for (var i = 0; i < data.length; i++) {\n      createHeadingCells(tr, data[i]);\n    }\n\n    return tr;\n  }\n\n  function createCells(tr, val) {\n    var td = document.createElement('td');\n    tr.appendChild(td);\n    td.innerHTML = val;\n    return td;\n  }\n\n  function createDateCells(tr, val, location) {\n    var td = document.createElement('td');\n    var red = '#c61f48';\n    var blue = '#0f3b63';\n    var gameIsAtHome = location.trim() == 'Home';\n    var color;\n    tr.appendChild(td);\n    gameIsAtHome ? color = red : color = blue;\n    td.setAttribute('align', 'center');\n    td.style.cssText = 'color:#ffffff;background-color:' + color + ';';\n    td.innerHTML = val;\n    return td;\n  }\n\n  function createBodyRow(tbody, data) {\n    var tr = document.createElement('tr');\n    var record;\n    var status = data[6].trim(); //console.log(status);\n\n    status == 'W' ? winCount += 1 : status == 'L' ? lossCount += 1 : status == 'T' ? tieCountValue += 1 : null;\n    tieCountValue === 0 ? tieCount = '' : tieCount = ' - ' + tieCountValue;\n    status == '' ? record = '' : record = winCount + ' - ' + lossCount + tieCount; //console.log('RECORD = ' + record);\n\n    data[9] = record;\n    tbody.appendChild(tr);\n\n    for (var i = 0; i < data.length; i++) {\n      var location = data[5];\n      data[i] === data[0] ? createDateCells(tr, data[i], location) : createCells(tr, data[i]);\n    }\n\n    return tr;\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (createTableElements);\n\n//# sourceURL=webpack:///./assets/js/table/createTableElements.js?");

/***/ }),

/***/ "./assets/js/table/table.js":
/*!**********************************!*\
  !*** ./assets/js/table/table.js ***!
  \**********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _tableSheetsAPI_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tableSheetsAPI.js */ \"./assets/js/table/tableSheetsAPI.js\");\n //import './scheduleTable.js';\n\ndocument.addEventListener('DOMContentLoaded', function () {\n  gapi.load('client', _tableSheetsAPI_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n});\n\n//# sourceURL=webpack:///./assets/js/table/table.js?");

/***/ }),

/***/ "./assets/js/table/tableSheetsAPI.js":
/*!*******************************************!*\
  !*** ./assets/js/table/tableSheetsAPI.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _shared_setSheetParameters_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/setSheetParameters.js */ \"./assets/js/shared/setSheetParameters.js\");\n/* harmony import */ var _shared_setSheetParameters_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_shared_setSheetParameters_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _createTableElements_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createTableElements.js */ \"./assets/js/table/createTableElements.js\");\n//import createTableParts from './createTableParts.js';\n//import createScheduleElements from './createScheduleElements.js';\n\n\n\nfunction start() {\n  var params = {\n    'apiKey': 'AIzaSyCEBsbXfFcdbkASlg-PodD1rT_Fe3Nw62A',\n    'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/sheets/v4/rest']\n  };\n  var sheetParams = _shared_setSheetParameters_js__WEBPACK_IMPORTED_MODULE_0___default()(); //console.log(sheetParams);\n\n  var headingData, rowData; // Initializes the client with the API key and the Translate API.\n\n  gapi.client.init(params).then(function () {\n    // Executes an API request, and returns a Promise.\n    function execute() {\n      return gapi.client.sheets.spreadsheets.values.get(sheetParams).then(function (response) {\n        var createTablePromise = new Promise(function (resolve, reject) {\n          //console.log(response);\n          Object(_createTableElements_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(response);\n          resolve();\n        });\n        createTablePromise.then(function () {\n          var dataTablesPromise = new Promise(function (resolve, reject) {\n            // Do Slick Slider Stuff here\n            $('#responsiveTable').DataTable({\n              responsive: true,\n              // Activate responsive powers GO!\n              paging: false,\n              // Don't paginate. Schedule schould all be on one page\n              'order': [[1, 'asc']],\n              // Initial column ordering\n              'columnDefs': [{\n                'visible': false,\n                'targets': [1, 8]\n              }]\n            });\n            resolve();\n          });\n          dataTablesPromise.then(function () {\n            document.querySelector('input[type=\"search\"].form-control').setAttribute('placeholder', 'Schedule roster...');\n          });\n        });\n      }, function (err) {\n        console.error(\"Execute error\", err);\n      });\n    }\n\n    execute();\n  });\n} // Loads the JavaScript client library and invokes `start` afterwards.\n//    Usage:\n//  gapi.load('client', start);\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (start);\n\n//# sourceURL=webpack:///./assets/js/table/tableSheetsAPI.js?");

/***/ })

/******/ });