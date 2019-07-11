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
/******/ 	return __webpack_require__(__webpack_require__.s = "./assets/js/roster/roster.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/js/roster/createModalElements.js":
/*!*************************************************!*\
  !*** ./assets/js/roster/createModalElements.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function createModal(parent, id) {\n  var modal = document.createElement('div');\n  var modalId = id + 'Modal';\n  modal.classList.add('modal', 'fade');\n  modal.setAttribute('role', 'dialog');\n  modal.setAttribute('aria-hidden', 'true');\n  modal.setAttribute('tabindex', '-1');\n  modal.setAttribute('aria-labelledby', id);\n  modal.setAttribute('id', modalId);\n  parent.appendChild(modal);\n  return modal;\n}\n\nfunction createDoc(modal) {\n  var doc = document.createElement('div');\n  doc.classList.add('modal-dialog', 'modal-dialog-centered');\n  doc.setAttribute('role', 'document');\n  modal.appendChild(doc);\n  return doc;\n}\n\nfunction createContent(doc) {\n  var content = document.createElement('div');\n  content.classList.add('modal-content');\n  doc.appendChild(content);\n  return content;\n}\n\nfunction createHeader(content) {\n  var header = document.createElement('div');\n  header.classList.add('modal-header');\n  content.appendChild(header);\n  return header;\n}\n\nfunction createButton() {\n  var button = document.createElement('button');\n  var x = document.createElement('span');\n  x.setAttribute('aria-hidden', 'true');\n  x.innerHTML = '&times;';\n  button.classList.add('close');\n  button.setAttribute('type', 'button');\n  button.setAttribute('data-dismiss', 'modal');\n  button.setAttribute('aria-label', 'close');\n  button.appendChild(x);\n  return button;\n}\n\nfunction createTitle(header, name, id) {\n  var title = document.createElement('h5');\n  var button = createButton();\n  title.classList.add('modal-title');\n  title.setAttribute('id', id);\n  title.innerHTML = name + ' Bio';\n  header.appendChild(title);\n  header.appendChild(button);\n  return title;\n}\n\nfunction createBody(content, name, modalContent) {\n  var body = document.createElement('div');\n  body.classList.add('modal-body');\n  body.innerHTML = modalContent.join('');\n  content.appendChild(body);\n  return body;\n}\n\nfunction createPlayerImage(name, src, body) {\n  var div = document.createElement('div');\n  var img = document.createElement('img');\n  var alt = 'Photo of player ' + name;\n  var source = '../../uploads/roster-img/' + src + '.jpg';\n  div.classList.add('text-center', 'float-md-left');\n  img.setAttribute('alt', alt);\n  img.setAttribute('src', source);\n  img.classList.add('roster__img');\n  div.appendChild(img);\n  body.appendChild(div);\n  return body;\n}\n\nfunction createNameHeading(name, jersey, body) {\n  var h6 = document.createElement('h6');\n  h6.classList.add('roster__player');\n  var jerseyIsNotBlank = jersey !== '_na_';\n  jerseyIsNotBlank ? h6.innerHTML = '#' + jersey + ' ' + name : h6.innerHTML = name;\n  body.appendChild(h6);\n  return body;\n}\n\nfunction createPlayerStats(cellCol, cellData) {\n  var p = document.createElement('p');\n  var cellIsBlank = cellData == ' ' || cellData === '_na_';\n\n  function createStat(cellCol, cellData) {\n    var span = document.createElement('span');\n    var strong = document.createElement('strong');\n    p.classList.add('mb-0'); //Bootstrap Class (margin-bottom: 0)\n\n    strong.innerHTML = cellCol + ':';\n    p.appendChild(strong);\n    span.innerHTML = '&nbsp' + cellData;\n    p.appendChild(span);\n    return p;\n  }\n\n  cellIsBlank ? p.innerHTML = '' : createStat(cellCol, cellData);\n  return p;\n}\n\nfunction createModalFooter(content) {\n  var div = document.createElement('div');\n  var button = document.createElement('button');\n  div.classList.add('modal-footer');\n  button.setAttribute('type', 'button');\n  button.setAttribute('data-dismiss', 'modal');\n  button.classList.add('btn', 'btn-secondary');\n  button.innerHTML = 'Close';\n  div.appendChild(button);\n  content.appendChild(div);\n  return content;\n}\n\nfunction createModalElements(response) {\n  //console.log(response);\n  var parent = document.getElementById('modalDiv');\n  var data = response.result.values;\n  var headingData = data[1];\n  var dataLength = data.length;\n  var validData = data.slice(2, dataLength);\n\n  for (var i = 0; i < validData.length; i++) {\n    var wrapStats = function wrapStats(playerStatsArray, body) {\n      var p = document.createElement('p');\n\n      for (var x = 0; x < playerStatsArray.length; x++) {\n        var statItem = playerStatsArray[x];\n        p.appendChild(statItem);\n      }\n\n      body.appendChild(p);\n      return body;\n    };\n\n    var rowData = validData[i];\n    var modalContent = [];\n    var stat = headingData[i];\n    var src = rowData[0].trim();\n    var jersey = rowData[1].trim();\n    var name = rowData[2].trim();\n    var isNotFirstThreeColumns = i >= 4;\n    var id = name.replace(/[\\W_]+/g, '');\n    var modal = createModal(parent, id);\n    var doc = createDoc(modal);\n    var content = createContent(doc);\n    var header = createHeader(content);\n    var title = createTitle(header, name, id);\n    var body = createBody(content, name, modalContent);\n    var playerImg = createPlayerImage(name, src, body);\n    var nameHeading = createNameHeading(name, jersey, body);\n    var playerStatsArray = [];\n\n    for (var r = 2; r < rowData.length; r++) {\n      var cellData = rowData[r];\n      var cellCol = headingData[r];\n      var playerStats = createPlayerStats(cellCol, cellData);\n      playerStatsArray.push(playerStats);\n    }\n\n    wrapStats(playerStatsArray, body);\n    var footer = createModalFooter(content);\n  }\n}\n\nmodule.exports = createModalElements;\n\n//# sourceURL=webpack:///./assets/js/roster/createModalElements.js?");

/***/ }),

