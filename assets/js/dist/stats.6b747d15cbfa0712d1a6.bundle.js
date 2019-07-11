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
/******/ 	return __webpack_require__(__webpack_require__.s = "./assets/js/stats/stats.js");
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

/***/ "./assets/js/stats/createTabHTML.js":
/*!******************************************!*\
  !*** ./assets/js/stats/createTabHTML.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _createTabTable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./createTabTable.js */ \"./assets/js/stats/createTabTable.js\");\n/* harmony import */ var _markdownify_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./markdownify.js */ \"./assets/js/stats/markdownify.js\");\n\n\n\nfunction createTabsUl() {\n  var ul = document.createElement('ul');\n  ul.classList.add('nav', 'nav-tabs');\n  ul.setAttribute('id', 'statisticTabs');\n  ul.setAttribute('role', 'tablist');\n  return ul;\n}\n\nfunction createTabContent() {\n  var tabContent = document.createElement('div');\n  tabContent.classList.add('tab-content');\n  tabContent.setAttribute('id', 'statisticTabContent');\n  return tabContent;\n}\n\nfunction createTabPane(tabName, i) {\n  var tabPane = document.createElement('div');\n  var h2 = document.createElement('h2');\n  var tabLabel = tabName.toLowerCase().replace(/\\s|\\//g, '-');\n  var tabId = tabLabel + '-tab';\n  var tabIsFirstTab = i == 0;\n  h2.classList.add('main-heading', 'typography__main-heading--margin-top', 'text-center');\n  h2.innerHTML = tabName;\n  tabIsFirstTab ? tabPane.classList.add('show', 'active') : null;\n  tabPane.classList.add('tab-pane', 'fade');\n  tabPane.setAttribute('id', tabLabel);\n  tabPane.setAttribute('role', 'tabpanel');\n  tabPane.setAttribute('aria-labelledby', tabId);\n  tabPane.appendChild(h2);\n  return tabPane;\n}\n\nfunction createTabLinks(tabName, ul, i) {\n  function setActive() {\n    ariaSelected = 'true';\n    a.classList.add('active');\n  }\n\n  var tabLabel = tabName.toLowerCase().replace(/\\s|\\//g, '-');\n  var tabId = tabLabel + '-tab';\n  var ariaSelected;\n  var li = document.createElement('li');\n  var a = document.createElement('a');\n  var tabIsFirstTab = i == 0;\n  li.classList.add('nav-tabs');\n  a.classList.add('nav-link');\n  tabIsFirstTab ? setActive() : ariaSelected = 'false';\n  a.setAttribute('href', '#' + tabLabel);\n  a.setAttribute('data-toggle', 'tab');\n  a.setAttribute('aria-selected', ariaSelected);\n  a.setAttribute('id', tabId);\n  a.setAttribute('role', 'tab');\n  a.setAttribute('aria-controls', tabLabel);\n  a.innerHTML = tabName;\n  li.appendChild(a);\n  ul.appendChild(li);\n  return ul;\n}\n\nfunction assembleTabbedNav(parent, ulWithTabs, tabContent, tabPaneWithTable) {\n  parent.innerHTML = '';\n  parent.appendChild(ulWithTabs);\n  tabContent.appendChild(tabPaneWithTable);\n  parent.appendChild(tabContent);\n}\n\nfunction createTabHTML(response) {\n  //console.log(response); // response the JS Object containing Sheet workbook's data that's returned from the Sheets API.\n  // 'response' is actually a batchResponse from API's `.batchGet()` method\n  var sheetData = response.result.valueRanges; // Array of JS Objects. Each Object represents a Sheet tab.\n\n  var parent = document.getElementById('data');\n  var ul = createTabsUl();\n  var tabContent = createTabContent();\n\n  for (var i = 0; i < sheetData.length; i++) {\n    var tabData = sheetData[i]; // JS Object\n    //console.log(tabData);\n\n    var tabName = tabData.range.match(/^'.+'!/g).toString().replace(/'|!/g, ''); // Extract the Name from the A1 Range ('Sheet 1',!A1-H999) notation in the Object.\n\n    var tabValues = tabData.values; // Is an array of arrays respresented in the comment below...\n    //\n    // tabValues is an array containing 1 array for each row:\n    //\n    // tabvalues = [\n    //                ['<cell-value>', '<cell-value>', '<cell-value>'], // row\n    //                ['<cell-value>', '<cell-value>', '<cell-value>'], // row\n    //                ['<cell-value>', '<cell-value>', '<cell-value>'] // row\n    //            ]\n    //\n    //console.log(tabValues);\n    //\n\n    var tableData = void 0;\n    var blurb = null;\n    var firstRow = tabValues[0].toString(); //console.log(firstRow);\n\n    var tabValuesLength = tabValues.length;\n    var reg = /^>>>/g;\n\n    if (firstRow.search(reg) !== -1) {\n      tableData = tabValues.splice(1, tabValuesLength);\n      blurb = tabValues.splice(0, 1);\n    } else {\n      tableData = tabValues;\n    }\n\n    var blurbIsNotNull = blurb !== null;\n    blurbIsNotNull ? blurb = Object(_markdownify_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(blurb) : null;\n    var ulWithTabs = createTabLinks(tabName, ul, i);\n    var tabPane = createTabPane(tabName, i);\n    var tabPaneWithTable = Object(_createTabTable_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(tabPane, tableData, tabName, blurb);\n    assembleTabbedNav(parent, ulWithTabs, tabContent, tabPaneWithTable); // Wonder twins UNITE!\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (createTabHTML);\n\n//# sourceURL=webpack:///./assets/js/stats/createTabHTML.js?");

