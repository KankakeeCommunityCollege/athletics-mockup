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
/******/ 	return __webpack_require__(__webpack_require__.s = "./assets/js/games/games.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/js/games/createScheduleElements.js":
/*!***************************************************!*\
  !*** ./assets/js/games/createScheduleElements.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction createMonth(date) {\n  var monthNames = [// Define an array of the months to convert JS # value of month into short text version\n  'Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];\n  var dateArray = date.split('/');\n  var jsMonth = dateArray[0] - 1;\n  var month = monthNames[jsMonth];\n  return month;\n}\n\nfunction setColorCode(where) {\n  var red = '#c61f48';\n  var blue = '#0f3b63';\n  var color;\n  var gameIsAtHome = where === 'Home';\n  gameIsAtHome ? color = red : color = blue;\n  return color;\n}\n\nfunction createDay(date) {\n  var day;\n  var dateArray = date.split('/');\n  dateArray[1] <= 9 ? day = 0 + dateArray[1] : day = dateArray[1];\n  return day;\n}\n\nfunction createScheduleElements(response) {\n  var noGamesHtml = '<div class=\"schedule-slider\"><div><div class=\"row schedule-slider__row\"><div class=\"schedule-slider__l text-center col-2\" style=\"background-color:#999\"></div><div class=\"schedule-slider__r col-10\"><div class=\"schedule-slider__sport--wrapper\"><span class=\"schedule-slider__sport d-block\">&nbsp;</span></div><br><span class=\"schedule-slider__where d-block\">Check back for upcoming games closer to the season.</span></div></div></div><div><div class=\"row schedule-slider__row\"><div class=\"schedule-slider__l text-center col-2\" style=\"background-color:#999\"></div><div class=\"schedule-slider__r col-10\"><div class=\"schedule-slider__sport--wrapper\"><span class=\"schedule-slider__sport d-block\">&nbsp;</span></div></div></div></div><div><div class=\"row schedule-slider__row\"><div class=\"schedule-slider__l text-center col-2\" style=\"background-color:#999\"></div><div class=\"schedule-slider__r col-10\"><div class=\"schedule-slider__sport--wrapper\"><span class=\"schedule-slider__sport d-block\">&nbsp;</span></div></div></div></div></div>';\n  var values = response.result.values;\n  var valuesLength = values.length;\n  var data = values.slice(1, valuesLength);\n  var html = '';\n  data[0].toString() === '#N/A' ? html += noGamesHtml : createSlides();\n\n  function createSlides() {\n    html += '<div class=\"schedule-slider\">';\n\n    for (var r = 0; r < data.length; r++) {\n      //console.log('Rows = ' + data[r]);\n      var rowData = data[r]; //rowData[i];\n\n      var start = rowData[0];\n      var end = rowData[1];\n      var opponent = rowData[2];\n      var time = rowData[3];\n      var timezone = rowData[4];\n      var where = rowData[5];\n      var status = rowData[6];\n      var summary = rowData[7];\n      var sport = rowData[8];\n      var monthText = createMonth(start);\n      var day = createDay(start);\n      var color = setColorCode(where);\n      html += '<div><div class=\"row schedule-slider__row\">';\n      html += '<div class=\"schedule-slider__l text-center col-2\" style=\"background-color:' + color + '\">';\n      html += '<span class=\"schedule-slider__m d-block\">' + monthText + '</span><span class=\"schedule-slider__day d-block\">' + day + '</span>';\n      html += '</div><div class=\"schedule-slider__r col-10\">';\n      html += '<div class=\"schedule-slider__sport--wrapper\"><span class=\"schedule-slider__sport d-block\">' + sport + '</span></div>';\n      html += '<span class=\"schedule-slider__opponent d-block\">vs. ' + opponent + '</span>';\n      html += '<span class=\"schedule-slider__where d-block\">' + where + '</span>';\n      html += '<span class=\"schedule-slider__time d-block\">' + time + ' ' + timezone + '</span>';\n      html += '</div></div></div>';\n    }\n\n    html += '</div>';\n  }\n\n  var hostElement = document.getElementById('scheduleDiv');\n  hostElement.innerHTML = html;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (createScheduleElements);\n\n//# sourceURL=webpack:///./assets/js/games/createScheduleElements.js?");

/***/ }),

