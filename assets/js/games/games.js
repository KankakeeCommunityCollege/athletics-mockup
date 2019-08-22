//import './scheduleSlider.js';
import start from './gamesSheetsAPI.js';

document.addEventListener('DOMContentLoaded', function() {
  $('.schedule-slider-temp').slick({ // This is a placeholder slider with loading.gif's while the actual schedule loads/builds.
    dots: false, // No dots bellow the slider
    infinite: false, // No infinite scrolling of slides
    autoplay: false, // No autoplaying the slides
    slidesToShow: 3, // 3 visible
    slidesToScroll: 1, // scroll one at a time
    adaptiveHeight: false,
    prevArrow:'<img class="a-left control-c prev slick-prev" src="../assets/img/blue-prev.svg">',
    nextArrow:'<img class="a-right control-c next slick-next" src="../assets/img/blue-next.svg">',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
    ]
  });
  gapi.load('client', start);
});