/***/ }),

/***/ "./assets/js/stats/createTabTable.js":
/*!*******************************************!*\
  !*** ./assets/js/stats/createTabTable.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction addColSpan(tr, td, val, reg, span) {\n  val = val.replace(reg, '');\n  td.setAttribute('colspan', span);\n  td.classList.add('table__red-category');\n  tr.appendChild(td);\n  td.innerHTML = val;\n  return td;\n}\n\nfunction appendRow(tr, td, val) {\n  var highlightRegExp = /^__(.+)__$/g;\n  var highlightTest = val.search(highlightRegExp);\n  var valContainsHighlighting = highlightTest != -1;\n\n  if (valContainsHighlighting) {\n    td.classList.add('table__highlighted-cell');\n    val = val.replace(/^__|__$/g, '');\n  }\n\n  tr.appendChild(td);\n  td.innerHTML = val;\n  return td;\n}\n\nfunction testColSpanAmount(tr, td, val) {\n  var colSpanTest = {\n    '^\\\\*\\\\*\\\\s': '2',\n    '^\\\\*\\\\*\\\\*\\\\s': '3',\n    '^\\\\*\\\\*\\\\*\\\\*\\\\s': '4',\n    '^\\\\*\\\\*\\\\*\\\\*\\\\*\\\\s': '5'\n  };\n\n  for (var test in colSpanTest) {\n    if (colSpanTest.hasOwnProperty(test)) {\n      var reg = new RegExp(test, 'g');\n      var matchIsTrue = reg.test(val);\n      matchIsTrue ? addColSpan(tr, td, val, reg, colSpanTest[test]) : null;\n    }\n  }\n\n  return td;\n}\n\nfunction createCells(tr, val) {\n  val = val.trim();\n  var colSpanRegExp = /^\\*\\*[^\\d\\w]\\*?\\*?/g;\n  var colTest = val.search(colSpanRegExp);\n  var valContainsColSpan = colTest != -1;\n  var td = document.createElement('td');\n  valContainsColSpan ? testColSpanAmount(tr, td, val) : appendRow(tr, td, val);\n  return td;\n}\n\nfunction createTableRow(data, table) {\n  var tr = document.createElement('tr');\n  table.appendChild(tr);\n\n  for (var i = 0; i < data.length; i++) {\n    createCells(tr, data[i]);\n  }\n\n  return table;\n}\n\nfunction createTableElement(parent) {\n  var table = document.createElement('table');\n  var tbody = document.createElement('tbody');\n  var a = document.createElement('a');\n  a.setAttribute('href', '#page-top');\n  a.innerHTML = 'Back to top';\n  table.classList.add('table', 'table-striped', 'table-hover');\n  table.setAttribute('width', '100%');\n  table.setAttribute('id', 'responsiveTable');\n  table.appendChild(tbody);\n  parent.appendChild(table);\n  parent.appendChild(a);\n  return tbody;\n}\n\nfunction createStatIntro(blurb) {\n  var introWrapper = document.createElement('div');\n  introWrapper.innerHTML = blurb;\n  return introWrapper;\n}\n\nfunction createTabTable(parent, tableData, tabName, blurb) {\n  //console.log(blurb);\n  var blurbIsNotNull = blurb !== null;\n  var copy;\n  blurbIsNotNull ? copy = createStatIntro(blurb) : copy = null;\n  blurbIsNotNull ? parent.appendChild(copy) : null;\n  var table = createTableElement(parent);\n\n  for (var i = 0; i < tableData.length; i++) {\n    var rowData = tableData[i];\n    var tr = createTableRow(rowData, table); //createBodyRow(tbody, tableData[i], id);\n  } //console.log(table);\n  //console.log(parent);\n\n\n  return parent;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (createTabTable);\n\n//# sourceURL=webpack:///./assets/js/stats/createTabTable.js?");

/***/ }),

