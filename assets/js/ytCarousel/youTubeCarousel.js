import lzFunction from './lazyload.js'; // IMPORT THE LAZYLOAD MODULE!!!

const BASE_URL = 'https://athletics.kcc.edu';
const YT_API_K = 'AIzaSyCDtQhcIZrqG_uw3OAJvQ5zhtLYWvInZV4';
const YT_PLAYER = document.getElementById('yt_player');
const YT_LIST = document.getElementById('yt_list');
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

function createItemArr(item, itemArr = []) {
  for (var ytProp in item) {
    if (item.hasOwnProperty(ytProp)) {
      itemArr.push(item[ytProp]);
    }
  }
  return itemArr;
}

function initSlick(selector, paramsObject) {
  $(selector).slick(paramsObject);
  lzFunction();
}

$('#exampleModalCenter').on('hide.bs.modal', function (e) {
  YT_PLAYER.src = '';
});

function watchForVideoClicks() {
  const links = document.querySelectorAll('a.video-link');
  links.forEach((item) => {
    item.addEventListener('click', function (e) {
      YT_PLAYER.src = `https://youtube.com/embed/${item.dataset.videoid}?controls=0&showinfo=0&rel=0&autoplay=1`;
    });
  });
}

function yt() {
  const limit = 8;
  const yt_id ='PLEnNvZd4X-lVSveRGpbsXLCmf7hYXX97q';
  const request = gapi.client.request({
    'method': 'GET',
    'path': '/youtube/v3/playlistItems',
    'params': {
      'part': 'snippet',
      'playlistId': yt_id,
      'maxResults': limit,
      'pageToken': '',
      'key': YT_API_K
    }
  });

  request.execute( (response) => {
    response.items.forEach((item, i) => {
      const [ , , title, , thumbs, , , , vid ] = createItemArr(item.snippet);
      const html = `
        <div class="item">
          <a class="video-link" data-videoid="${vid.videoId}" data-toggle="modal" data-target="#exampleModalCenter" href="#" tabindex="-1">
            <img class="img-fluid" src="${BASE_URL}/assets/img/yt-loading.png" data-src="${thumbs.medium.url}">
          </a>
          <h3 class="video-carousel__title">${title}</h3>
        </div>`;
      console.log(i);
      YT_LIST.insertAdjacentHTML('beforeend', html);
    });
    initSlick(YT_LIST, SLICK_PARAMETERS);
    watchForVideoClicks();
  });
}
// Loads the JavaScript client library and invokes `start` afterwards.
//    Usage:
//  gapi.load('client', yt);
export default yt;