/***/ "./assets/js/roster/createTableElements.js":
/*!*************************************************!*\
  !*** ./assets/js/roster/createTableElements.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _createModalElements_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createModalElements.js */ \"./assets/js/roster/createModalElements.js\");\n/* harmony import */ var _createModalElements_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_createModalElements_js__WEBPACK_IMPORTED_MODULE_0__);\n\n\nfunction createTableElements(response) {\n  function createTableElement(parent) {\n    var table = document.createElement('table');\n    table.classList.add('display', 'table', 'table-striped', 'table-hover');\n    table.setAttribute('width', '100%');\n    table.setAttribute('id', 'responsiveTable');\n    parent.innerHTML = '';\n    parent.appendChild(table);\n    return table;\n  }\n\n  function createTableHeadingElement(table) {\n    var thead = document.createElement('thead');\n    table.appendChild(thead);\n    return thead;\n  }\n\n  function createTableBodyElement(table) {\n    var tbody = document.createElement('tbody');\n    table.appendChild(tbody);\n    return tbody;\n  }\n\n  function createHeadingCells(tr, val) {\n    var th = document.createElement('th');\n    tr.appendChild(th);\n    val === 'Image' || val === 'Bio' || val === 'Intended Major' || val === 'High School Coach' || val === 'Parents' || val === 'Siblings' ? th.classList.add('none') // Add DataTable's 'all' & 'none' classes.\n    : val === 'Jersey' || val === 'player' ? th.classList.add('all') // Add DataTable's 'all' & 'none' classes.\n    : null;\n    val = val + ':';\n    th.innerHTML = val;\n    return th;\n  }\n\n  function createHeadingRow(thead, data) {\n    var tr = document.createElement('tr');\n    thead.appendChild(tr);\n\n    for (var i = 0; i < data.length; i++) {\n      createHeadingCells(tr, data[i]);\n    }\n\n    return tr;\n  }\n\n  function createBodyRow(tbody, data, id) {\n    var tr = document.createElement('tr');\n    tbody.appendChild(tr);\n\n    for (var i = 0; i < data.length; i++) {\n      createCells(tr, data[i], id);\n    }\n\n    return tr;\n  }\n\n  function createCells(tr, val, id) {\n    var td = document.createElement('td');\n    var cellIsBlank = val === '_na_';\n    cellIsBlank ? val = ' ' : null;\n    tr.appendChild(td);\n    td.innerHTML = val;\n    return td;\n  }\n\n  var parent = document.getElementById('data');\n  var table = createTableElement(parent);\n  var thead = createTableHeadingElement(table);\n  var tbody = createTableBodyElement(table); // Handle the results here (response.result has the parsed body).\n  //console.log(\"Response\", response.result);\n\n  var sheetData = response.result.values;\n  var arrayLength = sheetData.length;\n  var headingData = sheetData[1];\n  var tableData = sheetData.slice(2, arrayLength); // is an array of arrays\n\n  _createModalElements_js__WEBPACK_IMPORTED_MODULE_0___default()(response);\n  createHeadingRow(thead, headingData);\n\n  for (var i = 0; i < tableData.length; i++) {\n    var rowData = tableData[i];\n    var name = rowData[2];\n    var id = name.replace(/[\\W_]+/g, '');\n    var targetModalId = id + 'Modal';\n    rowData[2] = '<button type=\"button\" class=\"btn btn-link buttons__roster--name\" data-toggle=\"modal\" data-target=\"#' + targetModalId + '\" >' + name + '</button>';\n    createBodyRow(tbody, tableData[i], id);\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (createTableElements);\n\n//# sourceURL=webpack:///./assets/js/roster/createTableElements.js?");

