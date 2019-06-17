function drawModals(json) {
  let html = '';  // set html variable as empty string:
  // loop to build html output for each row (build the data into the table)
  let entry = json.feed.entry;  // Define 'entry' var from Google Sheet

  entry.forEach(function(entry) { // Run a 'forEach()' loop on the entrys:
    var playerName = entry['gsx$player']['$t'],
      playerId = playerName.replace(/[\W_]+/g, '');
      //console.log(playerName);
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
            if ( entry['gsx$bio']['$t'] !== ' ' ) {
              thisTitle = '<span><strong class="typography__uppercase">' + extraColTitle[4] + ':</strong> ';
            } else {
              thisTitle = '';
            }
          }
          extraGSX += thisTitle + col['$t'].replace(/•/g, '<br> •').replace(/·/g, '<br> •') + '</span><br>';
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
}
module.exports = drawModals;
