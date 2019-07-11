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
/******/ 	return __webpack_require__(__webpack_require__.s = "./assets/js/ytCarousel/ytCarousel.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/js/ytCarousel/lazyload.js":
/*!******************************************!*\
  !*** ./assets/js/ytCarousel/lazyload.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// Lazy load function\n// ex. <img data-src=\"/path/to/image.jpg\" alt=\"\">\nfunction lzFunction() {\n  (function () {\n    [].forEach.call(document.querySelectorAll('img[data-src]'), function (img) {\n      img.setAttribute('src', img.getAttribute('data-src'));\n\n      img.onload = function () {\n        img.removeAttribute('data-src');\n      };\n    });\n  })();\n}\n\nmodule.exports = lzFunction;\n\n//# sourceURL=webpack:///./assets/js/ytCarousel/lazyload.js?");

/***/ }),

/***/ "./assets/js/ytCarousel/youtube-carousel.js":
/*!**************************************************!*\
  !*** ./assets/js/ytCarousel/youtube-carousel.js ***!
  \**************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lazyload_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lazyload.js */ \"./assets/js/ytCarousel/lazyload.js\");\n/* harmony import */ var _lazyload_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lazyload_js__WEBPACK_IMPORTED_MODULE_0__);\n // IMPORT THE LAZYLOAD MODULE!!!\n// Custom JavaScript to pull in YouTube playlist:\n\nvar Youtube_carousel = function youtube_carousel_module() {\n  var $apiK = $('meta[name=yt-api-k]').attr('value'),\n      $ytList = $('#yt_list'),\n      $ytPlayer = $('#yt_player'),\n      // To use on a different site repalce baseUrl's value with the desired site URL\n  // (e.g. var baseUrl = 'https://foundation.kcc.edu';)\n  baseUrl = 'https://athletics.kcc.edu'; // The base site used to call assets (e.g. images)\n\n  function init() {\n    var default_user_name = 'KankakeeCommCollege';\n    selectChannel(default_user_name);\n  }\n\n  function selectChannel(user_name) {\n    $.ajax({\n      url: 'https://www.googleapis.com/youtube/v3/channels',\n      type: 'GET',\n      dataType: 'json',\n      data: {\n        part: 'contentDetails',\n        forUsername: user_name,\n        key: $apiK\n      },\n      success: function success(d) {\n        $ytList.html('');\n\n        if (d.pageInfo.totalResults > 0) {\n          for (var _i = 0, _a = d.items; _i < _a.length; _i++) {\n            var item = _a[_i];\n            var uploads = 'PLEnNvZd4X-lVSveRGpbsXLCmf7hYXX97q';\n            getVideos(uploads);\n          }\n        } else {\n          $('input#user_name').addClass('error');\n          $('div#channel_input > .info').show().html('This user not exists');\n        }\n      },\n      error: function error(x) {\n        console.dir(x);\n      }\n    });\n  }\n\n  function getVideos(yt_id, next_page) {\n    if (next_page === void 0) {\n      next_page = '';\n    }\n\n    var limit = 8;\n    var more = '';\n    var xhr = $.ajax({\n      url: 'https://www.googleapis.com/youtube/v3/playlistItems',\n      type: 'GET',\n      dataType: 'json',\n      data: {\n        part: 'snippet',\n        playlistId: yt_id,\n        maxResults: limit,\n        pageToken: next_page,\n        key: $apiK\n      },\n      success: function success(data) {\n        if (data.nextPageToken) {\n          more = '';\n        }\n\n        if (next_page === '') {\n          $ytPlayer.attr('src', 'https://youtube.com/embed/' + data.items[0].snippet.resourceId.videoId + '?controls=0&showinfo=0&rel=0');\n        }\n\n        for (var i = 0; i < limit; i++) {\n          var title = $('<h3 class=\"video-carousel__title\">').append(data.items[i].snippet.title),\n              thumb = $('<img class=\"img-fluid\" src=\"' + baseUrl + '/assets/img/yt-loading.png\">').attr('data-src', data.items[i].snippet.thumbnails.medium.url),\n              video_id = data.items[i].snippet.resourceId.videoId,\n              link = $('<a class=\"video-link\" data-toggle=\"modal\" data-target=\"#exampleModalCenter\" href=\"#\">').data('videoid', video_id).append(thumb),\n              holder = $('<div class=\"item\">').append(link, title);\n          $ytList.append(holder);\n        }\n\n        $ytList.append(more);\n        $ytList.slick({\n          dots: false,\n          infinite: false,\n          autoplay: false,\n          slidesToShow: 3,\n          slidesToScroll: 1,\n          adaptiveHeight: false,\n          prevArrow: '<img class=\"a-left control-c prev slick-prev\" src=\"' + baseUrl + '/assets/img/blue-prev.svg\">',\n          nextArrow: '<img class=\"a-right control-c next slick-next\" src=\"' + baseUrl + '/assets/img/blue-next.svg\">',\n          responsive: [{\n            breakpoint: 1024,\n            settings: {\n              slidesToShow: 3,\n              slidesToScroll: 3\n            }\n          }, {\n            breakpoint: 992,\n            settings: {\n              slidesToShow: 1,\n              slidesToScroll: 1\n            }\n          }]\n        });\n        _lazyload_js__WEBPACK_IMPORTED_MODULE_0___default()(); // Lazy load function\n      }\n    });\n  }\n  /* load more */\n\n\n  $ytList.on('click', '#load-more', function () {\n    $(this).animate({\n      'transform': 'scaleX(4)',\n      'opacity': '0.1'\n    }, function () {\n      var that = $(this);\n      getVideos(that.data('yt-id'), that.data('next-page'));\n      that.remove();\n    });\n  });\n  /* embeds */\n\n  $ytList.on('click', 'a.video-link', function () {\n    var video_id = $(this).data('videoid');\n    $ytPlayer.attr('src', 'https://youtube.com/embed/' + video_id + '?controls=0&showinfo=0&rel=0&autoplay=1');\n  });\n  $('#exampleModalCenter').on('hide.bs.modal', function (e) {\n    var video_id = $(this).data('videoid');\n    var leg = $ytPlayer.attr('src', 'https://youtube.com/embed/' + video_id + '?controls=0&showinfo=0&rel=0&autoplay=0');\n    $ytPlayer.attr('src', leg);\n  });\n  return {\n    init: init\n  };\n}();\n\n$(document).ready(function () {\n  Youtube_carousel.init();\n});\n\n//# sourceURL=webpack:///./assets/js/ytCarousel/youtube-carousel.js?");

/***/ }),

/***/ "./assets/js/ytCarousel/ytCarousel.js":
/*!********************************************!*\
  !*** ./assets/js/ytCarousel/ytCarousel.js ***!
  \********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _youtube_carousel_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./youtube-carousel.js */ \"./assets/js/ytCarousel/youtube-carousel.js\");\n\n\n//# sourceURL=webpack:///./assets/js/ytCarousel/ytCarousel.js?");

/***/ })

/******/ });