/***/ }),

/***/ "./assets/js/roster/roster.js":
/*!************************************!*\
  !*** ./assets/js/roster/roster.js ***!
  \************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _rosterSheetsAPI_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rosterSheetsAPI.js */ \"./assets/js/roster/rosterSheetsAPI.js\");\n\ndocument.addEventListener('DOMContentLoaded', function () {\n  gapi.load('client', _rosterSheetsAPI_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n});\n\n//# sourceURL=webpack:///./assets/js/roster/roster.js?");

/***/ }),

/***/ "./assets/js/roster/rosterSheetsAPI.js":
/*!*********************************************!*\
  !*** ./assets/js/roster/rosterSheetsAPI.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _shared_setSheetParameters_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/setSheetParameters.js */ \"./assets/js/shared/setSheetParameters.js\");\n/* harmony import */ var _shared_setSheetParameters_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_shared_setSheetParameters_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _createTableElements_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createTableElements.js */ \"./assets/js/roster/createTableElements.js\");\n//import createTableParts from './createTableParts.js';\n//import createScheduleElements from './createScheduleElements.js';\n\n\n\nfunction start() {\n  var params = {\n    'apiKey': 'AIzaSyCEBsbXfFcdbkASlg-PodD1rT_Fe3Nw62A',\n    'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/sheets/v4/rest']\n  };\n  var sheetParams = _shared_setSheetParameters_js__WEBPACK_IMPORTED_MODULE_0___default()(); //console.log(sheetParams);\n\n  var headingData, rowData; // Initializes the client with the API key and the Translate API.\n\n  gapi.client.init(params).then(function () {\n    // Executes an API request, and returns a Promise.\n    function execute() {\n      return gapi.client.sheets.spreadsheets.values.get(sheetParams).then(function (response) {\n        var createTablePromise = new Promise(function (resolve, reject) {\n          //console.log(response);\n          Object(_createTableElements_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(response);\n          resolve();\n        });\n        createTablePromise.then(function () {\n          var dataTablesPromise = new Promise(function (resolve, reject) {\n            // Do Slick Slider Stuff here\n            $('#responsiveTable').DataTable({\n              responsive: true,\n              // Activate responsive powers GO!\n              paging: false,\n              // Don't paginate. Schedule schould all be on one page\n              'order': [] //, // Initial column ordering\n              //'columnDefs': [\n              //  { 'visible': false, 'targets': [0,10] }\n              //]\n\n            });\n            resolve();\n          });\n          dataTablesPromise.then(function () {\n            document.querySelector('input[type=\"search\"].form-control').setAttribute('placeholder', 'Search roster...');\n          });\n        });\n      }, function (err) {\n        console.error(\"Execute error\", err);\n      });\n    }\n\n    execute();\n  });\n} // Loads the JavaScript client library and invokes `start` afterwards.\n//    Usage:\n//  gapi.load('client', start);\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (start);\n\n//# sourceURL=webpack:///./assets/js/roster/rosterSheetsAPI.js?");

