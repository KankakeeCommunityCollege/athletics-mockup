import start from './gamesSheetsAPI.js';
import slickParamsObject from './createSlickParamsObject.js';

function createPlaceholderSlider() {
  $('.schedule-slider-temp').slick(slickParamsObject()); // This is a placeholder slider with loading spinners while the actual schedule is fetched/built.
}

document.addEventListener('DOMContentLoaded', function () {
  createPlaceholderSlider();
  gapi.load('client', start);
});
