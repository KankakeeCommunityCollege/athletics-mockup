function requestJson(url) {
  for (var i = 0; i < url.length; i++) {
    let request = new XMLHttpRequest();
    request.open("GET", url);
    request.onreadystatechange = function() {
      if(request.readyState === XMLHttpRequest.DONE && request.status === 200) {
        var data = JSON.parse(request.responseText);
        //console.log(data);
        return data;
      }
    }
    request.send();
  }
}
module.exports = requestJson;
