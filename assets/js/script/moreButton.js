//custom JS to switch the text in the "More..." button when the Season Preview get expanded.
$(document).ready(function() {
  function moreClick() {
    var trigger = $('.js-more-btn');

    trigger.click(function() {
      var that = $(this);

      if ( that.html() == 'More ...' ) {
        console.log("It's More");
        that.html('Close');
      } else {
        console.log("It's Less");
        that.html('More ...');
      }
    });
  }
  moreClick();
});