/***/ "./assets/js/stats/markdownify.js":
/*!****************************************!*\
  !*** ./assets/js/stats/markdownify.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _wrapRegExp(re, groups) { _wrapRegExp = function _wrapRegExp(re, groups) { return new BabelRegExp(re, groups); }; var _RegExp = _wrapNativeSuper(RegExp); var _super = RegExp.prototype; var _groups = new WeakMap(); function BabelRegExp(re, groups) { var _this = _RegExp.call(this, re); _groups.set(_this, groups); return _this; } _inherits(BabelRegExp, _RegExp); BabelRegExp.prototype.exec = function (str) { var result = _super.exec.call(this, str); if (result) result.groups = buildGroups(result, this); return result; }; BabelRegExp.prototype[Symbol.replace] = function (str, substitution) { if (typeof substitution === \"string\") { var groups = _groups.get(this); return _super[Symbol.replace].call(this, str, substitution.replace(/\\$<([^>]+)>/g, function (_, name) { return \"$\" + groups[name]; })); } else if (typeof substitution === \"function\") { var _this = this; return _super[Symbol.replace].call(this, str, function () { var args = []; args.push.apply(args, arguments); if (_typeof(args[args.length - 1]) !== \"object\") { args.push(buildGroups(args, _this)); } return substitution.apply(this, args); }); } else { return _super[Symbol.replace].call(this, str, substitution); } }; function buildGroups(result, re) { var g = _groups.get(re); return Object.keys(g).reduce(function (groups, name) { groups[name] = result[g[name]]; return groups; }, Object.create(null)); } return _wrapRegExp.apply(this, arguments); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _wrapNativeSuper(Class) { var _cache = typeof Map === \"function\" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== \"function\") { throw new TypeError(\"Super expression must either be null or a function\"); } if (typeof _cache !== \"undefined\") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }\n\nfunction isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }\n\nfunction _isNativeFunction(fn) { return Function.toString.call(fn).indexOf(\"[native code]\") !== -1; }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction replaceItem(markdown, el, regEx) {\n  var newMarkdown;\n\n  switch (el) {\n    case 'h3':\n      newMarkdown = markdown.replace(regEx, '<h3 class=\"blue-heading mt-4 mb-3\">$<text></h3>');\n      return newMarkdown;\n      break;\n\n    case 'p':\n      newMarkdown = markdown.replace(regEx, '<p>$<text></p>');\n      return newMarkdown;\n      break;\n\n    case 'li':\n      newMarkdown = markdown.replace(regEx, '<li>$<text></li>');\n      return newMarkdown;\n      break;\n\n    case 'ul':\n      newMarkdown = markdown.replace(regEx, '<ul>');\n      return newMarkdown;\n      break;\n\n    case '/ul':\n      newMarkdown = markdown.replace(regEx, '</ul>');\n      return newMarkdown;\n      break;\n  }\n}\n\nfunction testForMarkdown(blurb) {\n  //console.log(blurb);\n  var markdown = blurb.toString();\n\n  var strongRegEx = _wrapRegExp(/\\*\\*(.+)\\*\\*/gm, {\n    text: 1\n  });\n\n  var removals = [/^<<<.*|^>>>.*/gm, /^$/gm];\n  var markdownObject = {\n    'h3': _wrapRegExp(/^##\\s(.+)/gm, {\n      text: 1\n    }),\n    'p': _wrapRegExp(/^([^-{<#>\\s].+)/gm, {\n      text: 1\n    }),\n    'li': _wrapRegExp(/^-\\s(.+)/gm, {\n      text: 1\n    }),\n    'ul': /{:list}/gm,\n    '/ul': /{:!list}/gm\n  };\n\n  for (var key in markdownObject) {\n    if (markdownObject.hasOwnProperty(key)) {\n      markdown = replaceItem(markdown, key, markdownObject[key]);\n    }\n  }\n\n  markdown = markdown.replace(strongRegEx, '<strong>$<text></strong>');\n\n  for (var i = 0; i < removals.length; i++) {\n    markdown = markdown.replace(removals[i], '');\n  } //console.log(markdownHeadings);\n\n\n  return markdown;\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (testForMarkdown);\n\n//# sourceURL=webpack:///./assets/js/stats/markdownify.js?");

/***/ }),

