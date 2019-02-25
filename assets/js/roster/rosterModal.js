document.addEventListener('DOMContentLoaded', function() {
  var deferLazyLoad = $.Deferred();
  var currentUrl = window.location.href,  // Defin currentUrl as the user's current browser URL
    noProto = currentUrl.replace(/(^\w+:|^)\/\//, ''),  // Remove the http(s):// protocol from that URL
    url = setSheetUrl(url);  // Define the variable url as: the function setSheetUrl() and passing the variable url through it.

  $.when(deferLazyLoad).done(function() {
    lzFunction();
  });

  function setSheetUrl(urlString) { // Pass the variable 'urlString' through
    var spreadsheetID = '14pczY6IjNEy3zdqyNRhCZFLfWLEP4Uv3EGwIp7uXrLo';  // ID of the Google Sheets Spreadsheet
    // Sheet # within the Spreadsheet
    // (Sheet # corresponds to the order of the sheets as they appear in Google--the left-most sheet being # '1')
    var sheetNumber; // Defined as an empty variable
    // Set the sheet # based on which page the user is on:
    if ( noProto.indexOf('/baseball') > -1 ) {
      sheetNumber = 1;  // If on Baseball Schedule page set to '1'
    } else if ( noProto.indexOf('/mens-basketball') > -1 ) {
      sheetNumber = 2;  // If on Men's Basketball Schedule page set to '2'
    } else if ( noProto.indexOf('/soccer') > -1 ) {
      sheetNumber = 3;  // If on Women's Basketball Schedule page set to '3'
    } else if ( noProto.indexOf('/womens-basketball') > -1 ) {
      sheetNumber = 4;  // If on Women's Basketball Schedule page set to '3'
    } else if ( noProto.indexOf('/softball') > -1 ) {
      sheetNumber = 5;  // If on Women's Basketball Schedule page set to '3'
    } else if ( noProto.indexOf('/volleyball') > -1 ) {
      sheetNumber = 6;  // If on Women's Basketball Schedule page set to '3'
    }
    // Make sure the Google Sheet is public or set to Anyone with link can view
    // Go to File > Publish
    urlString = 'https://spreadsheets.google.com/feeds/list/' + spreadsheetID + '/' + sheetNumber + '/public/values?alt=json'; // build the url
    return urlString; // Kick-out the urlString variable as the URL to the appropriate Sheet.
  }

  function drawModals() {
    $.getJSON(url, function(data) {  // make JSON call to Google Data API
      var html = '';  // set html variable as empty string:
      // loop to build html output for each row (build the data into the table)
      var entry = data.feed.entry;  // Define 'entry' var from Google Sheet
      entry.forEach(function(entry) { // Run a 'forEach()' loop on the entrys:
        var playerName = entry['gsx$player']['$t'],
          playerId = playerName.replace(/[\W_]+/g, '');
        var playerWeight,
          playerHeight;
        var weightCell = entry['gsx$weight'],
          heightCell = entry['gsx$height'];
        if ( weightCell !== undefined ) {
          playerWeight = '<span><strong>WEIGHT: </strong>' + entry['gsx$weight']['$t'] + '</span><br>';
        } else {
          playerWeight = '';
        }
        if ( heightCell !== undefined ) {
          playerHeight = '<span><strong>HEIGHT: </strong>' + entry['gsx$height']['$t'] + '</span><br>';
        } else {
          playerHeight = '';
        }
        function drawModalHead() {
          html += '<div class="modal fade" id="' + playerId + '" tabindex="-1" role="dialog" aria-labelledby="' + playerId + 'Bio" aria-hidden="true">';
          html += '<div class="modal-dialog modal-dialog-centered" role="document"><div class="modal-content"><div class="modal-header">';
          html += '<h5 class="modal-title" id="' + playerId + 'Bio">' + playerName + ' Bio' + '</h5>';
          html += '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';
        }
        function drawModalBody() {
          var jerseyHTML,
            num = entry['gsx$jersey']['$t'];
          //var extraCols = [ 'highschoolcoach', 'parents', 'siblings', 'bio' ];
          //var extraGSX;
          //extraCols.forEach(function(col) {
            //var thisGSX = "entry['gsx$" + col + "']";
            //console.log(thisGSX);
            //if ( thisGSX !== undefined ) {
              //extraGSX = thisGSX;
            //}
          //});
          //console.log(extraGSX);
          var extraGSX = '';
          var extraCols = [entry['gsx$highschoolcoach'], entry['gsx$intendedmajor'], entry['gsx$parents'], entry['gsx$siblings'], entry['gsx$bio']];
          extraCols.forEach(function(col) {

            if ( col ) {
              var extraColTitle = ['High School Coach', 'Major', 'Parents', 'Siblings', 'Bio'];
              var thisTitle;
              if ( col == entry['gsx$highschoolcoach'] ) {
                thisTitle = '<span><strong class="typography__uppercase">' + extraColTitle[0] + ':</strong> ';
              } else if ( col == entry['gsx$intendedmajor'] ) {
                thisTitle = '<span><strong class="typography__uppercase">' + extraColTitle[1] + ':</strong> ';
              } else if ( col == entry['gsx$parents'] ) {
                thisTitle = '<span><strong class="typography__uppercase">' + extraColTitle[2] + ':</strong> ';
              } else if ( col == entry['gsx$siblings'] ) {
                thisTitle = '<span><strong class="typography__uppercase">' + extraColTitle[3] + ':</strong> ';
              } else if ( col == entry['gsx$bio'] ) {
                thisTitle = '<span><strong class="typography__uppercase">' + extraColTitle[4] + ':</strong> ';
              }
              extraGSX += thisTitle + col['$t'].replace('•', '<br> •').replace('·', '<br> •') + '</span><br>';
            }
          });
          var extraHTML = '';
          var bio = entry['gsx$bio'],
            hsCoach = entry['gsx$highschoolcoach'];
          if ( bio ) {
            var dat = bio['$t'];
            extraHTML += '<span><strong>BIO:<br>' + '</strong>' + dat + '</span><br>';
          } else if ( hsCoach ) {

          } else {
            extraHTML += '';
          }
          if ( num !== ' ' ) {
            jerseyHTML = '#' + num;
          } else {
            jerseyHTML = '';
          }
          html += '<div class="modal-body"><div class="text-center float-md-left"><img class="roster__img" alt="Photo of player ' + playerName + '" src="../../assets/img/placeholder.png" data-src="../../uploads/roster-img/' + entry['gsx$image']['$t'] + '.jpg"></div>';
          html += '<h6 class="roster__player">' + jerseyHTML + ' ' + playerName + '</h6>';
          html += '<p><span><strong>POSITION: </strong>' + entry['gsx$position']['$t'] + '</span><br><span><strong>CLASS: </strong>' + entry['gsx$class']['$t'] + '</span><br>' + playerWeight + playerHeight + '<strong>HOMETOWN: </strong>' + entry['gsx$hometown']['$t'] + '</span><br><span><strong>HIGH SCHOOL: </strong>' + entry['gsx$highschool']['$t'] + '</span><br>';
          html += extraGSX;
          html += '</p></div>';
        }
        function drawModalFooter() {
          html += '<div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div>';
        }
        drawModalHead();
        drawModalBody();
        drawModalFooter();
      });  // End of forEach loop
      // Tack on the closing table tags
      // output the html:
      var modalDiv = document.getElementById('modalDiv');
      modalDiv.innerHTML = html;
      deferLazyLoad.resolve();
    });
  }
  function toRosterModalOrNotToRosterModalThatIsTheQuestion() {
    if ( noProto.indexOf('/roster') > -1 ) {
      drawModals();
    }
  }
  toRosterModalOrNotToRosterModalThatIsTheQuestion();
});
