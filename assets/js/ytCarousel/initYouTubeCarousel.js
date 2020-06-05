import yt from './youTubeCarousel.js';

document.addEventListener('DOMContentLoaded', function() {
  //
  // NodeList.prototype.forEach() polyfill
  // https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach#Polyfill
  //
  if (window.DOMTokenList && !DOMTokenList.prototype.forEach) {
    DOMTokenList.prototype.forEach = function (callback, thisArg) {
      thisArg = thisArg || window;
      for (var i = 0; i < this.length; i++) {
        callback.call(thisArg, this[i], i, this);
      }
    };
  }
  /**
 * Object.prototype.forEach() polyfill
 * https://gomakethings.com/looping-through-objects-with-es6/
 * @author Chris Ferdinandi
 * @license MIT
 */
if (window.Object && !Object.prototype.forEach) {
  Object.defineProperty(Object.prototype, 'forEach', {
    value: function (callback, thisArg) {
      if (this == null) {
        throw new TypeError('Not an object');
      }
      thisArg = thisArg || window;
      for (var key in this) {
        if (this.hasOwnProperty(key)) {
          callback.call(thisArg, this[key], key, this);
        }
      }
    }
  });
}
  gapi.load('client', yt);
});