/***/ "./assets/js/stats/setStatsParameters.js":
/*!***********************************************!*\
  !*** ./assets/js/stats/setStatsParameters.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function setStatsParameters(rangeArray) {\n  var sheetParams = {}; // The thing we are here for\n\n  var host = window.location.host + '/';\n  var url = window.location.href.replace(/(^\\w+:|^)\\/\\//, ''); // Conditions\n\n  var urlIsBaseball = url.indexOf('/baseball') > -1;\n  var urlIsMensBasketball = url.indexOf('/mens-basketball') > -1;\n  var urlIsSoccer = url.indexOf('/soccer') > -1;\n  var urlIsWomensBasketball = url.indexOf('/womens-basketball') > -1;\n  var urlIsSoftball = url.indexOf('/softball') > -1;\n  var urlIsVolleyball = url.indexOf('/volleyball') > -1;\n  var urlIsStats = url.indexOf('/stats') > -1; // Sheet Keys\n\n  var baseballStatsId = '1f7iwZCQc5uVmBDiGxmuCp8O4Y_7gT2IybWpIJlYGQbI';\n  var mensBasketballStatsId = '1zBMYYFRJLLgUu9XKR8voz37o5Nz1dMVAdfy3cj3W_PI';\n  var soccerStatsId = '1CR7waySsJVjNEq7OuWGA7y1-FXWnE4hsvybYUg9l8cw';\n  var softballStatsId = '1qZHyYT_fJE6jajEUjFJK8Z8yKYbu76YnJ9ec3Vzk-KM';\n  var volleyballStatsId = '1tzACDaWtF9Vohd20ooWsTxSyRaAxAKvpnvxmoO6biAI';\n  var womensBasketballStatsId = '1-RkDZ4YpX4XGFvOL7jgXuCm_rLD843NjzPoWJ-Otnf8';\n\n  function setId(i) {\n    sheetParams.spreadsheetId = i;\n  }\n\n  function setRange(r) {\n    sheetParams.ranges = r;\n  }\n\n  function setStatsId() {\n    urlIsBaseball ? setId(baseballStatsId) : urlIsMensBasketball ? setId(mensBasketballStatsId) : urlIsSoccer ? setId(soccerStatsId) : urlIsWomensBasketball ? setId(womensBasketballStatsId) : urlIsSoftball ? setId(softballStatsId) : urlIsVolleyball ? setId(volleyballStatsId) : null;\n  }\n\n  function setParams(r) {\n    setStatsId();\n    setRange(r);\n  }\n\n  setParams(rangeArray); // AAAaaahhhh, the first actual call to anything\n  //console.log(sheetParams);\n\n  return sheetParams;\n} //\n//  USAGE:\n//    const sheetParams = setSheetParameters();\n//\n\n\nmodule.exports = setStatsParameters;\n\n//# sourceURL=webpack:///./assets/js/stats/setStatsParameters.js?");

/***/ }),

