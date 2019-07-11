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
/******/ 	return __webpack_require__(__webpack_require__.s = "./assets/js/script/all.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/js/script/accordian.js":
/*!***************************************!*\
  !*** ./assets/js/script/accordian.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// Acordian.JS\n// Allows anchor jump-link to work with with acordian function\n//\n$('.membershipTarget').on('click', function () {\n  $('#collapseOne').toggle('show').trigger('showCollapsed');\n});\n$('#collapseOne').on('showCollapsed', function () {\n  $('#plusMinus').toggleClass('buttons__minus');\n});\n$('.trainersTarget').on('click', function () {\n  $('#collapseTwo').toggle('show').trigger('showCollapsed2');\n});\n$('#collapseTwo').on('showCollapsed2', function () {\n  $('#plusMinus2').toggleClass('buttons__minus');\n});\n$('.testimonialsTarget').on('click', function () {\n  $('#collapseThree').toggle('show').trigger('showCollapsed3');\n});\n$('#collapseThree').on('showCollapsed3', function () {\n  $('#plusMinus3').toggleClass('buttons__minus');\n});\n$('.powerTarget').on('click', function () {\n  $('#collapseFour').toggle('show').trigger('showCollapsed4');\n});\n$('#collapseFour').on('showCollapsed4', function () {\n  $('#plusMinus4').toggleClass('buttons__minus');\n}); // function toggleAccordian() {\n//   var plusMinus = document.getElementById('plusMinus');\n//   if (plusMinus.firstChild.nodeValue == '+') {\n//     plusMinus.firstChild.nodeValue = '-';\n//   } else {\n//     plusMinus.firstChild.nodeValue = '+';\n//   }\n// }\n// var member = document.getElementById('plusButton');\n// member.addEventListener('click', toggleAccordian, false);\n// $('#my-link2').click(function() {\n//   $('#collapseTwo').collapse('hide');\n//   $('#collapseTwo').collapse('show');\n// });\n// function toggleAccordian2() {\n//   var plusMinus = document.getElementById('plusMinus2');\n//   if (plusMinus.firstChild.nodeValue == '+') {\n//     plusMinus.firstChild.nodeValue = '-';\n//   } else {\n//     plusMinus.firstChild.nodeValue = '+';\n//   }\n// }\n// var trainer = document.getElementById('plusButton2');\n// trainer.addEventListener('click', toggleAccordian2, false);\n\n//# sourceURL=webpack:///./assets/js/script/accordian.js?");

/***/ }),

/***/ "./assets/js/script/all.js":
/*!*********************************!*\
  !*** ./assets/js/script/all.js ***!
  \*********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _sliders_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sliders.js */ \"./assets/js/script/sliders.js\");\n/* harmony import */ var _moreButton_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./moreButton.js */ \"./assets/js/script/moreButton.js\");\n/* harmony import */ var _moreButton_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_moreButton_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _accordian_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./accordian.js */ \"./assets/js/script/accordian.js\");\n/* harmony import */ var _accordian_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_accordian_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _footerDate_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./footerDate.js */ \"./assets/js/script/footerDate.js\");\n/* harmony import */ var _footerDate_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_footerDate_js__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\n\n//# sourceURL=webpack:///./assets/js/script/all.js?");

/***/ }),

/***/ "./assets/js/script/footerDate.js":
/*!****************************************!*\
  !*** ./assets/js/script/footerDate.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// Sets copyright year\ndocument.addEventListener('DOMContentLoaded', function () {\n  var d = new Date(),\n      fullYear = d.getFullYear();\n  document.getElementById('currentYear').innerHTML = fullYear;\n});\n\n//# sourceURL=webpack:///./assets/js/script/footerDate.js?");

/***/ }),

/***/ "./assets/js/script/lazyload.js":
/*!**************************************!*\
  !*** ./assets/js/script/lazyload.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// Lazy load function\n// ex. <img data-src=\"/path/to/image.jpg\" alt=\"\">\nfunction lzFunction() {\n  (function () {\n    [].forEach.call(document.querySelectorAll('img[data-src]'), function (img) {\n      img.setAttribute('src', img.getAttribute('data-src'));\n\n      img.onload = function () {\n        img.removeAttribute('data-src');\n      };\n    });\n  })();\n}\n\nmodule.exports = lzFunction;\n\n//# sourceURL=webpack:///./assets/js/script/lazyload.js?");

/***/ }),

/***/ "./assets/js/script/moreButton.js":
/*!****************************************!*\
  !*** ./assets/js/script/moreButton.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("//custom JS to switch the text in the \"More...\" button when the Season Preview get expanded.\n$(document).ready(function () {\n  function moreClick() {\n    var trigger = $('.js-more-btn');\n    trigger.click(function () {\n      var that = $(this);\n\n      if (that.html() == 'More ...') {\n        console.log(\"It's More\");\n        that.html('Close');\n      } else {\n        console.log(\"It's Less\");\n        that.html('More ...');\n      }\n    });\n  }\n\n  moreClick();\n});\n\n//# sourceURL=webpack:///./assets/js/script/moreButton.js?");

/***/ }),

/***/ "./assets/js/script/sliders.js":
/*!*************************************!*\
  !*** ./assets/js/script/sliders.js ***!
  \*************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lazyload_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lazyload.js */ \"./assets/js/script/lazyload.js\");\n/* harmony import */ var _lazyload_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lazyload_js__WEBPACK_IMPORTED_MODULE_0__);\n // DO NOT PLACE IN A DOCUMENT READY FUNTION - it will break\n\nvar buildSlidersPromise = new Promise(function (resolve, reject) {\n  buildSliders(resolve);\n});\nbuildSlidersPromise.then(function () {\n  _lazyload_js__WEBPACK_IMPORTED_MODULE_0___default()();\n}); // Main Athletics carousel\n\nfunction buildSliders(resolve) {\n  $('.heroSlider').slick({\n    dots: true,\n    slidesToShow: 1,\n    slidesToScroll: 1,\n    autoplay: true,\n    autoplaySpeed: 3000,\n    prevArrow: '<img alt=\"\" class=\"a-left control-c prev slick-prev\" src=\"assets/img/dbl-prev.svg\">',\n    nextArrow: '<img alt=\"\" class=\"a-right control-c next slick-next\" src=\"assets/img/dbl-next.svg\">'\n  }); // Baseball carousel\n\n  $('.baseballSlider').slick({\n    dots: true,\n    slidesToShow: 1,\n    slidesToScroll: 1,\n    autoplay: true,\n    autoplaySpeed: 3000,\n    prevArrow: '<img alt=\"\" class=\"a-left control-c prev slick-prev\" src=\"../../assets/img/dbl-prev.svg\">',\n    nextArrow: '<img alt=\"\" class=\"a-right control-c next slick-next\" src=\"../../assets/img/dbl-next.svg\">'\n  });\n  resolve();\n}\n\n//# sourceURL=webpack:///./assets/js/script/sliders.js?");

/***/ })

/******/ });