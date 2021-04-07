function slickParamsObject() {
  const SLICK_PARAMETERS = { // Slick carousel info found at: <https://kenwheeler.github.io/slick/>
    dots: false, // No dots bellow the slider
    infinite: false, // No lopping of slides
    autoplay: false, // Do not play once loaded
    slidesToShow: 3, // 3 visible
    slidesToScroll: 1, // scroll one at a time
    adaptiveHeight: false,
    prevArrow:'<img class="a-left control-c prev slick-prev" src="../assets/img/blue-prev.svg">', // custom prev/next buttons
    nextArrow:'<img class="a-right control-c next slick-next" src="../assets/img/blue-next.svg">',
    responsive: [ // Change slides to show and slides to scroll at different device sizes
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
      }
    ]
  }
  return SLICK_PARAMETERS;
}

export default slickParamsObject;