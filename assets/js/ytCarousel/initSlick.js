function initSlick(el, BASE_URL) {
  const SLICK_PARAMETERS = {
    dots: false,
    infinite: false,
    autoplay: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    adaptiveHeight: false,
    prevArrow: `<img class="a-left control-c prev slick-prev" src="${BASE_URL}/assets/img/blue-prev.svg">`,
    nextArrow: `<img class="a-right control-c next slick-next" src="${BASE_URL}/assets/img/blue-next.svg">`,
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
  }
  $(el).slick(SLICK_PARAMETERS);
}

export default initSlick;
