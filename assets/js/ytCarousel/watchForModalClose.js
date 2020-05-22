function watchForModalClose(YT_PLAYER) {
  $('#exampleModalCenter').on('hide.bs.modal', function (e) { // BS4 method requires jQuery
    YT_PLAYER.src = '';
  });
}

export default watchForModalClose;
