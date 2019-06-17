function getJsonSheetSources() {
  let srcArray = [];
  const jsonScripts = document.querySelectorAll('.jsonSheet');
  for (var i = 0, len = jsonScripts.length; i < len; i++) {
    let srcUrl = jsonScripts[i].getAttribute('src');
    srcArray.push(srcUrl);
  }
  return srcArray;
}
module.exports = getJsonSheetSources;