/***/ "./assets/js/games/games.js":
/*!**********************************!*\
  !*** ./assets/js/games/games.js ***!
  \**********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _gamesSheetsAPI_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gamesSheetsAPI.js */ \"./assets/js/games/gamesSheetsAPI.js\");\n//import './scheduleSlider.js';\n\ndocument.addEventListener('DOMContentLoaded', function () {\n  $('.schedule-slider-temp').slick({\n    dots: false,\n    // No dots bellow the slider\n    infinite: false,\n    // No infinite scrolling of slides\n    autoplay: false,\n    // No autoplaying the slides\n    slidesToShow: 3,\n    // 3 visible\n    slidesToScroll: 1,\n    // scroll one at a time\n    adaptiveHeight: false,\n    prevArrow: '<img class=\"a-left control-c prev slick-prev\" src=\"../assets/img/blue-prev.svg\">',\n    nextArrow: '<img class=\"a-right control-c next slick-next\" src=\"../assets/img/blue-next.svg\">',\n    responsive: [{\n      breakpoint: 1024,\n      settings: {\n        slidesToShow: 3,\n        slidesToScroll: 3\n      }\n    }, {\n      breakpoint: 992,\n      settings: {\n        slidesToShow: 1,\n        slidesToScroll: 1\n      }\n    }]\n  });\n  gapi.load('client', _gamesSheetsAPI_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n});\n\n//# sourceURL=webpack:///./assets/js/games/games.js?");

/***/ }),

/***/ "./assets/js/games/gamesSheetsAPI.js":
/*!*******************************************!*\
  !*** ./assets/js/games/gamesSheetsAPI.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _createScheduleElements_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createScheduleElements.js */ \"./assets/js/games/createScheduleElements.js\");\n/* harmony import */ var _shared_setSheetParameters_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/setSheetParameters.js */ \"./assets/js/shared/setSheetParameters.js\");\n/* harmony import */ var _shared_setSheetParameters_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_shared_setSheetParameters_js__WEBPACK_IMPORTED_MODULE_1__);\n//import createTableParts from './createTableParts.js';\n\n\n\nfunction start() {\n  var params = {\n    'apiKey': 'AIzaSyCEBsbXfFcdbkASlg-PodD1rT_Fe3Nw62A',\n    'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/sheets/v4/rest']\n  };\n  var sheetParams = _shared_setSheetParameters_js__WEBPACK_IMPORTED_MODULE_1___default()(); //console.log(sheetParams);\n  // Initializes the client with the API key\n  // No O Auth is needed for read-only public sheets.\n\n  gapi.client.init(params).then(function () {\n    // Executes an API request, and returns a Promise.\n    function execute() {\n      return gapi.client.sheets.spreadsheets.values.get(sheetParams).then(function (response) {\n        var createTablePromise = new Promise(function (resolve, reject) {\n          //console.log(response);\n          // Create the HTML to inject into the DOM here\n          Object(_createScheduleElements_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(response); //createTableParts(response);\n\n          resolve();\n        });\n        createTablePromise.then(function () {\n          // Do Slick Slider Stuff here\n          $('.schedule-slider').slick({\n            dots: false,\n            // No dots bellow the slider\n            infinite: false,\n            // No infinite scrolling of slides\n            autoplay: false,\n            // No autoplaying the slides\n            slidesToShow: 3,\n            // 3 visible\n            slidesToScroll: 1,\n            // scroll one at a time\n            adaptiveHeight: false,\n            prevArrow: '<img class=\"a-left control-c prev slick-prev\" src=\"../assets/img/blue-prev.svg\">',\n            nextArrow: '<img class=\"a-right control-c next slick-next\" src=\"../assets/img/blue-next.svg\">',\n            responsive: [{\n              breakpoint: 1024,\n              settings: {\n                slidesToShow: 3,\n                slidesToScroll: 3\n              }\n            }, {\n              breakpoint: 992,\n              settings: {\n                slidesToShow: 1,\n                slidesToScroll: 1\n              }\n            }]\n          });\n        });\n      }, function (err) {\n        console.error(\"Execute error\", err);\n      });\n    }\n\n    execute();\n  });\n} // Loads the JavaScript client library and invokes `start` afterwards.\n//    Usage:\n//  gapi.load('client', start);\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (start);\n\n//# sourceURL=webpack:///./assets/js/games/gamesSheetsAPI.js?");

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