/***/ "./assets/js/stats/stats.js":
/*!**********************************!*\
  !*** ./assets/js/stats/stats.js ***!
  \**********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _statsSheetsAPI_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./statsSheetsAPI.js */ \"./assets/js/stats/statsSheetsAPI.js\");\n\ndocument.addEventListener('DOMContentLoaded', function () {\n  gapi.load('client', _statsSheetsAPI_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n});\n\n//# sourceURL=webpack:///./assets/js/stats/stats.js?");

/***/ }),

/***/ "./assets/js/stats/statsSheetsAPI.js":
/*!*******************************************!*\
  !*** ./assets/js/stats/statsSheetsAPI.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _shared_setSheetParameters_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/setSheetParameters.js */ \"./assets/js/shared/setSheetParameters.js\");\n/* harmony import */ var _shared_setSheetParameters_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_shared_setSheetParameters_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _setStatsParameters_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./setStatsParameters.js */ \"./assets/js/stats/setStatsParameters.js\");\n/* harmony import */ var _setStatsParameters_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_setStatsParameters_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _createTabHTML_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createTabHTML.js */ \"./assets/js/stats/createTabHTML.js\");\n\n\n\n\nfunction start() {\n  var params = {\n    'apiKey': 'AIzaSyCEBsbXfFcdbkASlg-PodD1rT_Fe3Nw62A',\n    'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/sheets/v4/rest']\n  };\n  var sheetParams = _shared_setSheetParameters_js__WEBPACK_IMPORTED_MODULE_0___default()(); //console.log(sheetParams);\n  //console.log(sheetParams);\n\n  gapi.client.init(params).then(function () {\n    // Executes an API request, and returns a Promise.\n    function execute() {\n      return gapi.client.sheets.spreadsheets.get(sheetParams).then(function (response) {\n        var createTablePromise = new Promise(function (resolve, reject) {\n          var statsRange = []; //console.log(response.result.sheets);\n\n          var sheetsResults = response.result.sheets;\n\n          for (var i = 0; i < sheetsResults.length; i++) {\n            var sheetsObject = sheetsResults[i]; //console.log(sheetsObject.properties.title);\n\n            var sheetTitle = sheetsObject.properties.title;\n            statsRange.push(sheetTitle);\n          } //console.log(statsRange);\n\n\n          var statsParams = _setStatsParameters_js__WEBPACK_IMPORTED_MODULE_1___default()(statsRange);\n          return gapi.client.sheets.spreadsheets.values.batchGet(statsParams).then(function (batchResponse) {\n            //console.log(batchResponse);\n            Object(_createTabHTML_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(batchResponse);\n          }, function (error) {\n            console.error(\"Execute error\", error);\n          }); //createTableElements(response);\n          //\n          //\n          //\n          //    TODO\n          //\n          //    Make a values.batchGet call to fetch\n          //    all sheets in the stats workbook\n          //\n          //   THEN: parse the data into a table\n          //\n          //\n\n          resolve();\n        });\n        createTablePromise.then(function () {\n          var dataTablesPromise = new Promise(function (resolve, reject) {\n            // Do Slick Slider Stuff here\n            $('#responsiveTable').DataTable({\n              responsive: true,\n              // Activate responsive powers GO!\n              paging: false,\n              // Don't paginate. Schedule schould all be on one page\n              'order': [[1, 'asc']] //, // Initial column ordering\n              //'columnDefs': [\n              //  { 'visible': false, 'targets': [0,10] }\n              //]\n\n            });\n            resolve();\n          });\n          dataTablesPromise.then(function () {\n            document.querySelector('input[type=\"search\"].form-control').setAttribute('placeholder', 'Search roster...');\n          });\n        });\n      }, function (err) {\n        console.error(\"Execute error\", err);\n      });\n    }\n\n    execute();\n  });\n} // Loads the JavaScript client library and invokes `start` afterwards.\n//    Usage:\n//  gapi.load('client', start);\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (start);\n\n//# sourceURL=webpack:///./assets/js/stats/statsSheetsAPI.js?");

/***/ })

/******/ });