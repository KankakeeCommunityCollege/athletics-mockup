(function() {
  
  jQuery.fn.reverse = [].reverse;
  
  var sheets = [1,2,3,4,5,6];
  const urls = sheets.map(function(x){return 'https://spreadsheets.google.com/feeds/list/1Xmb5Gt7QebN8gXPLdxN43ntMXsWXIAE-fLYxnTJEBU0/' + x + '/public/values?alt=json';}); 
  var deferred = urls.map($.getJSON);
  
  $.when.apply(this, deferred).done(function (){
      var entry = [], args = [].slice.call(arguments);
      args.forEach( function (arrayItem)
      {
        var x = arrayItem[0].feed.entry;
        entry.push(x);
      });
      var entryArray=[].concat.apply([],entry);
      var sortedEntries = entryArray.sort(function(a, b){
        return a.gsx$datecreated.$t == b.gsx$datecreated.$t ? 0 : +(a.gsx$datecreated.$t > b.gsx$datecreated.$t) || -1;
      });
      $(sortedEntries).reverse().each(function() {
          var d = new Date().toISOString();
        if(this.gsx$datecreated.$t > d) {
          
          var team;
          var summary = this.gsx$summary.$t;
          switch (summary) {
            case (summary.match(/(Baseball*)/) || {}).input:
              team = 'fas fa-baseball-ball';
              break;
            case (summary.match(/(Softball*)/) || {}).input:
              team = 'fas fa-baseball-ball';
              break;
            case (summary.match(/(Men*)/) || {}).input:
              team = 'fas fa-basketball-ball';
              break;
            case (summary.match(/(Women*)/) || {}).input:
              team = 'fas fa-basketball-ball';
              break;
            case (summary.match(/(Soccer*)/) || {}).input:
              team = 'fas fa-futbol';
              break;
            case (summary.match(/(Volleyball*)/) || {}).input:
              team = 'fas fa-volleyball-ball';
              break;
            default:
              team = 'No match';
          }
            $('#results').prepend('<tr><td><h3><i class="' + team + '"></i> ' + this.gsx$title.$t + '</h3><p>' + summary.split('M:')[0] + 'M </p></td></tr>');
        }
        // if(++i > 4){return false;}
      });
  });
})();