/***/ }),

/***/ "./assets/js/shared/setSheetParameters.js":
/*!************************************************!*\
  !*** ./assets/js/shared/setSheetParameters.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function setSheetParameters() {\n  var sheetParams = {}; // The thing we are here for\n\n  var host = window.location.host + '/';\n  var url = window.location.href.replace(/(^\\w+:|^)\\/\\//, ''); // Conditions\n\n  var urlIsBaseball = url.indexOf('/baseball') > -1;\n  var urlIsMensBasketball = url.indexOf('/mens-basketball') > -1;\n  var urlIsSoccer = url.indexOf('/soccer') > -1;\n  var urlIsWomensBasketball = url.indexOf('/womens-basketball') > -1;\n  var urlIsSoftball = url.indexOf('/softball') > -1;\n  var urlIsVolleyball = url.indexOf('/volleyball') > -1;\n  var urlIsRoster = url.indexOf('/roster') > -1;\n  var urlIsSchedule = url.indexOf('/schedule') > -1;\n  var urlIsStats = url.indexOf('/stats') > -1;\n  var urlIsIndex = url === host; // Sheet Keys\n\n  var gamesId = \"13cd6P3Ze7bBJugzlQ2Uk2dFWc677wE68ghL94JZcnmI\";\n  var rosterId = \"1odoxnNnm3ldZFpND9SDj6JhPXIct60FVJSFvcshX2aw\";\n  var baseballStatsId = '1f7iwZCQc5uVmBDiGxmuCp8O4Y_7gT2IybWpIJlYGQbI';\n  var mensBasketballStatsId = '1zBMYYFRJLLgUu9XKR8voz37o5Nz1dMVAdfy3cj3W_PI';\n  var soccerStatsId = '1CR7waySsJVjNEq7OuWGA7y1-FXWnE4hsvybYUg9l8cw';\n  var softballStatsId = '1qZHyYT_fJE6jajEUjFJK8Z8yKYbu76YnJ9ec3Vzk-KM';\n  var volleyballStatsId = '1tzACDaWtF9Vohd20ooWsTxSyRaAxAKvpnvxmoO6biAI';\n  var womensBasketballStatsId = '1-RkDZ4YpX4XGFvOL7jgXuCm_rLD843NjzPoWJ-Otnf8';\n\n  function setStatParams() {\n    setRange([]);\n    sheetParams.includeGridData = false;\n  }\n\n  function checkIds(i) {\n    urlIsRoster ? setId(rosterId) : urlIsSchedule ? setId(gamesId) : urlIsStats ? setStatsId() : setId(gamesId);\n  }\n\n  function checkRanges(r) {\n    urlIsRoster || urlIsSchedule ? setRange(r) : urlIsStats ? setStatParams() : urlIsIndex ? setRange(r + ' Current') : setRange(r + ' Current');\n  }\n\n  function setId(i) {\n    sheetParams.spreadsheetId = i;\n  }\n\n  function setRange(r) {\n    sheetParams.range = r;\n  }\n\n  function setStatsId() {\n    urlIsBaseball ? setId(baseballStatsId) : urlIsMensBasketball ? setId(mensBasketballStatsId) : urlIsSoccer ? setId(soccerStatsId) : urlIsWomensBasketball ? setId(womensBasketballStatsId) : urlIsSoftball ? setId(softballStatsId) : urlIsVolleyball ? setId(volleyballStatsId) : null;\n  }\n\n  function setParams(r) {\n    checkIds(r);\n    checkRanges(r);\n  }\n\n  urlIsBaseball ? setParams('Baseball') : urlIsMensBasketball ? setParams('Mens Basketball') : urlIsSoccer ? setParams('Soccer') : urlIsWomensBasketball ? setParams('Womens Basketball') : urlIsSoftball ? setParams('Softball') : urlIsVolleyball ? setParams('Volleyball') : setParams('All'); //console.log(sheetParams);\n\n  return sheetParams;\n} //\n//  USAGE:\n//    const sheetParams = setSheetParameters();\n//\n\n\nmodule.exports = setSheetParameters;\n\n//# sourceURL=webpack:///./assets/js/shared/setSheetParameters.js?");

/***/ })

/******/ });