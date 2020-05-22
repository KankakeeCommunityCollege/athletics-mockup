const LINKS = document.querySelectorAll('a.video-link');

function watchForVideoClicks(YT_PLAYER) {
  const LINKS = document.querySelectorAll('a.video-link');
  LINKS.forEach((item) => {
    item.addEventListener('click', function (e) {
      YT_PLAYER.src = `https://youtube.com/embed/${item.dataset.videoid}?controls=0&showinfo=0&rel=0&autoplay=1`;
    });
  });
}
export default watchForVideoClicks;
