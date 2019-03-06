var spData1 = null,
  spData2 = null,
  spData3 = null,
  spData4 = null,
  spData5 = null,
  spData6 = null,
  spData7 = null,
  spData8 = null,
  spData9 = null;

function doData1(json) {
  spData1 = json.feed.entry;
}
function doData2(json) {
  spData2 = json.feed.entry;
}
function doData3(json) {
  spData3 = json.feed.entry;
}
function doData4(json) {
  spData4 = json.feed.entry;
}
function doData5(json) {
  spData5 = json.feed.entry;
}
function doData6(json) {
  spData6 = json.feed.entry;
}
function doData7(json) {
  spData7 = json.feed.entry;
}
function doData8(json) {
  spData8 = json.feed.entry;
}
function doData9(json) {
  spData9 = json.feed.entry;
}

function drawCell(tr, val) {
  var td = $('<td/>');
  var sTwo = /^\*\*\s/;
  var sThree = /^\*\*\*\s/;
  var sFour = /^\*\*\*\*\s/;
  if ( val.indexOf( '*** ' ) > -1 ) {
    var sT = val.replace(sThree, '');
    val = sT;
    td.attr('colspan', '3');
    td.attr('align', 'center');
    td.css('background-color', '#bfbfbf');
    td.addClass('table__red-category');
  }
  if ( val.indexOf( '**** ' ) > -1 ) {
    var sF = val.replace(sFour, '');
    val = sF;
    td.attr('colspan', '4');
    td.attr('align', 'center');
    td.css('background-color', '#bfbfbf');
    td.addClass('table__red-category');
  }
  if ( val.indexOf('** ') > -1 ) {
    var sTw = val.replace(sTwo, '');
    val = sTw;
    td.attr('colspan', '2');
    td.attr('align', 'center');
    td.css('background-color', '#bfbfbf');
    td.addClass('table__red-category');
  }
  var addOpenStrongTag = val.replace(/^\*\*/, '<strong>');
  var addCloseStrongTag = addOpenStrongTag.replace(/\*\*$/, '</strong>');
  val = addCloseStrongTag;
  tr.append(td);
  td.append(val);
  return td;
}
function drawRow(table, rowData) {
  if (rowData == null) return null;
  if (rowData.length == 0) return null;
  var tr = $('<tr/>');
  table.append(tr);
  for(var c=0; c<rowData.length; c++) {
    drawCell(tr, rowData[c]);
  }
  return tr;
}

function drawTable(parent) {
  var table = $('<table/>');
  var tbody = $('<tbody/>');
  table.addClass('table');
  table.addClass('table-striped');
  table.addClass('table-hover');
  table.append(tbody);
  parent.append(table);
  return table;
}


function readData1(parent) {
  var data = spData1;
  var table = drawTable(parent);
  var rowData = [];

  for(var r=0; r<data.length; r++) {
    var cell = data[r]['gs$cell'];
    var val = cell['$t'];
    if (cell.col == 1) {
      drawRow(table, rowData);
      rowData = [];
    }
    rowData.push(val);
  }
  drawRow(table, rowData);
}
function readData2(parent) {
  var data = spData2;
  var table = drawTable(parent);
  var rowData = [];

  for(var r=0; r<data.length; r++) {
    var cell = data[r]['gs$cell'];
    var val = cell['$t'];
    if (cell.col == 1) {
      drawRow(table, rowData);
      rowData = [];
    }
    rowData.push(val);
  }
  drawRow(table, rowData);
}
function readData3(parent) {
  var data = spData3;
  var table = drawTable(parent);
  var rowData = [];

  for(var r=0; r<data.length; r++) {
    var cell = data[r]['gs$cell'];
    var val = cell['$t'];
    if (cell.col == 1) {
      drawRow(table, rowData);
      rowData = [];
    }
    rowData.push(val);
  }
  drawRow(table, rowData);
}
function readData4(parent) {
  var data = spData4;
  var table = drawTable(parent);
  var rowData = [];

  for(var r=0; r<data.length; r++) {
    var cell = data[r]['gs$cell'];
    var val = cell['$t'];
    if (cell.col == 1) {
      drawRow(table, rowData);
      rowData = [];
    }
    rowData.push(val);
  }
  drawRow(table, rowData);
}
function readData5(parent) {
  var data = spData5;
  var table = drawTable(parent);
  var rowData = [];

  for(var r=0; r<data.length; r++) {
    var cell = data[r]['gs$cell'];
    var val = cell['$t'];
    if (cell.col == 1) {
      drawRow(table, rowData);
      rowData = [];
    }
    rowData.push(val);
  }
  drawRow(table, rowData);
}
function readData6(parent) {
  var data = spData6;
  var table = drawTable(parent);
  var rowData = [];

  for(var r=0; r<data.length; r++) {
    var cell = data[r]['gs$cell'];
    var val = cell['$t'];
    if (cell.col == 1) {
      drawRow(table, rowData);
      rowData = [];
    }
    rowData.push(val);
  }
  drawRow(table, rowData);
}
function readData7(parent) {
  var data = spData7;
  var table = drawTable(parent);
  var rowData = [];

  for(var r=0; r<data.length; r++) {
    var cell = data[r]['gs$cell'];
    var val = cell['$t'];
    if (cell.col == 1) {
      drawRow(table, rowData);
      rowData = [];
    }
    rowData.push(val);
  }
  drawRow(table, rowData);
}
function readData8(parent) {
  var data = spData8;
  var table = drawTable(parent);
  var rowData = [];

  for(var r=0; r<data.length; r++) {
    var cell = data[r]['gs$cell'];
    var val = cell['$t'];
    if (cell.col == 1) {
      drawRow(table, rowData);
      rowData = [];
    }
    rowData.push(val);
  }
  drawRow(table, rowData);
}
function readData9(parent) {
  var data = spData9;
  var table = drawTable(parent);
  var rowData = [];

  for(var r=0; r<data.length; r++) {
    var cell = data[r]['gs$cell'];
    var val = cell['$t'];
    if (cell.col == 1) {
      drawRow(table, rowData);
      rowData = [];
    }
    rowData.push(val);
  }
  drawRow(table, rowData);
}

document.addEventListener('DOMContentLoaded', function() {
  readData1($('#data1'));
  readData2($('#data2'));
  readData3($('#data3'));
  readData4($('#data4'));
  readData5($('#data5'));
  readData6($('#data6'));
  readData7($('#data7'));
  readData8($('#data8'));
  readData9($('#data9'));
});
