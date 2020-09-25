import lzFunction from './lazyload.js'; // IMPORT THE LAZYLOAD MODULE!!!
import initSlick from './initSlick.js';  // Initializes slick-slider methods on the slider built bellow.
import watchForVideoClicks from './watchForVideoClicks.js';
import watchForModalClose from './watchForModalClose.js';

const BASE_URL = 'https://athletics.kcc.edu';
const YT_API_K = 'AIzaSyCDtQhcIZrqG_uw3OAJvQ5zhtLYWvInZV4';
const YT_PLAYER = document.getElementById('yt_player');
const YT_LIST = document.getElementById('yt_list');

function createItemArr(item, itemArr = []) {
  for (var ytProp in item) {
    if (item.hasOwnProperty(ytProp)) {
      itemArr.push(item[ytProp]);
    }
  }
  return itemArr;
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
    //console.log(response);
    response.items.forEach((item) => {
      const [ , , title, , thumbs, , , , vid ] = createItemArr(item.snippet);
      const html = `
        <div class="item">
          <a class="video-link" data-videoid="${vid.videoId}" data-toggle="modal" data-target="#exampleModalCenter" href="#" tabindex="-1">
            <img class="img-fluid" src="${BASE_URL}/assets/img/yt-loading.png" data-src="${thumbs.medium.url}">
          </a>
          <h3 class="video-carousel__title">${title}</h3>
        </div>`;
      //console.log(html);
      YT_LIST.insertAdjacentHTML('beforeend', html);
    });
    initSlick(YT_LIST, BASE_URL);
    lzFunction();
    watchForVideoClicks(YT_PLAYER);
    watchForModalClose(YT_PLAYER);
  });
}
// Loads the JavaScript client library and invokes `start` afterwards.
//    Usage:
//  gapi.load('client', yt);
export default yt;
